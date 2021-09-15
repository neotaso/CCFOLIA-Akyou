var pasteEquipment = function () {
    let paste = document.getElementById('pasteEquipment');
    i = document.getElementById('outfits').tBodies[0].children.length;
    paste.value.split(/\r\n|\n/).forEach(e => {
        addRow('outfits');
        document.getElementById(`outfits.${('000' + i).slice(-3)}.name`).value = e.replace(/^(\d.)+\s*/, "");
        i++;
    });
    paste.value = "";
};

if (location.hostname == "character-sheets.appspot.com") {
    let pasteEquipDiv = document.createElement('div');
    pasteEquipDiv.setAttribute('id', "div:pasteEquipment");

    let textarea = document.createElement('textarea');
    textarea.setAttribute('id', "pasteEquipment");
    textarea.setAttribute('style', "width:200px; height:120px")
    pasteEquipDiv.appendChild(textarea);

    let button = document.createElement('input');
    button.setAttribute('type', "button");
    button.setAttribute('onclick', "pasteEquipment();");
    button.setAttribute('value', "一般装備に追加");
    pasteEquipDiv.appendChild(button);

    let blank = document.createElement('div');
    blank.setAttribute('class', "blankspace");
    let cleardiv = document.createElement('div');
    cleardiv.setAttribute('style', "clear:both");

    let parent = document.getElementById('div.outfitstotal');
    parent.after(pasteEquipDiv);
    parent.after(blank);
    parent.after(cleardiv);
}