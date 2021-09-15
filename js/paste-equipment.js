var pasteEquipmentsFunc = function () {
    paste = document.getElementById('pasteEquipments');
    i = document.getElementById('outfits').tBodies[0].children.length;
    paste.value.split(/\r\n|\n/).forEach(e => {
        let name = e.replace(/^(\d.)+\s*/, "");
        if (name != "") {
            addRow('outfits');
            document.getElementById(`outfits.${('000' + i).slice(-3)}.name`).value = name;
            i++;
        }
    });
    paste.value = "";
};

if (location.hostname == "character-sheets.appspot.com") {
    let pasteEquipDiv = document.createElement('div');
    pasteEquipDiv.setAttribute('id', "div:pasteEquipments");

    let textarea = document.createElement('textarea');
    textarea.setAttribute('id', "pasteEquipments");
    textarea.setAttribute('style', "width:200px; height:120px")
    pasteEquipDiv.appendChild(textarea);

    let button = document.createElement('input');
    button.setAttribute('type', "button");
    button.setAttribute('onclick', "pasteEquipmentsFunc();");
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