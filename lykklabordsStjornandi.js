//////////////////////////////////////////////////////////////////////////7
//      þessi hluti sér um að stjórna lykklaborðinu

//dynamic fylki sem geymir keycodes sem er leitað í til að athuga hvort 
//ýtt hefur verið á takka
var keys = [];

//ef það er ýtt á takka þá er farið í stak númer keycode (til dæmis ef ýtt er á 'A' er
// farið inn í stak 65) og það sett sem true
function handleKeydown(evt) {
    keys[evt.keyCode] = true;
}

//sama og fyrir ofan nema sett í false aftur
function handleKeyup(evt) {
    keys[evt.keyCode] = false;
}

// breytir ascii yfir í "breytu" til að nota
function keyCode(keyChar) {
    return keyChar.charCodeAt(0);
}

//eatKey er fall sem er notað til að auto-repete
//eigi sér ekki stað þegar ýtt er á lykklaborð
function eatKey(keyCode) {
    var isDown = keys[keyCode];
    keys[keyCode] = false;
    return isDown;
}

//handföng á lykklaborð
window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);

//í raun eru þetta keycodes fyrir stafina A,S,D og W sem eru notaðir til
// að athuga hvort hafi verið ýtt á viðeigandi takka ef svo er þá...
var A = keyCode('A');
var S = keyCode('S');
var D = keyCode('D');
var W = keyCode('W');
var P = keyCode('P');
var space = 32;
var left = 37;
var up = 38; 
var right = 39;
var down = 40;