// 趣味リスト
const favorites = {
  "hobby.1_2": "アブノーマル",
  "hobby.1_3": "カワイイ",
  "hobby.1_4": "トンデモ",
  "hobby.1_5": "マニア",
  "hobby.1_6": "ヲタク",
  "hobby.2_1": "音楽",
  "hobby.2_3": "トレンド",
  "hobby.2_4": "読書",
  "hobby.2_5": "パフォーマンス",
  "hobby.2_6": "美術",
  "hobby.3_1": "アラサガシ",
  "hobby.3_2": "おせっかい",
  "hobby.3_4": "家事",
  "hobby.3_5": "ガリ勉",
  "hobby.3_6": "健康",
  "hobby.4_1": "アウトドア",
  "hobby.4_2": "工作",
  "hobby.4_3": "スポーツ",
  "hobby.4_5": "ハイソ",
  "hobby.4_6": "旅行",
  "hobby.5_1": "育成",
  "hobby.5_2": "サビシガリヤ",
  "hobby.5_3": "ヒマツブシ",
  "hobby.5_4": "宗教",
  "hobby.5_6": "ワビサビ",
  "hobby.6_1": "アダルト",
  "hobby.6_2": "飲食",
  "hobby.6_3": "ギャンブル",
  "hobby.6_4": "ゴシップ",
  "hobby.6_5": "ファッション",
};

const charaCommands = `-汎用-
SR{性業値} 【性業値判定】

{犯罪}R>=X[,1,13]
{生活}R>=X[,1,13]
{恋愛}R>=X[,1,13]
{教養}R>=X[,1,13]
{戦闘}R>=X[,1,13]
{肉体}R>=X[,1,13]
{精神}R>=X[,1,13]

{肉体}R>=X[,1,13] 【セーブ判定】
{肉体}R>=X[1,2,13] 【セーブ判定(跳ぶ)】
{肉体}R>=7[1,1,13] 【バッドトリップ判定(酒)】
{教養}R>=X[4,1,13] 【リンク判定(教養)】
CultureIET 【教養イベント表】
CultureIHT 【教養ハプニング表】

-アイテム-
{攻撃力}R>=X[,1,13] 【武器(ダ+)】

-異能-

-代償-
`;

var dicebot = function (title, hantei, difficalty = "X", fumble = "1", hissatu = "13", clear = "") {
  var text = `{${hantei}}R>=${difficalty}[${clear},${fumble},${hissatu}]`
  if (title != null) text + ` 【${title}】`;
  return text
}

weapon_hantei = function (weapon) {

  return dicebot()
}


