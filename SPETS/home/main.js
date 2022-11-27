
// file request
var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "https://api.github.com/repos/ArgoreOfficial/SPETS/tags", true);
oReq.send();

// listener
var jsonData;
function reqListener () {
  // parse json
  jsonData = JSON.parse(this.responseText);
  
  for(var i = 0; i < jsonData.length; i++) {
    var name = jsonData[i].name;
    if (name.indexOf('r') > -1)
    {
        console.log("latest release: " + name)
        
        // download button text
        document.getElementById("download_text").textContent = "DOWNLOAD " + name;

        // download href
        var href = name.replace(/\./g, "_");
        document.getElementById("download_href").href = "https://github.com/ArgoreOfficial/SPETS/releases/download/" + name + "/" + href + ".zip"

        break;
    }
  }
};