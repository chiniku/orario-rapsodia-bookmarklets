javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;

  main();

  async function main(){
    goto_present();
    await wait(presentbox_opened);
    click_getall();
    await wait(getall_result_opened);
    close_result();
  }

  function goto_present(){
    const query_string = "?action=home_index&isPresent=1&guid=ON";
    change_search_params(query_string);
  }


  function presentbox_opened(){
    return game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetHomePresent"]');
  }

  function click_getall() {
    game_frame().querySelector('#onPresentGetAll').click();
  }

  function getall_result_opened(){
    return game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalPresentResult"]');
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

  function close_result() {
    const selector = '.modal.modal-is-opened[data-modal-id="targetModalPresentResult"] button[data-modal-action="close"]';
    game_frame().querySelector(selector).click();
  }

  function game_frame(){
    return document.querySelector('#game_frame').contentDocument;
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
