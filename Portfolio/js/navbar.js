const loadDelay = 2000; // time in ms until page is loaded after button press
const slideTime = 600; // time in ms between page being loaded and page having done its transition

loadHome();

// loads the home page
function loadHome() {
  loadDoc("pageroot", "./ajax/home.html", false);
}

// cause catbutton to do animation and load its respective page
function nav_button_click(button_name, filepath) {
  if(document.getElementById("navbar").className == "disabled") { return; }

  // temporarily disable navbar 
  document.getElementById(button_name).classList.replace("asleep", "awake"); 
  document.getElementById("navbar").classList.replace("enabled", "disabled"); 
  
  // mark old one for deletion
  var oldAjax = document.getElementById("ajax");
  console.log(oldAjax);
  if(oldAjax) { oldAjax.id = "ajaxremove"; }

  // load page
  setTimeout(function(){
    loadDoc("pageroot", filepath);
    document.getElementById(button_name).classList.replace("awake", "asleep");
  }, loadDelay);
  
  // remove old and enable navbar
  setTimeout(function() {
    document.getElementById("ajaxremove").remove();
    document.getElementById("navbar").classList.replace("disabled", "enabled"); 
  }, loadDelay + slideTime);
}


// AJAX, loads page "filepath" into div with id "rootid"
function loadDoc(rootid, filepath, transition = true) {
  const xhttp = new XMLHttpRequest(); // create load request
  
  xhttp.onload = function() {
    if(this.statusText != "OK") { // failsafe
      loadHome();
      return;
    }

    document.getElementById(rootid).innerHTML += this.responseText; // add element
    
    // if transition should occur, add the transition class
    if(transition) {
      document.getElementById(rootid).lastChild.classList.add("ajaxtransition");
      
      // remove transition class to stop the transition after slideTime
      setTimeout(function() {
        document.getElementById(rootid).lastChild.classList.remove("ajaxtransition");
      }, slideTime);
    }
  }
  
  xhttp.open("GET", filepath, true);
  xhttp.send();
}