const game_data = {
    tick: 150, // Скорость игры
    generate_food: true // Генерировать еду?
}

const level_data = {
    width: 16, // Ширина уровня (кол-во ячеек)
    height: 16, // Высота уровня (кол-во ячеек)
    size: 30, // Размер ячейки
    line_width: 1, // Толщина границы ячейки
    stroke_color: 'silver', // Цвет границы
    fill_color: 'white' // Цвет ячейки (random для случайного цвета)
}

const snake_data = {
    fill_color: 'green', // Цвет сегмента змейки (random для случайного цвета)
    segments: [{x: 2, y: 7}, {x: 1, y: 7}, {x: 0, y: 7}], // Сегменты змейки, где первый элемент это координаты головы
    direction: Snake.DIRECTIONS.RIGHT, // Направление змейки при старте
    /* Здесь можно указать цвета каждого сегмента */
    // fill_segments: null
    /* fill_segments : [
        'yellow', 'black', 'yellow', 'black', 'yellow', 'black', 'yellow', 'black', 'yellow', 'black', 'yellow', 'black', 'yellow', 'black'
    ] */
    fill_segments : ['darkgreen'] 
}

const food_data = {
    fill_color: 'red' // Цвет еды (random для случайного цвета)
}

const wall_data = {
    fill_color: 'gray' // Цвет стены (random для случайного цвета)
}

const key_data = {
    fill_color: 'yellow' // Цвет ключа (random для случайного цвета)
}

/* Сетка уровня (цифры - это блоки) */
const level_grid = null
/*const level_grid = [
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 3, 2, 2, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 3, 2, 2, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]
];*/

const page_data = {
    header_background_color: '#266249', // Фон шапки
    body_background_color: '#e6edea', // Фон страницы
    game_name_color: '#fff', // Цвет текста названия
    score_text_color: '#0e5135', // Цвет текста очков
    game_border: '2px solid #0e5135' // Граница игрового поля [размер тип цвет]
}


