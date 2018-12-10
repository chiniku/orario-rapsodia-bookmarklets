javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;
  const skip_event_quest = false;

  main();

  async function main() {
    goto_quest();
    await sleep(sleep_sec*2);
    await wait(quest_opened);

    for (let i=0;i<5;i++) {
      const result = select_quest_category();
      if (!result) { break };
      await sleep(sleep_sec);
      await wait(quest_category_opened);
      if (is_quest_category("イベント")) {
        await report_event_quest();
      }
      else {
        await report_quest();
      }
    };
  }

  function goto_quest(){
    const query_string = "?action=mission_index&guid=ON";
    change_search_params(query_string);
  }

  function quest_opened(){
    const quest_panel = game_frame().querySelector('#container > div.grid_td08 > ul > li > div.selected');
    return not_now_loading() && quest_panel;
  }

  function select_quest_category(){
    const quest_category_id = {
        "デイリー": 1
      , "ウィークリー": 2
      , "実績": 3
      , "初心者": 5
      , "イベント": 4
    };
    const quest_category = game_frame().querySelector('#container > div.grid_td08 > ul > li div.ico_common01');
    if (quest_category) {
      const target_category = quest_category.parentNode.innerText;
      if (skip_event_quest && target_category == "イベント") {
        console.log("skip event quest");
        return false;
      }
      const current_category = game_frame().querySelector('#container > div.grid_td08 > ul > li > div.selected').innerText;
      if (current_category !== target_category || current_category == "イベント") {
        const category_id = quest_category_id[target_category];
        const query_string = `?action=mission_index&guid=ON&div=${category_id}`;
        change_search_params(query_string);
      }
      return true;
    }
    else {
      return false;
    }
  }

  function quest_category_opened(){
    const quest_category_panel = game_frame().querySelector('#container > div.grid_td08 > ul > li > div.selected > div.ico_common01');
    return not_now_loading() && quest_category_panel;
  }

  function event_quest_selected(){
    const quest_category_panel = game_frame().querySelector('#container > div.grid_td08 > ul > li > div.selected > div.ico_common01');
    const report_button = Array.from(game_frame().querySelectorAll('#container a.btn_common04, #container form > input'))
                               .filter(x=>x.innerText === "一括報告する" || x.value === "一括報告する")[0];
    return not_now_loading() && quest_category_panel && report_button;
  }

  function is_quest_category(category_name){
    const tab_title = game_frame().querySelector('#container > div > ul > li > div.selected');
    return tab_title && tab_title.innerText === category_name;
  }

  async function report_event_quest(){
    select_event_quest();
    await wait(event_quest_selected);
    await report_quest();
  }

  function select_event_quest(){
    const event_quest = Array.from(game_frame().querySelectorAll('.h_480 > ul > li'))
                             .filter(x=>x.querySelector('div.ico_common01'))
                             .map(x=>x.querySelector('a[href*="eventCode"]'))[0];
    if (event_quest) {
      event_quest.click();
    }
    else {
      throw "no event quest to report";
    }
  }

  async function report_quest(){
    const selector = `#container > div.grid_td08 > div > div.sec_common03 > section > div > a.btn_common04:not([class*="disabled"]),
                      #container > div.grid_td08 > div > div.sec_common03 > section > div > form > input[value="一括報告する"]`;
    for (let i=0;i<5;i++) {
      const report_button = game_frame().querySelector(selector);
      if (!report_button) {
        break;
      }
      report_button.click();
      await wait(quest_result_modal_opened);
      close_quest_result();
      await sleep(sleep_sec);
    };
  }

  function quest_result_modal_opened(){
    const modal_title  = game_frame().querySelector('div.modal-is-opened[data-modal-id="modal_questCommon"] .tit_common01');
    return not_now_loading() && modal_title && modal_title.innerText === "クエスト完了";
  }

  function close_quest_result(){
    const button = game_frame().querySelector('div.modal-is-opened[data-modal-id="modal_questCommon"] > button[data-modal-action="close"]');
    if (button) {
      button.click();
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
