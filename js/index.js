document.onkeydown = keyDown

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

/* Автоматически подгонять канву под весь размер экран */
/* window.addEventListener("resize", resizeCanvas)
window.addEventListener("load", () => { resizeCanvas(); })

function resizeCanvas() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      init()
} */

window.addEventListener("load", () => { init() })

// -------------------------------------------------------------------------

let level = null
let snake = null
let food = null

let view = null
let interval = null

let score = 0
let record = 0

let lock = false

let initialized = false

function init() {
    if (!initialized){
        level = new Level()
        snake = new Snake(level, view)
        food = new Food(level, snake)
        view = new View(ctx, canvas, level, snake, food)

        view.draw()

        let tick_ = game_data.tick
        interval = setInterval(tick, tick_)

        initialized = true
    }
}

function tick(){
    if (snake.collide_block === Level.BLOCK_FOOD){
        food.replace()
        food.eat()

        score++;
        document.getElementById("score").innerHTML = score;
    }

    if (snake.collide_block === Level.BLOCK_SNAKE){
        gameOver()
    }

    if (snake.collide_block === Level.BLOCK_WALL){
        gameOver()
    }

    if (snake.collide_block === Level.BLOCK_KEY){
        win()
    }

    snake.move()

    view.draw()

    lock = false
}

function keyDown(e){
    if (lock) return;

    if ((e.keyCode === 38 || e.key === "w") && snake.direction !== Snake.DIRECTIONS.UP && snake.direction !== Snake.DIRECTIONS.DOWN) {
        snake.direction = Snake.DIRECTIONS.UP;
        lock = true
    } else if ((e.keyCode === 40 || e.key === "s") && snake.direction !== Snake.DIRECTIONS.DOWN && snake.direction !== Snake.DIRECTIONS.UP) {
        snake.direction = Snake.DIRECTIONS.DOWN;
        lock = true
    } else if ((e.keyCode === 37 || e.key === "a") && snake.direction !== Snake.DIRECTIONS.LEFT && snake.direction !== Snake.DIRECTIONS.RIGHT) {
        snake.direction = Snake.DIRECTIONS.LEFT;
        lock = true
    } else if ((e.keyCode === 39 || e.key === "d") && snake.direction !== Snake.DIRECTIONS.RIGHT && snake.direction !== Snake.DIRECTIONS.LEFT) {
        snake.direction = Snake.DIRECTIONS.RIGHT;
        lock = true
    } else if (e.key === "r" || e.key === "R") {
        restart();
    }
}

function gameOver(){
    if (score > record){
        record = score
        document.getElementById("record").innerHTML = score;
    }

    clearInterval(interval)
    alert('Вы проиграли 😔')
    let tick_ = game_data.tick
    interval = setInterval(tick, tick_)
    restart()
}

function restart(){
    score = 0
    document.getElementById("score").innerHTML = score;

    level.load()
    snake.load(level)
    food.replace()
}

function win(){
    clearInterval(interval)
    alert('Вы победили 😀')
    window.location.reload();
}

class View {
    constructor(ctx, canvas, level, snake, food) {
        this.ctx = ctx
        this.canvas = canvas
        this.level = level
        this.snake = snake
        this.food = food

        this.canvas.width = this.level.size * this.level.width
        this.canvas.height = this.level.size * this.level.height
    }

    draw(){
        this.clear()

        this.drawGrid()
        this.drawSnake()
        this.drawFood()
        this.drawWall()
        this.drawKey()
    }

    drawGrid(){
        for (let y = 0; y <= this.level.height; y++){
            this.drawLine(ctx, 0, y * this.level.size, this.level.width * this.level.size, y * this.level.size)
        }

        for (let x = 0; x <= this.level.width; x++){
            this.drawLine(ctx, x * this.level.size, 0, x * this.level.size, this.level.height * this.level.size)
        }

        this.fill(Level.BLOCK_VOID, this.level.fill_color === 'random' ? 'hsl(' + 360 * Math.random() + ', 50%, 50%)' :  this.level.fill_color)
    }

    drawSnake(){
        for (let x = 0; x < this.level.width; x++) {
            for (let y = 0; y < this.level.height; y++) {
                if (this.level.grid[x][y] === Level.BLOCK_SNAKE){
                    this.ctx.beginPath()
                    this.ctx.rect(x * this.level.size, y * this.level.size, this.level.size, this.level.size)
                    if (snake.fill_color === 'random')
                        this.ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)'
                    else
                        this.ctx.fillStyle = this.snake.fill_color

                    if (snake_data.fill_segments != null){
                        let index = 0
                        snake_data.fill_segments.forEach(function(segment) {
                            if (index <= snake.segments.length - 1){
                                if (x === snake.segments[index].x && y === snake.segments[index].y){
                                    ctx.fillStyle = snake_data.fill_segments[index]
                                }
                            }
                            index++
                        });
                    }

                    this.ctx.fill()
                    this.ctx.stroke()
                }
            }
        }
    }

    drawFood(){
        this.fill(Level.BLOCK_FOOD, this.food.fill_color === 'random' ? 'hsl(' + 360 * Math.random() + ', 50%, 50%)' :  this.food.fill_color)
    }

    drawWall(){
        this.fill(Level.BLOCK_WALL, wall_data.fill_color === 'random' ? 'hsl(' + 360 * Math.random() + ', 50%, 50%)' :  wall_data.fill_color)
    }

    drawKey(){
        this.fill(Level.BLOCK_KEY, key_data.fill_color === 'random' ? 'hsl(' + 360 * Math.random() + ', 50%, 50%)' :  key_data.fill_color)
    }

    fill(block_type, color){
        for (let x = 0; x < this.level.width; x++) {
            for (let y = 0; y < this.level.height; y++) {
                if (this.level.grid[x][y] === block_type){
                    this.ctx.beginPath()
                    this.ctx.rect(x * this.level.size, y * this.level.size, this.level.size, this.level.size)
                    this.ctx.fillStyle = color
                    this.ctx.fill()
                    this.ctx.stroke()
                }
            }
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawLine(ctx, x1, y1, x2, y2) {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)

        ctx.strokeStyle = this.level.stroke_color
        ctx.lineWidth = this.level.line_width;
        ctx.stroke()
    }
}

