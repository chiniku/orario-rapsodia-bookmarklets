javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;

  main();

  async function main(){
    goto_seisei();
    await sleep(sleep_sec*2);
    await wait(seisei_opened);
    click_page3();
    await sleep(sleep_sec);
    await make_maxcount_chiniku();
  }

  function goto_seisei(){
    const query_string = "?action=home_shop_index&sideDiv=2&pageDiv=3&guid=ON";
    change_search_params(query_string);
  }

  function click_page3(){
    game_frame().querySelector('.box_paging01 > li:nth-child(3) > a').click();
  }

  function seisei_opened(){
    const item_seisei_panel = game_frame().querySelector('#container > div.base_box_side_space01.pos_rel > ul > li:nth-child(3) > a');
    return not_now_loading() && item_seisei_panel && item_seisei_panel.innerText === "アイテム生成";
  }

  function not_now_loading(){
    return Boolean(game_frame().querySelector('#now_loading[style*="display: none;"]'));
  }

  async function make_maxcount_chiniku(){
    while (click_chiniku_seiei()) {
      await wait(shop_modal_for_chiniku_opened);
      select_max_count();
      make_chiniku();
      await wait(shop_result_opened);
      close_shop_modal();
    }
  }

  function click_chiniku_seiei(){
    const seisei_kakunin_button = game_frame().querySelector('#item_list > div:nth-child(3) div.btn_common06[data-confirm-key="2"]');
    if (seisei_kakunin_button && seisei_kakunin_button.innerText === "生成確認" ) {
      seisei_kakunin_button.click();
      return true;
    }
    else {
      return false;
    }
  }

  function shop_modal_for_chiniku_opened(){
    const shop_modal_title = game_frame().querySelector('#modal_commonShopModal.modal-is-opened > div.tit_common01');
    return not_now_loading() && shop_modal_title && shop_modal_title.innerText === "血肉(トラップアイテム)";
  }

  function select_max_count(){
    const select_box = game_frame().querySelector('#modal_commonShopModal.modal-is-opened #purchase_count');
    const max_count = select_box.querySelector('option:last-child').innerText;
    select_box.value = max_count;
  }

  function make_chiniku(){
    const make_button = game_frame().querySelector('#modal_commonShopModal.modal-is-opened div[data-confirm-key="2"][data-confirm-type="purchase_item_virtual"]');
    if (make_button) {
      make_button.click();
    }
  }

  function shop_result_opened(){
    const shop_modal_title = game_frame().querySelector('#modal_commonShopModal.modal-is-opened > div.tit_common01');
    return not_now_loading() && shop_modal_title && shop_modal_title.innerText === "購入しました";
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

  function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
  }
})();
