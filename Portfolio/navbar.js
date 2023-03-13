function nav_button_click(button_name, path) {
    if(document.getElementById('navbar').className == 'disabled') { return; }

    document.getElementById(button_name).className = 'awake'; 
    document.getElementById('navbar').className = 'disabled'; 
    
    setTimeout(function(){
        window.location.href = path
    }, 2000);
}