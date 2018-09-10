javascript:
(function() {
  'use strict';
  const query_string = "?action=home_shop_index&sideDiv=2&pageDiv=3&guid=ON";
  change_search_params(query_string);

  setTimeout(function(){
    document.querySelector('#game_frame').contentDocument.querySelector('.box_paging01 > li:nth-child(3) > a').click()
  }, 1500);

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
})();
