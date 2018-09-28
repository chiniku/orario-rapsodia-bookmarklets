javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;

  const bulk_sell_items = [
      "ダンジョン・リザードの爪"
    , "コボルトの爪"
    , "コボルトの牙"
    , "ウォーシャドウの指刃"
    , "ウォーシャドウの指剣"
    , "キラーアントの硬殻"
    , "キラーアントの爪"
    , "魔石(N)"
    , "魔石(R)"
    , "魔石(SR)"
    , "魔石(SSR)"
  ];

  main();

  async function main() {
    goto_sozai();
    await sleep(sleep_sec*2);
    await wait(sozai_opened);
    click_sellall();
    await sleep(sleep_sec);
    select_bulk_sell_items(bulk_sell_items);
    await sleep(sleep_sec*2);
    click_confirm();
    await sleep(sleep_sec*2);
    click_yes();
    await sleep(sleep_sec*4);
    close_sell_result();
  }

  function goto_sozai(){
    const query_string = "?action=home_base_belongings_index&guid=ON&pageDiv=3";
    change_search_params(query_string);
  }

  function sozai_opened(){
    const sozai_panel = game_frame().querySelector('#container > div > ul > li:nth-child(3) > div.selected');
    return not_now_loading() && sozai_panel && sozai_panel.innerText === "素材";
  }

  function click_sellall(){
    game_frame().querySelector('#onBelongingsSellOff').click();
  }

  function bulk_sell_dialog_opened(){
    const bulk_sell_dialog = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalBelongingsSellOff"]');
    return not_now_loading && bulk_sell_dialog;
  }

  function select_bulk_sell_items(item_list){
    get_item_id(item_list).forEach(i => {
      const item = game_frame().querySelector(`#outputSellOffItemList > ul > li > div[data-item-code="${i}"]`);
      if (item && item.getAttribute('data-sidet-selected') === "0"){
        item.click();
      }
    });
  }

  function click_confirm(){
    game_frame().querySelector('.modal-is-opened[data-modal-id="targetModalBelongingsSellOff"] #onSellOffConfirm').click();
  }

  function click_yes(){
    game_frame().querySelector('.modal-is-opened[data-modal-id="targetModalSellOffConfirm"] #outputSellOffConfirm form > input[type="submit"]').click();
  }

  function close_sell_result(){
    game_frame().querySelector('.modal-is-opened[data-modal-id="targetModalSaleResult"] button[data-modal-action="close"]').click();
  }

  function get_item_id(item_list){
    return item_list.map(i=>item_id[i]);
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
