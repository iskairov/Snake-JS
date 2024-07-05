window.addEventListener("load", () => { init_() })

function init_(){
    if (typeof page_data !== 'undefined') {
        document.getElementById("header").style.backgroundColor = page_data.header_background_color
        document.body.style.background = page_data.body_background_color
        document.getElementById("game_name").style.color = page_data.game_name_color
        document.getElementById("score_content").style.color = page_data.score_text_color
        document.getElementById("canvas").style.border = page_data.game_border;
    }
}
