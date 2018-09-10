javascript:
(function(){
document.querySelector('#game_frame')
        .contentDocument
        .querySelectorAll('#mCSB_2_container ul li > div[data-lock-flg="0"]')
        .forEach( i => i.click());
})();
