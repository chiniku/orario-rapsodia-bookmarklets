javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;

  main();

  async function main() {
    goto_team_home();
    await wait(team_home_opened);
    select_member_list();
    await wait(member_page_opened);
    await print_member_info();
    const max_page = game_frame().querySelectorAll('#asyPager > ul > li').length;
    for (let i=2;i<=max_page;i++){
      const page_button = game_frame().querySelector(`#asyPager > ul > li > a[data-paging="${i}"]`);
      if (page_button) {
        page_button.click();
        await wait(target_page_opened(i));
        await print_member_info();
      }
      else {
        console.log("no button for page: ", i);
        return;
      }
    }
  }

  function goto_team_home(){
    const query_string = "?action=home_team_index&guid=ON";
    change_search_params(query_string);
  }

  function team_home_opened(){
    const params = new URLSearchParams(game_window().location.search);
    return not_now_loading() && params.get('action') === "home_team_index";
  }

  function select_member_list(){
    game_frame().querySelector('#container > section.page_team a[href*="home_team_member"]').click();
  }

  function member_page_opened(){
    const member_list_box = game_frame().querySelector('#container > section.page_team > div > div.tit_common01');
    return not_now_loading() && member_list_box && member_list_box.innerText === "メンバー一覧";
  }

  async function print_member_info(){
    const member_list = Array.from(game_frame().querySelectorAll('ul#dataListArea > li'));
    for (let member of member_list) {
      const detail_button = member.querySelector('.btn_detail01');
      const id = detail_button.getAttribute('data-user-id');
      detail_button.click();
      await wait(detail_modal_opened);
      print_member_detail(id);
      close_detail_modal();
      await wait(detail_modal_closed);
      await sleep(sleep_sec);
    }
  }

  function detail_modal_opened(){
    const detail_modal = game_frame().querySelector('.modal.modal-is-opened#teamPageModal');
    return not_now_loading() && detail_modal;
  }

  function detail_modal_closed(){
    const detail_modal = game_frame().querySelector('.modal.modal-is-closed#teamPageModal');
    return not_now_loading() && detail_modal;
  }

  function print_member_detail(id){
    console.log(Object.values(member_detail(id)).join('\t'));
  }

  function member_detail(id){
    const detail_modal = game_frame().querySelector('.modal.modal-is-opened#teamPageModal');
    return {
        id: id
      , name: detail_modal.querySelector('.prt_tit01').innerText.trim()
      , level: detail_modal.querySelector('.prt_box_rank01').innerText.trim().replace(/神様Lv\s+/, "")
      , strength: detail_modal.querySelector('.bor_common01').nextElementSibling.innerText.trim().replace(/総合戦闘力\s+([0-9,]+).*/,"$1")
      , total_strength: detail_modal.querySelector('.bor_common01').nextElementSibling.innerText.trim().replace(/.*\（全編成総力\s+([0-9,]+)\）/,"$1")
      , fame: detail_modal.querySelector('.prt_gauge_awake01').innerText.trim().replace(/名声値\s+/, "")
    };
  }

  function close_detail_modal(){
    const detail_modal = game_frame().querySelector('.modal.modal-is-opened#teamPageModal');
    detail_modal.querySelector('button[data-modal-action="close"]').click();
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
