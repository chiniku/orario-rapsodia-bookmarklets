javascript:
(function() {
  'use strict';
  const sleep_sec = 0.5;
  const default_count = 10;

  main();

  async function main(){
    const user_input_count = window.prompt("ガチャ回数を入力して下さい", default_count);
    if (user_input_count === null) { return };
    const gacha_count  = parseInt(zenkaku_to_hankaku(user_input_count), 10);
    if (! gacha_count) {
      console.log("invalid number:", user_input_count);
      return;
    }
    console.log("ガチャ回数", gacha_count);

    for (let i=1;i<=gacha_count;i++){
      await goto_valis_gacha();
      click_10shot();
      await wait(confirm_modal_opened);
      click_yes();
      await wait(result_opened);
      log_result(i);
      skip_result();
      await wait(not_now_loading);
    }
  }

  function valis_gacha_opened(){
    const selected_panel  = game_frame().querySelector('#container ul > li > .selected');
    return not_now_loading() 
      && current_location() === "home/shop/user/index" 
      && selected_panel 
      && selected_panel.innerText === "ヴァリス";
  }

  async function goto_valis_gacha(){
    if (!gacha_opened()){
      goto_gacha();
      await wait(gacha_opened);
    }
    if (!valis_gacha_opened()) {
      const valis_gacha_panel  = Array.from(game_frame().querySelectorAll('#container ul > li > .btn_tab01'))
                                      .filter(x=>x.innerText === "ヴァリス")[0];
      valis_gacha_panel.click();
      await wait(valis_gacha_opened);
    }
  }

  function goto_gacha(){
    const query_string = "?action=home_shop_user_index&guid=ON";
    change_search_params(query_string);
  }

  function gacha_opened(){
    return not_now_loading() && current_location() === "home/shop/user/index";
  }

  function click_10shot(){
    game_frame().querySelector('.btn_gacha_base01[data-gacha-code$="_10"]:not(.disabled)').click();
  }

  function confirm_modal_opened(){
    return game_frame().querySelector('.modal-is-opened[data-modal-id="targetModalGcaConfirm"]');
  }

  function click_yes(){
    game_frame().querySelector('#outputGcaConfirm form > input[type="submit"]').click();
  }

  function log_result(count){
    const rarity = {"1": "N", "2": "R", "3": "SR", "4": "SSR"};
    const gacha_result = game_window()[vesta()[0]][vesta()[1]]
      .map(x=>{
        x.div == 1 ? x.name = `キャラ(${rarity[x.rare]})` : x.name = x.name.replace("ジャガ丸くん", "ジャガ丸").replace("スキル教錬書", "スキル書").replace("秘力の霊水", "霊水");
        return x;
      })
     .reduce((acc, curr)=>{
        acc[curr.name] = acc[curr.name] + 1 || 1;
        return acc;
      },{});
    console.log("%d:\t%s", count, Object.entries(gacha_result).map(([k,v])=>`${k}:${v}`).sort().join(' '));
  }

  function skip_result(){
    game_window().location.reload();
  }

  function result_opened(){
    return game_frame().querySelector('#gad_container > #canvas');
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

  function zenkaku_to_hankaku(string){
    return string.replace(/[０-９]/g, (char) => {
      return String.fromCharCode(char.charCodeAt(0) - 0xFEE0);
    });
  }

  function vesta(){
    const a = (a)=>(b)=>(a).toString(b);
    const b = (a)=>a.toUpperCase();
    const c = (a) => (b,c) => (a+"").slice(b,c);
    const d = (a) => a.split("").reverse().join("");
    const e = (a) => a.constructor;
    const f = (a) => a.reduce((a,b)=>a+b);
    const g = [a(648)(29), a(323)(34)[1], (true+[]["push"])[10]+([][[]]+"")[0], ([]["keys"]()+"")[3], c([][[]])(5,7)+"_", d(c(e([]))(11,13)), c(e([]+[]))(14,15), a(28)(31)];
    const h = [d(a(302)(29)) , (!![]+"")[1] , ([][[]]+"")[2] , b(a(13)(19)) , c(a(178004)(35))(2,4) , (+[![]]+"")[1]];
    return [f(g), f(h)];
  }

  function current_location(){
    if (window.location.host === "orario-rapsodia.com") {
      if (window.location.pathname === "/y_frame.php") {
        return get_location(document.querySelector('#game_frame').contentWindow);
      }
      if (window.location.pathname === "/y_game.php") {
        return get_location(window);
      }
    }
    return window.location.pathname;
  }

  function get_location2(current_window){
    const container = current_window.document.querySelector('#container');
    if (container == null ) { return "no_container" };

    const current_location = Array.from(container.childNodes)
      .filter( i => i.nodeType === 8 && /layout.tpl content start path:".*\.tpl.*"/.test(i.textContent))
      .map( i => i.textContent.replace(/layout.tpl content start path:"(.*)\.tpl.*"/, '$1').trim());

    if (current_location) {
      return current_location[0];
    }
    else {
      return "";
    }
  }

  function get_location(current_window){
    const search = current_window.location.search;
    if (search !== "") {
      return search.replace(/^.*action[=_]?(.*?)[&=].*$/, '$1').replace(/_/g, "/");
    }
    else {
      return get_location2(current_window);
    }
  }

})();
