javascript:
(function() {
  'use strict';
  const nth_party = 1;
  const game_frame = document.querySelector('#game_frame').contentDocument;

  main();

  async function main() {
    open_item_box();
    await sleep(500);
    select_item();
    await sleep(1500);
    select_party(nth_party);
  }

  function open_item_box(){
    game_frame.querySelector('#btn_item').click();
  }

  function select_item(){
    const item = game_frame.querySelector('#popup_item_select > .item_selector_box_base:not([style*="opacity: 0.2"])');
    item ? item.click() : close_item_box();
  }

  function close_item_box(){
    const close_button = game_frame.querySelector('#btn_item_select_close');
    close_button.click();
  }

  function select_party(nth){
    const party = game_frame.querySelector(`div.modal-is-opened[data-modal-id="targetModalPopupItemUseParty"] > #item_use_party_box${nth}`);
    party.click();
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

})();
