javascript:
(function(){
  'use strict';
  const sleep_sec = 0.5;

  main();

  async function main(){
    if (!limitbreak_opened()){
      goto_limitbreak();
      await wait(limitbreak_opened);
    }
    else if(modal_not_opened() || (material_list_opened() && limitbreak_button_disabled())) {
      if (modal_not_opened) {
        click_limitbreak();
        await wait(material_list_opened);
        await sleep(sleep_sec);
      }

      select_limitbreak_material();
      await sleep(sleep_sec);
      if (limitbreak_button_disabled()){
        console.log("no material for limitbreak");
      }
    }
    else if((material_list_opened() && !limitbreak_button_disabled()) || limitbreak_detail_opened()) {
      if (material_list_opened()){
      confirm_limitbreak();
      await wait(limitbreak_detail_opened);
      await sleep(sleep_sec);
      }

      perform_limitbreak();
      await wait(confirm_modal_opened);
      click_yes();
      await wait(canvas_opened);
      await do_until(limitbreak_opened, click_canvas);
    }
    else {
      console.log("error case");
    }

  }

  function limitbreak_opened(){
    return not_now_loading() && game_window().location.search.includes("home_base_enhance_limit_index");
  }

  function goto_limitbreak(){
    const query_string = "?action=home_base_enhance_limit_index&guid=ON";
    change_search_params(query_string);
  }

  function modal_not_opened(){
    return game_frame().querySelectorAll('.modal.modal-is-opened').length === 0;
  }

  function material_list_opened(){
    const material_list_modal = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalEnhanceMaterialList"]');
    return not_now_loading() && material_list_modal;
  }

  function click_limitbreak(){
    game_frame().querySelector('#onBaseDecision').click();
  }

  function limitbreak_button_disabled(){
    const disabled_button = game_frame().querySelector('#outputSideMaterial .btn_common02.disabled');
    return disabled_button && disabled_button.innerText === "限界突破確認";
  }

  function select_limitbreak_material(){
    const limitbreak_with_card = game_frame().querySelector('#tabMenuMaterial > li:nth-child(2)');
    if (limitbreak_with_card && limitbreak_with_card.innerText === "カードで限界突破"){
      limitbreak_with_card.click();
    }
    else {
      return;
    }

    const selector = '#outputCardMaterialList .mCSB_container .list_common_thumb01 > li > div[data-thumb-mask-flg="0"] > div > div.ico_select00';
    const length = game_frame().querySelectorAll(selector).length;
    for (let i=0;i<length&&i<10;i++){
      game_frame().querySelector(selector).click();
    }
  }

  function confirm_limitbreak(){
    game_frame().querySelector('#onEnhanceConfirm').click();
  }

  function limitbreak_detail_opened(){
    const limitbreak_detail = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetCardBaseDetail"]');
    return not_now_loading() && limitbreak_detail;
  }

  function perform_limitbreak(){
    game_frame().querySelector('#onEnhanceFinalConfirm').click();
  }

  function confirm_modal_opened(){
    const confirm_modal = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalEnhanceFinalConfirm"]');
    const confirm_modal_title = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalEnhanceFinalConfirm"] > .tit_common01');
    return not_now_loading() && confirm_modal && confirm_modal_title.innerText === "限界突破確認";
  }

  function click_yes(){
    const selector = '.modal.modal-is-opened[data-modal-id="targetModalEnhanceFinalConfirm"] form#autoSubmitAction > input.btn_common02[type="submit"]';
    game_frame().querySelector(selector).click();
  }

  function canvas_opened(){
    const canvas = game_frame().querySelector('#canvas');
    return not_now_loading() && canvas;
  }

  function click_canvas(){
    const canvas = game_frame().querySelector('#canvas');
    if (canvas){
      canvas.click();
    }
  }

  function not_now_loading(){
    return Boolean(game_frame().querySelector('#now_loading[style*="display: none;"]'));
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
