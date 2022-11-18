var fileName = new URLSearchParams(location.search).getAll("v");
if(fileName == "") {
  fileName = "main";
}


// getfile function
var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "./wishlists/" + fileName + ".json", true);
oReq.send();

// json parsing
var jsonData;
function reqListener () {
  // parse json
  jsonData = JSON.parse(this.responseText);
  document.getElementById("title").textContent = jsonData.title;

  // wishlist items
  for(var c = 0; c < jsonData.containers.length; c++) {
    items = jsonData.containers[c].items;
    
    // create container
    let _container = document.createElement("div");
    _container.className = "container";

    let _divider = document.createElement("div");
    _divider.className = "divider";
    _container.appendChild(_divider);

    let _divider_p = document.createElement("p");
    _divider_p.textContent = jsonData.containers[c].name;
    _divider.appendChild(_divider_p);

    // items
    for(var i = 0; i < items.length; i++) {
      var item = items[i];

      let _card = document.createElement("a");
      _card.className = "card"; 
      _card.href = item.link;
      _container.appendChild(_card);
      
      let _img_div = document.createElement("div");
      _img_div.className = "image";

      let _img = document.createElement("img");
      _img.src = item.img;
      _img_div.appendChild(_img);
      
      let _desc = document.createElement("p");
      _desc.textContent = item.desc;

      let _price = document.createElement("p");
      _price.className = "price";
      _price.textContent = item.price;

      _card.appendChild(_img_div);
      _card.appendChild(_desc);
      _card.appendChild(_price);
    }
    
    document.body.appendChild(_container);


  }

};