class Level {
    static BLOCK_VOID = 0
    static BLOCK_SNAKE = 1
    static BLOCK_FOOD = 2
    static BLOCK_WALL = 3
    static BLOCK_KEY = 4

    constructor() {
        this.load()
    }

    load() {
        this.width = level_data.width
        this.height = level_data.height
        this.size = level_data.size
        this.fill_color = level_data.fill_color
        this.line_width = level_data.line_width
        this.stroke_color = level_data.stroke_color

        this.grid = []
        for (let x = 0; x < this.width; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.height; y++) {
                this.grid[x][y] = Level.BLOCK_VOID;
            }
        }

        if (level_grid != null && this.isMatricesHaveSameSize(this.grid, level_grid)){
            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
                    this.grid[y][x] = level_grid[x][y]
                }
            }
        }
    }

    isMatricesHaveSameSize(matrix1, matrix2) {
        if (matrix1.length !== matrix2.length) {
            return false;
        }

        for (let i = 0; i < matrix1.length; i++) {
            if (matrix1[i].length !== matrix2[i].length) {
                return false;
            }
        }

        return true;
    }
}

class Snake {
    static DIRECTIONS = { UP: 'UP', DOWN: 'DOWN',  LEFT: 'LEFT',  RIGHT: 'RIGHT'};

    constructor(level) {
        this.load(level)
    }

    load(level){
        this.level = level

        this.segments = snake_data.segments.slice()
        this.pos_x = snake_data.segments[0].x
        this.pos_y = snake_data.segments[0].y
        this.size = this.segments.length
        this.direction = snake_data.direction.slice()
        this.fill_color = snake_data.fill_color

        this.collide_block = Level.BLOCK_VOID

        this.level.grid[this.pos_x][this.pos_y] = Level.BLOCK_SNAKE

        for (const segment of this.segments) {
            this.level.grid[segment.x][segment.y] = Level.BLOCK_SNAKE;
        }
    }

    move(){
        let new_head = { x: this.pos_x, y: this.pos_y };

        if (this.direction === Snake.DIRECTIONS.UP) {
            new_head.y--;
        } else if (this.direction === Snake.DIRECTIONS.DOWN) {
            new_head.y++;
        } else if (this.direction === Snake.DIRECTIONS.LEFT) {
            new_head.x--;
        } else if (this.direction === Snake.DIRECTIONS.RIGHT) {
            new_head.x++;
        }

        if (new_head.x < 0) {
            new_head.x = this.level.width - 1;
        } else if (new_head.x >= this.level.width) {
            new_head.x = 0;
        }

        if (new_head.y < 0) {
            new_head.y = this.level.height - 1;
        } else if (new_head.y >= this.level.height) {
            new_head.y = 0;
        }

        this.segments.unshift(new_head);

        this.collide_block = level.grid[new_head.x][new_head.y]

        if (this.segments.length > this.size) {
            let removed_segment = this.segments.pop();
            this.level.grid[removed_segment.x][removed_segment.y] = Level.BLOCK_VOID;
        }

        for (const segment of this.segments) {
            this.level.grid[segment.x][segment.y] = Level.BLOCK_SNAKE;
        }

        this.pos_x = new_head.x;
        this.pos_y = new_head.y;
    }
}

class Food {
    constructor(level, snake) {
        this.load(level, snake)
    }

    load(level, snake){
        this.level = level
        this.snake = snake

        this.fill_color = food_data.fill_color

        this.replace()
    }

    replace(){
        if (game_data.generate_food == null || game_data.generate_food) {
            do {
                this.pos_x = Math.floor(Math.random() * level.width)
                this.pos_y = Math.floor(Math.random() * level.height)
            } while (this.level.grid[this.pos_x][this.pos_y] !== Level.BLOCK_VOID)

            this.level.grid[this.pos_x][this.pos_y] = Level.BLOCK_FOOD;
        }
    }

    eat(){
        this.snake.size++
        let pos_x = snake.pos_x
        let pos_y = snake.pos_y

        if (snake.direction === Snake.DIRECTIONS.UP) pos_y--
        if (snake.direction === Snake.DIRECTIONS.DOWN) pos_y++
        if (snake.direction === Snake.DIRECTIONS.LEFT) pos_x--
        if (snake.direction === Snake.DIRECTIONS.RIGHT) pos_x++

        this.snake.segments.push({ x: pos_x, y: pos_y })
    }
}