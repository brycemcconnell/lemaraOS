import OS from "./OS.js";

window.os = new OS();

let screen = document.getElementById('screen');

os.boot(screen);