var full2half = function (str) {
  str = str.replace(/[０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
  return str;
};

var add_parenthesis = function (target, charAt = -1) {
  if (target != null) {
    if (charAt > -1) {
      return "(" + target.charAt(charAt) + ")";
    }
    else return "(" + target + ")";
  }
  else return "";
}

var run = function () {
  var target = document.getElementById("targetUrl").value;
  // target URL format: https://character-sheets.appspot.com/satasupe/edit.html?key=XXXXXX
  // "key" regular expression: \w{64}

  // TODO: URL Error Check

  var params = new URL(target).searchParams;
  var key = params.get("key");

  var sc = document.createElement("script");
  sc.type = "text/javascript";
  sc.src = `https://character-sheets.appspot.com/satasupe/display?ajax=1&key=${key}&callback=myFunc`;
  var parent = document.getElementsByTagName("script")[0];
  parent.parentNode.insertBefore(sc, parent);
};

var vehicleParameter = function (vehicle) {
  return `(ス${vehicle.speed ?? "X"}, 車${vehicle.frame ?? "X"}, 荷${vehicle.burden ?? "X"})`
};

var alliance = function (jsonData) {
  if (jsonData.base.alliance != null) {
    if (jsonData.base.hierarchy != null) {
      return jsonData.base.alliance + "/" + jsonData.base.hierarchy;
    }
    else return jsonData.base.alliance;
  }
  else return "";
}

var charaData = function (jsonData) {
  let character = {
    kind: "character",
    data: {
      name: jsonData.base.name,
      memo: `【PL名】${jsonData.base.player}
【PC名】${jsonData.base.name} ${add_parenthesis(jsonData.base.nameKana)}
【犯罪】${jsonData.base.abl.crime.value}\
【生活】${jsonData.base.abl.life.value}\
【恋愛】${jsonData.base.abl.love.value}\
【教養】${jsonData.base.abl.culture.value}\
【戦闘】${jsonData.base.abl.combat.value}
【肉体】${jsonData.base.gift.body.value}\
【精神】${jsonData.base.gift.mind.value}
【性業値】${jsonData.base.emotion}
【反応力】${jsonData.base.power.initiative}\
【攻撃力】${jsonData.base.power.attack}\
【破壊力】${jsonData.base.power.destroy}

${document.getElementById("memoCheck").checked ? jsonData.base.memo : ""}
`,
      initiative: parseInt(jsonData.base.power.initiative),
      externalUrl: document.getElementById("targetUrl").value,
      status: [
        {
          label: "肉体点",
          value: 10 - parseInt(jsonData.cond.body.value),
          max: 10,
        },
        {
          label: "精神点",
          value: 10 - parseInt(jsonData.cond.mental.value),
          max: 10,
        },
        {
          label: "サイフ",
          value:
            parseInt(jsonData.base.abl.life.value) -
            parseInt(jsonData.cond.wallet.value),
          max: parseInt(jsonData.base.abl.life.value),
        },
      ],
      params: [
        {
          label: "犯罪",
          value: jsonData.base.abl.crime.value,
        },
        {
          label: "生活",
          value: jsonData.base.abl.life.value,
        },
        {
          label: "恋愛",
          value: jsonData.base.abl.love.value,
        },
        {
          label: "教養",
          value: jsonData.base.abl.culture.value,
        },
        {
          label: "戦闘",
          value: jsonData.base.abl.combat.value,
        },
        {
          label: "肉体",
          value: jsonData.base.gift.body.value,
        },
        {
          label: "精神",
          value: jsonData.base.gift.mind.value,
        },
        {
          label: "攻撃力",
          value: jsonData.base.power.attack,
        },
        {
          label: "破壊力",
          value: jsonData.base.power.destroy,
        },
        {
          label: "性業値",
          value: full2half(jsonData.base.emotion), // no input check in emotion
        },
      ],
      width: 12,
      height: 12,
      commands: charaCommands,
    },
  };
  if (document.getElementById("costCheck").checked == true) {
    character.data.status.push({
      label: "コスト",
      value: parseInt(jsonData.base.abl.crime.value),
      max: parseInt(jsonData.base.abl.crime.value)
    })
  }
  document.getElementById("chara").value = JSON.stringify(character);

  // 趣味
  let fav = jsonData.learned
    .filter((v) => v.id != null)
    .reduce((p, v) => p + favorites[v.id] + "\n", "");

  // 異能
  let talent = jsonData.karma
    .filter((v) => v.talent.name != null)
    .reduce((p, v) => p + v.talent.name.replace(/\r?\n/g, "") + add_parenthesis(v.name, 0) + "\n", "");
  // 代償
  let price = jsonData.karma
    .filter((v) => v.price.name != null)
    .reduce((p, v) => p + v.price.name.replace(/\r?\n/g, "") + add_parenthesis(v.name, 0) + "\n", "");

  // 詳細キャラデータ
  var charaDetailData = "";
  if (document.getElementById("charaCheck").checked == true) {
    charaDetailData = `
表の顔 ${jsonData.base.surface}
故郷 ${jsonData.base.homeland}
外見 ${jsonData.base.style}
好 ${jsonData.base.likes} 嫌 ${jsonData.base.dislikes}
好きな映画 ${jsonData.base.movie}
言語 ${jsonData.base.langueges}
盟約 ${alliance(jsonData)}
`
  }

  let data = `\
PC名 ${jsonData.base.name} ${add_parenthesis(jsonData.base.nameKana)}
年齢 ${jsonData.base.age} 性別 ${jsonData.base.sex}
好み ${jsonData.base.favorites}

-趣味-
${fav}
-異能-
${talent}
-代償-
${price}
-その他-
トラウマ: ${jsonData.cond.trauma.value ?? 0}
中毒: ${jsonData.cond.addiction.value ?? ""}
トリコ: ${jsonData.cond.prisoner.value ?? ""}
SAN: ${jsonData.cond.san.value ?? ""}
クトゥルフ神話知識: ${jsonData.cond.cthulhu.value ?? ""}
${charaDetailData}
`;
  document.getElementById("data").value = data;
};

// 一般装備
var equipment = function (jsonData) {
  let limit = jsonData.outfitstotal.limit;
  let weapons = [];
  if (document.getElementById("weaponCheck").checked == false) {
    weapons = jsonData.weapons
      .filter((v) => v.name != null && v.place == null)
      .map((v) => v.name);
  }
  let outfits = jsonData.outfits
    .filter((v) => v.name != null && v.place == null)
    .map((v) => v.name);
  let items = weapons.concat(outfits);
  if (document.getElementById("vehicleCheck").checked == false) {
    let vehicle = jsonData.vehicles[0];
    if (items.length < limit) {
      let oldlen = items.length;
      items.length = limit;
      items.fill("", oldlen);
      if (vehicle.name != null) {
        items[items.length - 1] = vehicle.name + vehicleParameter(vehicle);
      }
    } else if (vehicle.name != null) {
      items.push(vehicle.name + vehicleParameter(vehicle));
    }
  } else {
    jsonData.vehicles.forEach(v => {
      if (v.name != null) {
        items = items.map(e => {
          if (e == v.name) {
            return e + vehicleParameter(v);
          } else {
            return e;
          }
        })
      }
    })
    if (items.length < limit) {
      let oldlen = items.length;
      items.length = limit;
      items.fill("", oldlen);
    }
  }

  let item =
    `装備(上限${limit})\n` +
    items.reduce((p, c, i) => p + `${i + 1}. ${c}\n`, "");

  document.getElementById("item").value = item;
};

var vehicleEquipment = function (jsonData) {
  // 乗物/乗物装備
  let vehicle = jsonData.vehicles[0];
  if (document.getElementById("vehicleCheck").checked == true) {
    jsonData.vehicles.forEach(v => {
      if (v.name != null && jsonData.outfits.some(e => e.name == v.name && e.place == null))
        vehicle = v;
    })
  }
  let burdenWeapons = jsonData.weapons
    .filter((v) => v.name != null && v.place == "乗物")
    .map((v) => v.name);
  let burdenOutfits = jsonData.outfits
    .filter((v) => v.name != null && v.place == "乗物")
    .map((v) => v.name);
  let burdenItems = burdenWeapons.concat(burdenOutfits);
  if (burdenItems.length < vehicle.burden) {
    let oldlen = burdenItems.length;
    burdenItems.length = vehicle.burden;
    burdenItems.fill("", oldlen);
  }

  let vehicles = `${vehicle.name ?? "乗物"}${vehicleParameter(vehicle)}\n`;
  if (vehicle.burden != null) {
    vehicles =
      vehicles + burdenItems.reduce((p, c, i) => p + `${i + 1}. ${c}\n`, "");
  } else {
    vehicles = vehicles += "1. \n2. \n3. \n4. \n5. \n6. ";
  }

  document.getElementById("vehicle").value = vehicles;
};

var hideoutEquipment = function (jsonData) {
  let hideoutWeapons = []
  if (document.getElementById("weaponCheck").checked == false) {
    hideoutWeapons = jsonData.weapons
      .filter((v) => v.name != null && v.place == "アジト")
      .map((v) => v.name);
  }
  let hideoutOutfits = jsonData.outfits
    .filter((v) => v.name != null && v.place == "アジト")
    .map((v) => v.name);

  let hideoutItems = hideoutWeapons.concat(hideoutOutfits);

  if (document.getElementById("vehicleCheck").checked == false) {
    if (jsonData.vehicles.length > 1) {
      jsonData.vehicles.forEach((e, i) => {
        if (e.name != null && i > 0) {
          hideoutItems.push(e.name + vehicleParameter(e));
        }
      });
    }
  } else {
    jsonData.vehicles.forEach(v => {
      if (v.name != null) {
        hideoutItems = hideoutItems.map(e => {
          if (e == v.name) {
            return e + vehicleParameter(v);
          } else {
            return e;
          }
        })
      }
    })
  }

  if (hideoutItems.length < 10) {
    let oldlen = hideoutItems.length;
    hideoutItems.length = 10;
    hideoutItems.fill("", oldlen);
  }

  let area = jsonData.home.place;
  let hideout = `アジト(${area}) \n`;
  hideout =
    hideout + hideoutItems.reduce((p, c, i) => p + `${i + 1}.${c} \n`, "");

  document.getElementById("hideout").value = hideout;
};

var myFunc = function (jsonData) {
  console.log(jsonData);
  charaData(jsonData);
  equipment(jsonData);
  vehicleEquipment(jsonData);
  hideoutEquipment(jsonData);
};

// コピーのTooltip有効化
document.querySelectorAll('.clip').forEach(a => {
  a.setAttribute("title", "クリップボードにコピー")
  var tooltip = new bootstrap.Tooltip(a);
  a.addEventListener('mouseleave', function () {
    tooltip.hide()
  })
})


// Clipboard制御
var clipboard = new ClipboardJS('.clip');

clipboard.on('success', function (e) {
  var tooltip = bootstrap.Tooltip.getInstance(e.trigger);
  e.trigger.setAttribute('data-bs-original-title', 'Copied!');
  tooltip.show();
  e.trigger.setAttribute('data-bs-original-title', 'クリップボードにコピー');
  e.clearSelection();
});

clipboard.on('error', function (e) {
  console.error('Action:', e.action);
  console.error('Trigger:', e.trigger);
});

// Option制御
// id: string, checked: bool
var enabletext = function (id, checked) {
  document.getElementById(id).disabled = !checked;
}