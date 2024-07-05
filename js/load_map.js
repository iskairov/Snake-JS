let map = prompt("Введите название карты (без .js)\r\n[Карты хранятся в папке maps]", "default");

if (map != null) {
    const script = document.createElement('script');
    script.src = 'maps/' + map + '.js';
    script.onload = function() {};

    document.head.appendChild(script);
}