
// folder check
function checkFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
     
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

// listener
var jsonData;
function reqListener(modID) {
  // parse json
  jsonData = JSON.parse(this.responseText);
  console.log('../dat/mods');
  addModCard("stable_release", jsonData.title, jsonData.author, "../dat_mods/" + (i - 1) + "/thumbnail.png");

};

function addModCard(parentId, title, author, imagePath) {
    /*
    <a href="">
        <div class="mod_card">
            <img class="mod_card_img" src="https://media.discordapp.net/attachments/806422115334750208/1043663071794692146/image.png?width=736&height=681">
            <h1 class="mod_card_title"> Mod </h1>
            <p class="mod_card_author"> By Author </p>
        </div>
    </a>
    */

    let _a = document.createElement("a");
    _a.href = "../Home";

    let _card = document.createElement("div");
    _card.className = "mod_card";

    let _img = document.createElement("img");
    _img.src = imagePath;

    let _title = document.createElement("h1");
    _title.textContent = title;

    let _author = document.createElement("p");
    _author.textContent = author;

    _card.appendChild(_img);
    _card.appendChild(_title);
    _card.appendChild(_author);
    _a.appendChild(_card);
    document.getElementById(parentId).appendChild(_a);
}

/* ----------------------------------------- */



// Load mods
var i = 0;
while(true) {
    var metaFile = '../dat_mods/' + i + '/meta.json';
    if(checkFileExist(metaFile) == false) {
        break;
    }
    else {
        // json file request
        var oReq = new XMLHttpRequest();
        oReq.open("get", metaFile, false);
        oReq.send();

        var jsonData;
        // parse json
        jsonData = JSON.parse(oReq.responseText);
        addModCard("stable_release", jsonData.title, jsonData.author, "../dat_mods/" + (i) + "/thumbnail_small.png");
    }
    i++;
}