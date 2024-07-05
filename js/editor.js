function create_map(){
    let tick = document.getElementById('tick').value
    let generate_food = document.getElementById('generate_food').value

    let width = document.getElementById('width').value
    let height = document.getElementById('height').value
    let size = document.getElementById('size').value
    let line_width = document.getElementById('line_width').value
    let stroke_color = document.getElementById('stroke_color').value
    let fill_color = document.getElementById('fill_color').value

    let snake_fill_color = document.getElementById('snake_fill_color').value
    let segments = document.getElementById('segments').value
    const lines = segments.trim().split('\n');
    const result = lines.map(line => {
        const [x, y] = line.split(',').map(Number);
        return { x, y };
    });
    segments = JSON.stringify(result, null, 2);

    let direction = document.getElementById('direction').value

    let fill_segments = document.getElementById('fill_segments').value

    if (fill_segments) {
        const lines_ = fill_segments.split('\n');
        const formattedLines_ = lines_.map(line => `'${line}'`);
        fill_segments = formattedLines_.join(', ');
    }

    let food_fill_color = document.getElementById('food_fill_color').value
    let wall_fill_color = document.getElementById('wall_fill_color').value
    let key_fill_color = document.getElementById('key_fill_color').value

    let level_grid = document.getElementById("level_grid").value

    let header_background_color = document.getElementById('header_background_color').value
    let body_background_color = document.getElementById('body_background_color').value
    let game_name_color = document.getElementById('game_name_color').value
    let score_text_color = document.getElementById('score_text_color').value
    let game_border = document.getElementById('game_border').value

    let map = 'const game_data = {\r\n'
        map += '    tick: ' + tick + ',\r\n'
        map += '    generate_food: ' + (generate_food === 'on' ? 'true' : 'false') + '\r\n'
        map += '}\r\n\r\n'

        map += 'const level_data = {\r\n'
        map += '    width: ' + width + ',\r\n'
        map += '    height: ' + height + ',\r\n'
        map += '    size: ' + size + ',\r\n'
        map += '    line_width: ' + line_width + ',\r\n'
        map += '    stroke_color: ' + "'" + stroke_color + "'" + ',\r\n'
        map += '    fill_color: ' + "'" + fill_color + "'" + '\r\n'
        map += '}\r\n\r\n'

        map += 'const snake_data = {\r\n'
        map += '    segments: ' + segments + ',\r\n'
        map += '    direction: ' + "'" + direction.toUpperCase() + "'" + ',\r\n'
        map += '    fill_color: ' + "'" + snake_fill_color + "'" + ',\r\n'
        if (fill_segments)
            map += '    fill_segments: ' + '[' + fill_segments + ']' + '\r\n'
        else
            map += 'fill_segments: null'
        map += '}\r\n\r\n'

        map += 'const food_data = {\r\n'
        map += '    fill_color: ' + "'" + food_fill_color + "'" + '\r\n'
        map += '}\r\n\r\n'

        map += 'const wall_data = {\r\n'
        map += '    fill_color: ' + "'" + wall_fill_color + "'" + '\r\n'
        map += '}\r\n\r\n'

        map += 'const key_data = {\r\n'
        map += '    fill_color: ' + "'" + key_fill_color + "'" + '\r\n'
        map += '}\r\n\r\n'

        if (level_grid)
            map += 'const level_grid = ' + '[' + level_grid + ']\r\n'
        else
            map += 'const level_grid = null\r\n\r\n'

        map += 'const page_data = {\r\n'
        map += '    header_background_color: ' + "'" + header_background_color + "'" + ',\r\n'
        map += '    body_background_color: ' + "'" + body_background_color + "'" + ',\r\n'
        map += '    game_name_color: ' + "'" + game_name_color + "'" + ',\r\n'
        map += '    score_text_color: ' + "'" + score_text_color + "'" + ',\r\n'
        map += '    game_border: ' + (!game_border ? "''" : "'" + game_border + "'") + '\r\n'
        map += '}\r\n'

    download('my_map.js', map)
}

function generate_grid(){
    let width = document.getElementById('width').value
    let height = document.getElementById('height').value

    let matrix = '';
    for (let i = 0; i < height; i++) {
        matrix += '[';
        for (let j = 0; j < width; j++) {
            matrix += '0';
            if (j < width - 1) {
                matrix += ', ';
            }
        }
        matrix += ']';
        if (i < height - 1) {
            matrix += ',';
        }

        matrix += '&#13;&#10';
    }

    document.getElementById("level_grid").innerHTML = matrix;
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}