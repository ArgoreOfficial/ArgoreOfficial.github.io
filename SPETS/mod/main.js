/* ----------------------------------------- */


// get mod
var modID = new URLSearchParams(location.search).getAll("v");
if(modID = " ") {
  modID = "0"; // bruh why do i have to do this??? i hate html
}

var metaFile = '../dat_mods/' + modID + '/meta.json';
// json file request
var oReq = new XMLHttpRequest();
oReq.open("get", metaFile, false);
oReq.send();

// parse json
var jsonData = JSON.parse(oReq.responseText);

document.getElementById("mod_title").textContent = jsonData.title;
document.getElementById("mod_subtitle").textContent = jsonData.author;
document.getElementById("mod_img").src = "../dat_mods/" + modID + "/thumbnail.png";
document.getElementById("page_title").textContent = jsonData.title + " - SPETS Mods";

for(let i in jsonData.description) {
  console.log(jsonData.description[i]);
  let _p = document.createElement("p");
  _p.textContent = jsonData.description[i];

  document.getElementById("mod_description_container").appendChild(_p);
}