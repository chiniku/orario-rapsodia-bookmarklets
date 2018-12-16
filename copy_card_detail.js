javascript:
(function() {

  main();

  function main(){
    const card_detail = [card_name(), card_attribute(), card_status().replace(/\n/g, " ")].concat([...card_skills()]).join('\t');
    console.log(card_detail);
    copy(card_detail);
  }

  function copy(text){
    document.addEventListener("copy", copyListener(text), true);
    document.execCommand("copy");
    console.log("-------------------------------copied to clipboard-------------------------------\n");
  }

  function copyListener(text){
    return (event) => {
      document.removeEventListener("copy", copyListener, true);
      event.preventDefault();
      let clipboardData = event.clipboardData;
      clipboardData.clearData();
      clipboardData.setData("text/plain", text);
    }
  }

  function box_card_detail(){
    const css = '.modal-is-opened[data-modal-id="targetModalDialogDetail"] > #outputDialogDetail > .box_card_detail01';
    const box_card_detail = game_frame().querySelector(css);
    if (! box_card_detail) { throw "Card Detail Dialog is not opened"; }
    return box_card_detail;
  }

  function card_name(){
    const card_name = box_card_detail().children[0].innerText;
    return card_name;
  }

  function card_attribute(){
    const attribute = {
      "ico_attribute01": "赤",
      "ico_attribute02": "翠",
      "ico_attribute03": "黄",
      "ico_attribute04": "蒼"
    };
    const card_attribute = box_card_detail()
      .children[0]
      .querySelector('[class*="ico_attribute"]')
      .className
      .split(' ')
      .filter(x=> x.includes("ico_attribute"))
      .join('');
    return attribute[card_attribute];
  }

  function card_status(){
    const card_status = box_card_detail().children[1].firstElementChild.children[1].innerText.split('\n').filter(x=>x).join('\t');
    return card_status;
  }

  function card_skills(){
    const active_skills = Array.from(box_card_detail().children[1].querySelectorAll('#tabBoxCardDetailSkill .cf'))
                              .map(x=>x.parentNode.innerText.trim().replace(/\s{3,}/,""));
    return active_skills;
  }

  function game_frame(){
    return document.querySelector('#game_frame').contentDocument;
  }

})();
