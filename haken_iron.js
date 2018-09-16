javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;

  const haken_order = [
      "ドロップアイテムが欲しい"
    , "＜6階層＞素材採取のお願い"
  ];

  main();

  async function main() {
    await open_haken_status();
    if (! await select_member_slot()) {
      return;
    }
    await select_destination();
    await select_member();
    await click_confirm();
    await open_haken_status();
  }

  async function open_haken_status(){
    await goto_haken();
    await wait_page_load();
    await select_haken_status_tab();
  }

  async function goto_haken(){
    const reload_max_count = 10;
    let reload_count = 0;

    do {
      const query_string = "?action=home_treasure_index&guid=ON";
      await change_search_params(query_string);
      await sleep(sleep_sec * 4);
      reload_count++;
    } while (reload_count < reload_max_count && ! haken_status_page());

    reload_count >= reload_max_count && console.log("Reload retry over: ", reload_count);
  }

  function haken_status_page(){
    const params = current_params();
    return params.action === "home_treasure_index" && params.redirect === undefined && haken_status_tab();
  }

  function current_params(){
    return Array.from(new URLSearchParams(game_window().location.search))
                .reduce((acc, curr) => {acc[curr[0]] = curr[1]; return acc;}, {});
  }

  function haken_status_tab(){
    return game_frame().querySelector('ul#tabTreasureMenu > li > a[href="#treasure_state"]');
  }

  async function wait_page_load(){
    const wait_max_time = 30;
    const loop_sleep_time = 0.3;
    let elapsed_time = 0;

    while(elapsed_time < wait_max_time && now_loading()){
      await sleep(loop_sleep_time);
      elapsed_time += loop_sleep_time;
    }

    await sleep(sleep_sec * 2);
  }

  function now_loading(){
    return game_frame().querySelector('#now_loading[style*="display: block"]') !== null;
  }

  async function select_haken_status_tab(){
    haken_status_tab().click();
    await sleep(sleep_sec);
  }

  async function select_member_slot(){
    const member_slot = game_frame().querySelectorAll('div#tabTreasureMenu > div > a[href="#treasure_list"]')[0];
    if (member_slot) {
      member_slot.click();
    }
    else {
      console.log("利用可能な派遣枠がありません");
      return false;
    }
    await sleep(sleep_sec);
    return true;
  }

  const haken_all_list = {
    "情報収集１": 1,
    "情報収集２": 2,
    "街外れの廃墟１": 3,
    "街外れの廃墟２": 4,
    "街外れの廃墟３": 5,
    "＜5階層＞さがしもの１": 6,
    "小さな湖畔": 7,
    "＜ダンジョン＞大量発生１": 8,
    "＜ダンジョン＞大量発生２": 9,
    "＜ダンジョン＞同行依頼": 10,
    "探し物": 11,
    "＜11階層＞ドロップアイテム集め": 12,
    "不思議な音": 13,
    "販売を手伝ってほしい１": 14,
    "販売を手伝ってほしい２": 15,
    "＜ダンジョン＞大量発生３": 16,
    "プレゼントの材料集め": 17,
    "＜12階層＞さがしもの２": 18,
    "＜6階層＞素材採取のお願い": 19,
    "＜ダンジョン＞ドロップアイテム求む": 20,
    "1日密着": 21,
    "隊商の護衛１": 22,
    "隊商の護衛２": 23,
    "隊商の護衛３": 24,
    "配達手伝い": 25,
    "＜ダンジョン＞階層主討伐パーティー募集": 26,
    "＜中層＞サポーター募集": 27,
    "＜深層＞サポーター募集": 28,
    "ドロップアイテムが欲しい": 29,
    "一番大きな巨黒魚を1匹持ってきて": 30,
    "おすすめを教えてほしい": 31,
    "材料集め": 32,
    "古城の荒くれ者": 33,
    "おいしいジャガ丸くん": 1004,
    "インパクトのあるジャガ丸くんを作りたい！": 1005,
    "未知の味のジャガ丸くんを作りたい！": 1006,
    "上層の鉱石の採取": 1007,
    "＜ダンジョン＞鍛冶に使う鉱石の採取": 1008,
    "鍛冶屋の信条": 1009,
    "もっと大きく": 1010,
    "デートに最適なお店の調査": 1011,
    "色々な味のジャガ丸くん": 1012,
    "忘れ物": 1013,
    "モンスターの卵採取のお手伝い": 1014,
    "【タケミカヅチ・ファミリア】と稽古": 1015,
    "料理作りの手伝い": 1016,
    "オラリオのお店調査": 1017,
    "逃げ出した家畜の捕獲": 1018,
    "屋根瓦の修理": 1019,
    "犬と猫": 1020,
  };

  async function select_destination(){
    for (let target_destination of haken_order) {
      const area_number = haken_all_list[target_destination];
      if (! area_number) {
        continue;
      }

      var area = game_frame().querySelector('#treasure_area > a');
      area.setAttribute('href', `#area/select/${area_number}`);
      area.click();
      await sleep(sleep_sec);

      if ( game_frame().querySelector('#treasure_detail > .grid_td12 > a[href*="#item/return/"]') ){
        continue;
      }

      const button = game_frame().querySelector(`#treasure_detail > .grid_td12 > a[href="#departure/member/${area_number}"]`);
      if (button) {
        console.log(`destination: ${target_destination},  area_number: ${area_number}`);
        button.click();
        await sleep(sleep_sec);
        break;
      }
    }
  }

  async function select_member(){
    game_frame().querySelector('#AutoFormationBtn').click();
    while (game_frame().querySelector('#departureBtn:not([class*="disabled"])') === null){
      await sleep(0.3);
    }
    game_frame().querySelector('#departureBtn:not([class*="disabled"])').click();
    await sleep(sleep_sec);
  }

  async function click_confirm(){
    game_frame().querySelector('#modal_departureCheck a[href="#departure/do"]').click();
    await sleep(sleep_sec);
  }

  function game_frame() {
    return document.querySelector('#game_frame').contentDocument;
  }

  function game_window() {
    return document.querySelector('#game_frame').contentWindow;
  }

  function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
  }

  async function change_search_params(query_string){
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
    await sleep(sleep_sec);
  }

})();
