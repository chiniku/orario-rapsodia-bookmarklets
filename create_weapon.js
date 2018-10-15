javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;
  const event_weapon = false;
  const weapon_type = "種類";
  const weapon_name = "名前";

  main();

  async function main(){

    if (!weapon_seisei_opened() || !finder(weapon_name)()){
      goto_weapon_seisei();
      await sleep(sleep_sec);
      await wait(weapon_seisei_opened);
      await sleep(sleep_sec);
      select_weapon_type(weapon_type);
      await wait(weapon_menu_opened(weapon_type));
    }

    await select_weapon(weapon_name);
    await wait(shop_modal_for_item_opened(weapon_name));
    await sleep(sleep_sec);

    const result = await create_weapon();
    if (result){
      await wait(shop_result_opened);
      await sleep(sleep_sec*3);
      close_shop_modal();
    }
    else {
      console.log("unable to create the weapon");
    }
  }

  function goto_weapon_seisei(){
    const query_string = event_weapon ? "?action=home_shop_index&sideDiv=3&pageDiv=3" : "?action=home_shop_index&sideDiv=3&guid=ON";
    change_search_params(query_string);
  }

  function select_weapon_type(type){
    Array.from(game_frame().querySelectorAll('#container a[href*="weaponType"]')).filter(x=> x.innerText.includes(type))[0].click();
  }

  function weapon_seisei_opened(){
    const tab_name = event_weapon ? "イベント" : "装備生成";
    const weapon_seisei_panel  = game_frame().querySelector('#container > div.base_box_side_space01.pos_rel > ul > li > a.selected');
    return not_now_loading() && weapon_seisei_panel && weapon_seisei_panel.innerText === tab_name;
  }

  function weapon_menu_opened(type){
    return () => {
      const weapon_menu = game_frame().querySelector('#weapon_tit');
      return not_now_loading() && weapon_menu && weapon_menu.innerText.includes(type);
    }
  }

  async function select_weapon(name){
    const item_button = await find_item_in_multiple_pages(finder(name));
    if (item_button) {
      item_button.click();
    }
    else {
      throw `no such weapon: ${name}`
    }
  }

  async function create_weapon(){
    const alert_message = game_frame().querySelector('#modal_commonShopModal > div.sec_common02 > div.txt_color03');
    const lacking_sozai = game_frame().querySelector('#modal_commonShopModal > div.sec_common02 section.children_space span.txt_color03');
    if (alert_message || lacking_sozai) {
      return false;
    }

    await select_sozai_weapons();

    const create_button = game_frame().querySelector('.modal.modal-is-opened#modal_commonShopModal > section > div.btn_common02[data-confirm-type="weapon_create"]');
    if (!create_button || create_button.classList.contains('disabled') ) {
      return false;
    }

    create_button.click();
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

  function finder(name){
    return () =>{
      return Array.from(game_frame().querySelectorAll('#item_list > div > section'))
                  .filter(x=>x.querySelector('div:nth-child(2) > div:first-child').innerText === name)
                  .map(x=>x.querySelector('div:nth-child(3) > .btn_common06'))[0];
    }
  }

  async function find_item_in_multiple_pages(find_in_page){
    const result = find_in_page();
    if (result) {
      return result;
    }

    const pager = game_frame().querySelectorAll('#asyPager > ul > li > a');
    if (pager) {
      const max_page = pager.length;
      for (let i=2;i<=max_page;i++){
        const page_button = game_frame().querySelector(`#asyPager > ul > li > a[data-paging="${i}"]`);
        if (page_button) {
          page_button.click();
          await wait(target_page_opened(i));
          const result = find_in_page();
          if (result) {
            return result;
          }
        }
        else {
          console.log("no button for page: ", i);
          return;
        }
      }
    }

  }

  function target_page_opened(page_num){
    return () => {
      const target_page_button = game_frame().querySelector(`#asyPager > ul > li > a.selected[data-paging="${page_num}"]`);
      return not_now_loading && target_page_button;
    };
  }

  function not_now_loading(){
    return Boolean(game_frame().querySelector('#now_loading[style*="display: none;"]'));
  }

  function shop_modal_for_item_opened(name){
    return () => {
      const shop_modal_title = game_frame().querySelector('#modal_commonShopModal.modal-is-opened > div.tit_common01');
      const item_name_in_modal = () => shop_modal_title.nextElementSibling.innerText.split('\n').filter(x=>x.trim())[0];
      return not_now_loading() && shop_modal_title && shop_modal_title.innerText === "生成確認" && item_name_in_modal() === name;
    }
  }

  function shop_result_opened(){
    const shop_modal_title = game_frame().querySelector('#modal_commonShopModal.modal-is-opened > div.tit_common01');
    return not_now_loading() && shop_modal_title && shop_modal_title.innerText === "生成しました";
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
