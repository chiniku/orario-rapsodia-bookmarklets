javascript:
(function() {
  'use strict';
  const maseki_id = ["41000001","41000002","41000003","41000004"];
  const game_frame = document.querySelector('#game_frame').contentDocument;

  main();

  async function main() {
    click_sellall();
    await sleep(500);
    select_maseki();
    await sleep(1000);
    click_confirm();
    await sleep(1000);
    click_yes();
    await sleep(2000);
    close_sell_result();
  }

  function click_sellall(){
    game_frame.querySelector('#onBelongingsSellOff').click();
  }

  function select_maseki(){
    maseki_id.forEach(i => {
      const item = game_frame.querySelector(`#outputSellOffItemList > ul > li > div[data-item-code="${i}"]`);
      if (item && item.getAttribute('data-sidet-selected') === "0"){
        item.click();
      }
    });
  }

  function click_confirm(){
    game_frame.querySelector('.modal-is-opened[data-modal-id="targetModalBelongingsSellOff"] #onSellOffConfirm').click();
  }

  function click_yes(){
    game_frame.querySelector('.modal-is-opened[data-modal-id="targetModalSellOffConfirm"] #outputSellOffConfirm form > input[type="submit"]').click();
  }

  function close_sell_result(){
    const game_frame = document.querySelector('#game_frame').contentDocument;
    game_frame.querySelector('.modal-is-opened[data-modal-id="targetModalSaleResult"] button[data-modal-action="close"]').click();
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

})();
