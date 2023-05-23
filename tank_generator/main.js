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


function getFile(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'text';
        xhr.onload = function () {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.responseText);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
}
