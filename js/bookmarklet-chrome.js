navigator.clipboard.readText()
    .then((a) => {
        i = document.getElementById('outfits').tBodies[0].children.length;
        a.split(/\r\n|\n/).forEach(e => {
            let name = e.replace(/^(\d.)+\s*/, "");
            if (name != "") {
                addRow('outfits');
                document.getElementById(`outfits.${('000' + i).slice(-3)}.name`).value = name;
                i++;
            }
        });
    }
    )
