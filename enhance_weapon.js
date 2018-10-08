javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;

  main();

  async function main(){
    if (!weapon_enhance_opened()){
      goto_weapon_enhance();
      await wait(weapon_enhance_opened);
    } 
    else {
      if (click_enhance_check()) {
        await wait(shop_modal_for_item_opened);
        await sleep(sleep_sec);
        const result = await enhance_weapon();
        if (result){
          await wait(shop_result_opened);
          await sleep(sleep_sec*2);
          close_shop_modal();
        }
        else {
          console.log("unable to enhance");
        }
      }
    }
  }

  function weapon_enhance_opened(){
    const weapon_enhance_panel  = game_frame().querySelector('#container > div.base_box_side_space01.pos_rel > ul > li > a.selected');
    return not_now_loading() &&  weapon_enhance_panel && weapon_enhance_panel.innerText === "装備強化";
  }

  function goto_weapon_enhance(){
    const query_string = "?action=home_base_enhance_equipment_index";
    change_search_params(query_string);
  }

  function click_enhance_check(){
    const enhance_check_button = game_frame().querySelector('#outputShopEquipmentDetail > div > div > div.btn_common02[data-confirm-type="enhance_check"]');
    if (!enhance_check_button) {
      console.log("select a weapon to enhance");
      return false;
    }
    if (enhance_check_button.classList.contains('disabled')){
      console.log("unable to enhance this weapon");
      return false;
    }

    enhance_check_button.click();
    return true;
  }

  async function enhance_weapon(){
    const alert_message = game_frame().querySelector('#modal_commonShopModal > div.sec_common02 > div.txt_color03');
    const lacking_sozai = game_frame().querySelector('#modal_commonShopModal > div.sec_common02 section.children_space span.txt_color03');
    if (alert_message || lacking_sozai) {
      return false;
    }

    await select_sozai_weapons();

    const enhance_button = game_frame().querySelector('.modal.modal-is-opened#modal_commonShopModal section > div.btn_common02[data-confirm-type="enhance_do"]');
    if (!enhance_button || enhance_button.classList.contains('disabled') ) {
      return false;
    }

    enhance_button.click();
    return true;
  }

  async function select_sozai_weapons(){
    const required_sozai_weapons = game_frame().querySelectorAll('.select_weapon');
    for (let required_sozai of required_sozai_weapons) {
      required_sozai.click();
      await wait(sozai_weapon_modal_is_opened);
      const sozai_weapons = Array.from(game_frame().querySelectorAll('.modal.modal-is-opened#modal_selectEquipmentList  #equipListArea > div'))
                                 .filter(x=>x.querySelector('span[data-islock="0"] +span[data-isequip="false"]'));
      if (sozai_weapons.length > 0) {
        sozai_weapons[0].click();
        await sleep(sleep_sec);
        game_frame().querySelector('.modal_confirm').click();
        await wait(sozai_weapon_modal_is_closed);
        await sleep(sleep_sec);
      }
      else {
        console.log("no available sozai weapons");
        game_frame().querySelector('.modal.modal-is-opened#modal_selectEquipmentList > button[data-modal-action="close"]').click();
        await wait(sozai_weapon_modal_is_closed);
        await sleep(sleep_sec);
        break;
      }
    }
  }

  function sozai_weapon_modal_is_opened(){
    return game_frame().querySelector('.modal.modal-is-opened#modal_selectEquipmentList');
  }

  function sozai_weapon_modal_is_closed(){
    return game_frame().querySelector('.modal.modal-is-closed#modal_selectEquipmentList');
  }

  function shop_modal_for_item_opened(){
    const shop_modal_title = game_frame().querySelector('#modal_commonShopModal.modal-is-opened > div.tit_common01');
    return not_now_loading() && shop_modal_title && shop_modal_title.innerText === "強化確認";
  }

  function shop_result_opened(){
    const shop_modal_title = game_frame().querySelector('#modal_commonShopModal.modal-is-opened > div.tit_common01');
    return not_now_loading() && shop_modal_title && shop_modal_title.innerText === "強化しました";
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

  function not_now_loading(){
    return Boolean(game_frame().querySelector('#now_loading[style*="display: none;"]'));
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
