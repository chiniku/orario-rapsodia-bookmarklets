javascript:
(function() {
  'use strict';
  const sleep_sec = 0.3;

  main();

  async function main(){
    let user_input = window.prompt("プレゼントのページヘ移動", 1);
    if (user_input === null) { return; }
    let target_page_number = Number(user_input);

    while (!target_page_number) {
      alert('番号を入力して下さい');
      user_input = window.prompt("プレゼントのページヘ移動", 1);
      if (user_input === null) { return; }
      target_page_number = Number(user_input);
    }

    if (!presentbox_opened()){
      goto_present();
      await wait(presentbox_opened);
    }

    const page_selected = game_frame().querySelector('[id^="asy"][id$="Pager"] > ul > li > a.selected');
    if (!page_selected) {
      console.log('no pager');
      return;
    }

    if (target_page_number === Number(page_selected.getAttribute('data-paging'))) {
      console.log('same page');
      return;
    }

    const max_page = game_frame().querySelector('[id^="asy"][id$="Pager"] > ul > li:last-child > a').getAttribute('data-paging');
    if (target_page_number > max_page) {
      console.log('no such page');
      return;
    }

    console.log('goto %s page', target_page_number);
    const page_not_selected = game_frame().querySelector('[id^="asy"][id$="Pager"] > ul > li > a:not([class*="selected"])');
    page_not_selected.setAttribute('data-paging', target_page_number);
    page_not_selected.click();

  }

  function goto_present(){
    const present_button = game_frame().querySelector('#onHomePresent');
    if (present_button) {
      present_button.click();
    }
    else {
      const query_string = "?action=home_index&isPresent=1&guid=ON";
      change_search_params(query_string);
    }
  }

  function presentbox_opened(){
    return game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetHomePresent"]');
  }

  async function wait(predicate) {
    const wait_max_time = 10;
    const loop_sleep_time = 0.3;
    let elapsed_time = 0;

    while(elapsed_time < wait_max_time && !predicate()){
      await sleep(loop_sleep_time);
      elapsed_time += loop_sleep_time;
    }

    if (elapsed_time > wait_max_time + loop_sleep_time) {
      throw 'wait timeout';
    }

    await sleep(sleep_sec);
  }

  function game_frame(){
    return document.querySelector('#game_frame').contentDocument;
  }

  function game_window(){
    return document.querySelector('#game_frame').contentWindow;
  }

  function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
  }

  function change_search_params(query_string){
    const frame_location = document.querySelector('#game_frame').contentWindow.location;
    const params = new URLSearchParams(query_string);
    const current_params = new URLSearchParams(frame_location.search);
    const thash = current_params.get("thash");
    const opensocial_owner_id = current_params.get("opensocial_owner_id");

    if ( thash && opensocial_owner_id ) {
      params.set("thash", thash);
      params.set("opensocial_owner_id", opensocial_owner_id);
    }

    frame_location.search = params;
  }

})();
