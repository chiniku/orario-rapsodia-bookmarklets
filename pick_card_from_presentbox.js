javascript:
(function() {
  const sleep_sec = 0.5;
  const category = "カード";
  const page_move_backward = true;
  const prompt = false;

  const R_list = [
  ];

  const SR_list = [
    "＜おいしいひととき＞ティオナ"
  , "＜さすらいの導者＞ヘルメス"
  , "＜リトル・ルーキー＞ベル"
  , "＜一口の幸せ＞アイズ"
  , "＜王族の嗜み＞リヴェリア"
  , "＜温情の薬神＞ミアハ"
  , "＜下界の楽しみ＞ロキ"
  , "＜寡黙な闘志＞カレン"
  , "＜華やかな激励＞シル"
  , "＜華麗な強打＞ラブ"
  , "＜気まぐれな神意＞ロキ"
  , "＜牛人の突剣＞アイリス"
  , "＜凶狼＞ベート"
  , "＜金色の舞踊＞春姫"
  , "＜九魔姫＞リヴェリア"
  , "＜剣匠の談笑＞ヴェルフ"
  , "＜剣姫＞アイズ"
  , "＜堅槍の騎士＞オリアナ"
  , "＜幻惑の光術＞プリモ"
  , "＜孤狼の骨休め＞ベート"
  , "＜高貴な奉仕＞春姫"
  , "＜疾走の旋斧＞ギタ"
  , "＜疾風＞リュー"
  , "＜秀麗な令嬢＞エイナ"
  , "＜柔和な物腰＞ディア"
  , "＜女神のつきそい＞ヘスティア"
  , "＜小犬の憩い＞リリルカ"
  , "＜少女の一刀＞千草"
  , "＜進境の双剣＞エマ"
  , "＜接客の女神＞ヘスティア"
  , "＜絶†影＞命"
  , "＜千の妖精＞レフィーヤ"
  , "＜戦士のくつろぎ＞ティオネ"
  , "＜羨望の大剣＞レオ"
  , "＜全力援護＞リリルカ"
  , "＜装飾の戦針＞ルチア"
  , "＜大切断＞ティオナ"
  , "＜鍛冶神の鍛鎚＞ヘファイストス"
  , "＜怒蛇＞ティオネ"
  , "＜闘争の幼花＞ジーナ"
  , "＜博識の小人＞フィン"
  , "＜白兎の休息＞ベル"
  , "＜微睡みの妖精＞レフィーヤ"
  , "＜敏腕の名匠＞ヘファイストス"
  , "＜不冷＞ヴェルフ"
  , "＜万能者＞アスフィ"
  , "＜名技の武神＞タケミカヅチ"
  , "＜勇者＞フィン"
  , "＜歴戦の店員＞リュー"
  , "＜繙読の時間＞アスフィ"
  ];

  const regex_config = {
      "N": () => "^((?>!＜.*＞).)*$"
    , "R": () =>  R_list.reduce((acc, curr) => { return acc + "^＜.*＞" + curr + "|"; }, "").replace(/(.*)\|$/, "$1")
    , "SR": () => SR_list.reduce((acc, curr) => { return acc + curr + "|"; }, "").replace(/(.*)\|$/, "$1")
    , "素材": () => "(?<!黒岩)石|玉|木|舌|薬草"
  };

  let target_items = new RegExp(regex_config["SR"]());
  let max_receive_count = 1;
  let receive_count = 0;

  main();

  async function main() {
    if (prompt === true){
      const user_input = window.prompt("カード名を入力して下さい(正規表現も可)", "＜.*＞エステル|(?<!＜.*＞)ロキ");
      if (user_input === null) { return };
      console.log("入力文字列:", user_input);
      target_items = new RegExp(user_input);
      console.log("正規表現:", target_items);

      const user_input_count = window.prompt("受け取り回数を入力して下さい", "1");
      if (user_input_count === null) { return };
      max_receive_count  = parseInt(zenkaku_to_hankaku(user_input_count), 10);
      console.log("最大受け取り回数:", max_receive_count);
    }

    if (!presentbox_opened()){
      goto_present();
      await wait(presentbox_opened);
      select_category(category);
      await wait_mutation('#outputPresentList');
      await sleep(sleep_sec*2);
      if(page_move_backward && pager_exists()){
        goto_last_page();
        await wait(last_page_opened);
        await sleep(sleep_sec*2);
      }
    }

    if(pager_exists()){
      const asynchronous = true;
      await paging(get_present(target_items), asynchronous, page_move_backward);
    }
    else {
      await get_present(target_items)();
    }

  }

  function goto_present(){
    const present_button = game_frame().querySelector('#onHomePresent');
    if (present_button) {
      present_button.click();
    }
    else {
      const query_string = "?action=home_index&isPresent=1&guid=ON";
      change_search_params(query_string);
    }
  }

  function presentbox_opened(){
    return not_now_loading() && game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetHomePresent"]');
  }

  function select_category(target){
    const category = {
       "全部":   1
      ,"カード": 2
      ,"装備":   3
      ,"素材":   4
      ,"その他": 5
    };
    game_window().$('.modal.modal-is-opened select[name="orderPresentTitle"]').val(category[target]).trigger('change');
  }

  function wait_mutation(selector){
    return new Promise((resolve, reject) => {
      const observer = new MutationObserver((mutations, observer) => {
        observer.disconnect();
        resolve(true);
      });
      const target = game_frame().querySelector(selector);
      if (!target) {
        console.log('no such element:', selector);
        reject();
      }

      observer.observe(target, {childList: true});
    })
  }

  function pager_exists(){
    return game_frame().querySelector('#asyPresentListPager > ul > li > a');
  }

  function goto_last_page(){
    const last_page_button  = game_frame().querySelector('#asyPresentListPager > ul > li:last-child > a');
    last_page_button.click();
  }

  function last_page_opened(){
   return game_frame().querySelector('#asyPresentListPager > ul > li:last-child > a.selected');
  }

  function get_present(target_items){
    return async () => {
      let items;
      while (items = search_item(target_items), items.length) {
        const node = items[0];
        click_receive(node);
        receive_count += 1;
        console.log("%s: %s", receive_count, node.innerText);
        await wait(result_opened);
        if (exceed_limit()){
          throw "最大所持数オーバー";
        }
        close_result();
        await wait(result_closed);
        if (prompt === true && receive_count >= max_receive_count) {
          throw "入力アイテム受け取り完了";
        }
      }
      await sleep(sleep_sec);
    }
  }

  function search_item(target_items){
      const css = '#tabPresentBoxLi0 .mCSB_container > div > div > div.prt_read01 > div.padding03';
      return Array.from(game_frame().querySelectorAll(css)).filter(x=>x.innerText.match(target_items));
  }

  function click_receive(target){
    target.parentNode.parentNode.querySelector('.prt_btn01 .btn_common01').click();
  }

  function result_opened(){
    return game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalPresentResult"]');
  }

  function exceed_limit(){
    const modal = game_frame().querySelector('.modal.modal-is-opened[data-modal-id="targetModalPresentResult"]');
    return modal.querySelector('#outputPresentResult').innerText.includes('受け取ることができません');
  }

  function close_result() {
    const selector = '.modal.modal-is-opened[data-modal-id="targetModalPresentResult"] button[data-modal-action="close"]';
    game_frame().querySelector(selector).click();
  }

  function result_closed() {
    const selector = '.modal.modal-is-closed[data-modal-id="targetModalPresentResult"]';
    return game_frame().querySelector(selector);
  }

  function not_now_loading(){
    return Boolean(game_frame().querySelector('#now_loading[style*="display: none;"]'));
  }

  async function wait(predicate) {
    const wait_max_time = 10;
    const loop_sleep_time = 0.2;
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

  async function paging(fn, asynchronous=false, backward=false){
    const last_page = Number(game_frame().querySelector('#asyPresentListPager > ul > li:last-child > a').getAttribute('data-paging'));
    const start_page = Number(game_frame().querySelector('#asyPresentListPager > ul > li > a.selected').getAttribute('data-paging'));
    const first_page = 1;
    const max_count = backward ? (start_page - first_page) : (last_page - start_page);
    for (let i=0;i<=max_count;i++){
      const target_page = backward ? (start_page - i) : (start_page + i);
      if (target_page_opened(target_page)()){
        try {
          asynchronous ? await fn() : fn();
        } catch(e) {
          console.log("page: ", target_page);
          throw e;
        }
      }
      else {
        const page_button = game_frame().querySelector(`#asyPresentListPager > ul > li > a[data-paging="${target_page}"]`);
        if (page_button) {
          page_button.click();
          await wait_mutation('#outputPresentList');
          await wait(target_page_opened(target_page));
          try {
            asynchronous ? await fn() : fn();
          } catch(e) {
            console.log("page: ", target_page);
            throw e;
          }
        }
        else {
          console.log("no button for page: ", target_page);
          return;
        }
      }
    }
  }

  function target_page_opened(page_num){
    return () => {
      const target_page_button = game_frame().querySelector(`#asyPresentListPager > ul > li > a.selected[data-paging="${page_num}"]`);
      return not_now_loading() && target_page_button;
    };
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

})();
