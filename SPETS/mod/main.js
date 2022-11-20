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



/* ----------------------------------------- */


// get mod
var modFolder = new URLSearchParams(location.search).getAll("m");
if(modFolder == "") {
  window.location = "../Explore/";
}

// file request
var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "./wishlists/" + fileName + ".json", true);
oReq.send();
