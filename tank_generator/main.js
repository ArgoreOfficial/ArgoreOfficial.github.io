addEventListener("resize", window_resized);


function toggle_settings() {
    var b = document.body; 
    if(b.className == 'compact') {
        b.className = 'large'
        document.getElementById('generation').style.top = (document.getElementById('settings').offsetHeight) + "px";
    } else {
        b.className = 'compact'
        document.getElementById('generation').style.top = '0';
    } 
}

function window_resized() {
    if(document.body.className == 'compact') return;

    document.getElementById('generation').style.top = (document.getElementById('settings').offsetHeight) + "px";
}