// sound
const bgm = document.getElementById("bgm");
const volumeSlider = document.getElementById("volume");

bgm.play();
bgm.volume = volumeSlider.value / 200;
//log in
