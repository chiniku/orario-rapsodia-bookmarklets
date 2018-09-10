javascript:
(function(){
  const game_frame = document.querySelector('#game_frame').contentDocument;
  game_frame.querySelector('#tabMenuMaterial > li:nth-child(2)').click();
  const selector = '#outputCardMaterialList .mCSB_container .list_common_thumb01 > li > div[data-thumb-mask-flg="0"] > div > div.ico_select00';
  const length = game_frame.querySelectorAll(selector).length;
  for (let i=0;i<length&&i<10;i++){
    game_frame.querySelector(selector).click();
  }
})();
