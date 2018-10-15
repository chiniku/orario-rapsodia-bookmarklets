javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;
  const sell_exactly = false;
  const buffer_count = 10;

  const item_max_counts = {
      "コボルトの皮": 60
    , "ゴブリンの角": 60
    , "ダンジョン・リザードの鱗": 60
    , "フロッグシューターの瞳": 60
    , "ウォーシャドウの瞳鏡": 60
    , "キラーアントの牙": 60
  };

  main();

  async function main() {
    goto_sozai();
    await sleep(sleep_sec*2);
    await wait(sozai_opened);
    await sell_items();
    const max_page = game_frame().querySelectorAll('#asyPager > ul > li > a').length;
    for (let i=2;i<=max_page;i++){
      const page_button = game_frame().querySelector(`#asyPager > ul > li > a[data-paging="${i}"]`);
      if (page_button) {
        page_button.click();
        await wait(target_page_opened(i));
        await sell_items();
      }
      else {
        console.log("no button for page: ", i);
        return;
      }
    }
  }

  function goto_sozai(){
    const query_string = "?action=home_base_belongings_index&guid=ON&pageDiv=3";
    change_search_params(query_string);
  }

  function sozai_opened(){
    const sozai_panel = game_frame().querySelector('#container > div > ul > li:nth-child(3) > div.selected');
    return not_now_loading() && sozai_panel && sozai_panel.innerText === "素材";
  }

  async function sell_items(){
    const items_to_sell = Object.entries(item_max_counts).map(convert_name_to_id);
    for (let item_to_sell of items_to_sell) {
      await sell_item_exceed_max_count(item_to_sell);
    }
  }

  function convert_name_to_id([name, value]){
      const id = item_id[name];
      return [id, value];
  }

  async function sell_item_exceed_max_count([id, max_count]){
    const max_repeat_count = sell_exactly ? 2 : 1;
    for (let i=0;i<max_repeat_count;i++) {
      const target_item = item(id);
      if (!target_item){ return; }

      const item_count = target_item.count;
      if (item_count > max_count + buffer_count) {
        const max_sell_count = item_count - max_count;
        target_item.click();
        select_count_for_sell(max_sell_count);
        click_sell();
        await wait(sell_confirm_opened);
        click_confirm();
        await wait(sell_result_opened);
        close_sell_result();
        await sleep(sleep_sec);
      }
      else {
        return;
      }
    }
  }

  function item(id){
    const item_element = game_frame().querySelector(`#mCSB_1_container > div.box_common_thumb_list01 > ul > li > div[data-sidet-id="${id}"] div.prt_txt_count01`);
    if (item_element) {
      item_element.count = Number(item_element.innerText.replace(/×([0-9]+)/, "$1"));
      return item_element;
    }
    else {
      return null;
    }
  }

  function select_count_for_sell(max_sell_count){
    const sell_count = Array.from(game_frame().querySelectorAll('#formItemCount > option'))
                            .map(x => Number(x.value))
                            .filter(x=> x<=max_sell_count)
                            .sort((a,b)=>b-a)[0];
    game_frame().querySelector('#formItemCount').value = sell_count;
  }

  function click_sell(){
    game_frame().querySelector('#onSaleConfirm').click();
  }

  function sell_confirm_opened(){
    const sell_confirm_modal = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalSaleConfirm"]');
    return not_now_loading() && sell_confirm_modal;
  }

  function click_confirm(){
    game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalSaleConfirm"] div > form').submit();
  }

  function sell_result_opened(){
    const sell_result_modal = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalSaleResult"]');
    return not_now_loading() && sell_result_modal;
  }

  function close_sell_result(){
    game_frame().querySelector('.modal-is-opened[data-modal-id="targetModalSaleResult"] button[data-modal-action="close"]').click();
  }

  function target_page_opened(page_num){
    return () => {
      const target_page_button = game_frame().querySelector(`#asyPager > ul > li > a.selected[data-paging="${page_num}"]`);
      return not_now_loading && target_page_button;
    };
  }

  const item_id = {
      "木材": 40100001
    , "良質な木材": 40100002
    , "鉄鉱石": 40110001
    , "銅鉱石": 40110002
    , "銀鉱石": 40110003
    , "ネグルド": 40110005
    , "宝輝石": 40110006
    , "魔法石": 40110007
    , "黒岩石": 40110009
    , "黒理石": 40110010
    , "力の石": 40110012
    , "防御の石": 40110013
    , "加速の石": 40110014
    , "コボルトの爪": 40120001
    , "コボルトの牙": 40120002
    , "コボルトの皮": 40120003
    , "ゴブリンの爪": 40120004
    , "ゴブリンの牙": 40120005
    , "ゴブリンの角": 40120006
    , "ダンジョン・リザードの鱗": 40120007
    , "ダンジョン・リザードの爪": 40120008
    , "ダンジョン・リザードの牙": 40120009
    , "フロッグシューターの舌": 40120010
    , "フロッグシューターの皮": 40120011
    , "フロッグシューターの瞳": 40120012
    , "ウォーシャドウの指刃": 40120013
    , "ウォーシャドウの瞳鏡": 40120014
    , "ウォーシャドウの指剣": 40120015
    , "キラーアントの硬殻": 40120016
    , "キラーアントの爪": 40120017
    , "キラーアントの牙": 40120018
    , "薬草": 40200001
    , "良質な薬草": 40200002
    , "小麦": 40200007
    , "綿": 40200010
    , "魔石(N)": 41000001
    , "魔石(R)": 41000002
    , "魔石(SR)": 41000003
    , "魔石(SSR)": 41000004
  };

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
