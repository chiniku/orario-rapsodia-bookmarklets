javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;

  main();

  async function main(){
    if (!tansaku_opened()){
      goto_tansaku();
      await wait(tansaku_opened);
    }

    if (scenario_result_opened) {
      close_scenario_result();
    }

    print_current_dp();
    if (click_encounter()){
      await sleep(sleep_sec);
      await wait(scenario_opened);
    }

    click_auto();
  }

  function tansaku_opened(){
    const current_location = new URLSearchParams(game_window().location.search).get('action');
    return not_now_loading() && current_location  && current_location === "home_stroll_index";
  }

  function goto_tansaku(){
    const query_string = "?action=home_stroll_index&guid=ON";
    change_search_params(query_string);
  }

  function print_current_dp(){
    var dp= game_frame().querySelector('#outputStrollDetail > div:first-child');
    if (dp) {
      console.log(dp.innerText);
    }
  }

  function click_encounter(){
    const encounter_button = game_frame().querySelector('#outputStrollDetail a.btn_common07[href*="home_stroll_index"');
    if (encounter_button) {
      encounter_button.click();
      return true;
    }
    else {
      return false;
    }
  }

  function scenario_opened(){
    const auto_button = game_frame().querySelector('#scenarioBtnAuto');
    return not_now_loading() && auto_button;
  }

  function scenario_result_opened(){
    const scenario_result_modal = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalScenarioResult"]');
    return not_now_loading && scenario_result_modal; 
  }

  function close_scenario_result(){
    const scenario_result_modal = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalScenarioResult"]');
    if (scenario_result_modal) {
      scenario_result_modal.querySelector('button[data-modal-action="close"]').click();
    }
  }

  function click_auto(){
    const button = game_frame().querySelector('#scenarioBtnAuto');
    if (button){
      button.click();
    }
  }

  function click_skip(){
    const button = game_frame().querySelector('#scenarioBtnSkip');
    if (button){
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
