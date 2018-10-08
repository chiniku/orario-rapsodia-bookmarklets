javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;
  const sleep_sec_before_confirm = 0.5;

  main();

  async function main(){
    if (!kakusei_opened()){
      goto_kakusei();
      await wait(kakusei_opened);
    }
    else {
      click_このカードを覚醒();
      await wait(kakusei_modal_opened);
      await sleep(sleep_sec);

      if (kakusei_button_disabled()) {
        console.log("素材不足");
        return;
      }

      click_覚醒する();
      await wait(confirm_modal_opened);
      await sleep(sleep_sec_before_confirm);
      click_yes();
      await wait(canvas_opened);
      await do_until(awake_index_opened, click_canvas);
    }
  }

  function kakusei_opened(){
    return not_now_loading() && game_window().location.search.includes("home_base_enhance_awake_index");
  }

  function goto_kakusei(){
    const query_string = "?action=home_base_enhance_awake_index&guid=ON";
    change_search_params(query_string);
  }

  function click_このカードを覚醒(){
    game_frame().querySelector('#onBaseDecision').click();
  }

  function kakusei_modal_opened(){
    const kakusei_modal = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetCardBaseDetail"]');
    return not_now_loading() && kakusei_modal;
  }

  function kakusei_button_disabled(){
    const disabled_button = game_frame().querySelector('#outputCardBaseDetail .btn_common02.disabled');
    return disabled_button && disabled_button.innerText === "覚醒する";
  }

  function click_覚醒する(){
    game_frame().querySelector('#onEnhanceFinalConfirm').click();
  }

  function confirm_modal_opened(){
    const confirm_modal = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalEnhanceFinalConfirm"]');
    const confirm_modal_title = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalEnhanceFinalConfirm"] > .tit_common01');
    return not_now_loading() && confirm_modal && confirm_modal_title.innerText === "覚醒確認";
  }

  function click_yes(){
    const selector = '.modal.modal-is-opened[data-modal-id="targetModalEnhanceFinalConfirm"] form#autoSubmitAction > input.btn_common02[type="submit"]';
    game_frame().querySelector(selector).click();
  }

  function canvas_opened(){
    const canvas = game_frame().querySelector('#canvas');
    return not_now_loading() && canvas;
  }

  function awake_index_opened(){
    return not_now_loading && game_window().location.search.includes("home_base_enhance_awake_index");
  }

  function click_canvas(){
    game_frame().querySelector('#canvas').click();
  }

  function not_now_loading(){
    return Boolean(game_frame().querySelector('#now_loading[style*="display: none;"]'));
  }

  function close_shop_modal(){
    const close_button = game_frame().querySelector('#modal_commonShopModal.modal-is-opened button[data-modal-action="close"]');
    close_button.click();
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

  async function do_until(predicate, func){
    const wait_max_time = 10;
    const loop_sleep_time = 0.3;
    let elapsed_time = 0;

    do {
      func();
      await sleep(loop_sleep_time);
      elapsed_time += loop_sleep_time;
    } while (elapsed_time < wait_max_time && !predicate())

    if (elapsed_time > wait_max_time + loop_sleep_time) {
      throw 'wait timeout';
    }

    await sleep(sleep_sec);
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

  function game_frame(){
    return document.querySelector('#game_frame').contentDocument;
  }

  function game_window(){
    return document.querySelector('#game_frame').contentWindow;
  }

  function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
  }

})();
