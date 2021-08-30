var run = function(){
    fetch("https://character-sheets.appspot.com/satasupe/display?ajax=1&key=ahVzfmNoYXJhY3Rlci1zaGVldHMtbXByFwsSDUNoYXJhY3RlckRhdGEYzfuK3AMM&callback=myFunction").then(
        res =>{        
        console.log(res);
        document.getElementById("tArea").value = res;
        });
}