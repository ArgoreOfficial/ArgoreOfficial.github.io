function doFunny() 
{
    var audio = new Audio();
    audio.src = "funny.mp3";
    audio.play();

    document.getElementById("bild").src = "funny.gif";
}