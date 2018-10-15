javascript:
(function() {
  'use strict';

  const page_selected = game_frame().querySelector('#asyPager > ul > li > a.selected, #asyCardBasePager > ul > li > a.selected');
  if (!page_selected) {
    console.log('no pager');
    return;
  }

  const previous_page =  page_selected.parentNode.previousElementSibling;
  if (!previous_page) {
    console.log('no previous_page');
    return;
  }

  previous_page.querySelector('a.btn_pager01').click();

  function game_frame(){
    return document.querySelector('#game_frame').contentDocument;
  }

})();
