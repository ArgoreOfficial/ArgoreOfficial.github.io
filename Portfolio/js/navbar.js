
// cause catbutton to do animation and load its respective page
function nav_button_click(button_name, filepath) {
  if(document.getElementById("navbar").className == "disabled") { return; }

  document.getElementById(button_name).className = "awake"; 
  document.getElementById("navbar").className = "disabled"; 
  
  setTimeout(function(){
    loadDoc("pageroot", filepath)
  }, 2000);
}

// AJAX, loads page "filepath" into div with id "rootid"
function loadDoc(rootid, filepath) {
  const xhttp = new XMLHttpRequest();

  xhttp.onload = function() {
    document.getElementById(rootid).innerHTML = this.responseText;
  }
  
  xhttp.open("GET", filepath, true);
  xhttp.send();
}