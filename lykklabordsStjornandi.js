//////////////////////////////////////////////////////////////////////////7
//      þessi hluti sér um að stjórna lykklaborðinu

//dynamic fylki sem geymir keycodes sem er leitað í til að athuga hvort 
//ýtt hefur verið á takka
var keys = [];

//ef það er ýtt á takka þá er farið í stak númer keycode (til dæmis ef ýtt er á 'A' er
// farið inn í stak 65) og það sett sem true
function handleKeydown(evt) {
    keys[evt.keyCode] = true;


       /*  switch( e.keyCode ) {
            case 38:    // upp ör
                ppos[0] += step*lookdir[0];
                ppos[2] += step*lookdir[2];
                break;
            case 40:    // niður ör
                ppos[0] -= step*lookdir[0];
                ppos[2] -= step*lookdir[2];
                break;
            case 37:    // vinstri ör
                ppos[0] += step*lookdir[2];
                ppos[2] -= step*lookdir[0];
                break;
            case 39:    // hægri ör
                ppos[0] -= step*lookdir[2];
                ppos[2] += step*lookdir[0];
                break;
         }*/
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
var G = keyCode('G');
var M = keyCode('M'); //change look view

var KEY_T = keyCode('T');
var KEY_L = keyCode('L');

var KEY_ONE = keyCode('1');
var KEY_TWO = keyCode('2');

var KEY_UP    = keyCode('U');
var KEY_LEFT  = keyCode('H');
var KEY_RIGHT = keyCode('K');
var KEY_DOWN  = keyCode('J');

var space = 32;
var left = 37;
var up = 38; 
var right = 39;
var down = 40;