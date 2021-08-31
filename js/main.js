var run = function(){
    var sc = document.createElement("script");
    sc.src = 
    "https://character-sheets.appspot.com/satasupe/display?ajax=1&key=ahVzfmNoYXJhY3Rlci1zaGVldHMtbXByFwsSDUNoYXJhY3RlckRhdGEYzfuK3AMM&callback=myFunc";
    var parent = document.getElementsByTagName("script")[0];
    parent.parentNode.insertBefore(sc,parent);
}

var myFunc = function(jsonData){
    console.log(jsonData);
    document.getElementsById("tArea").value = jsonData;
}