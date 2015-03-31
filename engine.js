
// ========
// MAINLOOP  
// ========

//hér byggi ég á grunn sem Patric kerr gerði í tengingu við tölvuleikja forritun haustið 2014
// MAINLOOP virkar sem einskonar vél fyrir leikinn. Hún sér um tímann og 
// að kalla á þau föll sem þurfa til að keyra/stöðva leikinn.

///////////////////////////////////////////////////////////////////////////////////////////
//      ENGINE
///////////////////////////////////////////////////////////////////////////////////////////
var muted = false;
var soundFX = true;

var main = {
    
    // "Frame Time" klukka til að stýra hreyfingum
    _frameTime_ms : null,
    _frameTimeDelta_ms : null,

    //hér er frameTime tíminn sem það tók að reikna út síðasta ramma
    //á meðan frameTimeDelta er mismunur núverandi og síðasta frameTime

};

// förum einusinni í gegnum main lykkjuna
main.iter = function (frameTime) {
    
    // nota gefin tíma (frametime) til að uppfæra allar hinar klukkurnar
    this._updateClocks(frameTime);
    
    // geri alla alvöru vinnuna með því að nota frameTiem
    this._iterCore(this._frameTimeDelta_ms);
    
    // Athuga hvort leikurinn sé búinn annars fer ég í næstu umferð
    if (!this._isGameOver) this._requestNextIteration();
};

main._updateClocks = function (frameTime) {
    
    // fyrir fyrstu umferð
    if (this._frameTime_ms === null) this._frameTime_ms = frameTime;
    
    // held utan um frameTime og frameTimeDelta
    this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
    this._frameTime_ms = frameTime;
};

var Restart = keyCode('R');

var pause = false;
main._iterCore = function (dt) {
    
    if(eatKey(P)){
        pause = !pause;
    }

    if(eatKey(M)){
        muted = !muted;
        if(!muted){
            g_audio.theme.playSound();
        }
    }

    if(muted){
        g_audio.theme.Pause();
    }

    if(eatKey(FX)){
        soundFX = !soundFX;
    }
    if (hasWon ) {

        //þá er keyrður tómur skjár
        render();

        //ef það er ýtt á R þá endurstillist leikurinn
        if(keys[Restart]){
            score = 0;
            level = 1;
            restart = true;
            kubbar = [];
            resetLook();
            resetPlayfield();
            hasWon = false;
        }
    }
    
    if(!pause && !hasWon){

        //uppfæri alla logic
        update(dt);
    }

    //teikna allt
    render();
};

////////////////////////////////////////////////////////////////////////////
// þessi kafli breytir frametime í viðráðanlega stærð sem reynir alltaf
// að herma eftir þvi að maður sé að keyra kerfið á 60 FPS 

// þetta er í raun grunn tíminn hvern ramma sem við erum að reyna að stefna á
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Dt er delta tíminn og er einingin af innri klukku tölvunnar í ms
//
var g_prevUpdateDt = null;

// Du er delta u þar sem u er tíminn liðin frá því síðast mældur margföldum af NOMINAL_TIME_interval
//
var g_prevUpdateDu = null;


function update(dt) {

    var original_dt = dt;
    
    // passa að ef tíminn sem það tók að gera síðasta ramma var of langur
    // þá þurfum við að nota minna dt til að forðast ónákvæmni í hreyfingu
    // hluta í leiksins (hreyfing fæst með speed*dt)
    //
    if (dt > 200) {
        console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
        dt = NOMINAL_UPDATE_INTERVAL;
    }
    
    // notum í raun dt en fáum viðráðanlegri tölu með því að deila 
    //
    var du = (dt / NOMINAL_UPDATE_INTERVAL);
    
    //uppfærum síðan sjálfan leikinn
    updateSimulation(du);
    
    g_prevUpdateDt = original_dt;
    g_prevUpdateDu = du;
    
}
/////////////////////////////////////////////////////////////////////////////////////

// fyrir Firefox og Safari
window.requestAnimationFrame = 
    window.requestAnimationFrame ||        // Chrome
    window.mozRequestAnimationFrame ||     // Firefox
    window.webkitRequestAnimationFrame;    // Safari

// "global" function til að "window" API-in geti kallað á hana
function mainIterFrame(frameTime) {
    main.iter(frameTime);
}

main._requestNextIteration = function () {

    //fæ næsta glugga
    window.requestAnimationFrame(mainIterFrame);
};

main.init = function () {
    
    //bið um næsta glugga

    this._requestNextIteration();
};


// Kick it off
//main.init();



// =============
// PRELOAD STUFF
// =============

var g_images = [];

main.requestPreloads = function() {

    var requiredImages = {
        shell1   : "images/shells-01.jpg",  //1
        shell2   : "images/shells-02.jpg",  //2
        shell3   : "images/shells-03.jpg",  //3
        shell4   : "images/shells-04.jpg",  //4
        shell5   : "images/shells-05.jpg",  //5
        shell6   : "images/shells-06.jpg",  //6
        wall1   : "images/moon-03.jpg",   
        wallnx   : "images/dark-s_nx.jpg",   
        wallny   : "images/dark-s_ny.jpg",   
        wallnz   : "images/dark-s_nz.jpg",   
        wallpx   : "images/dark-s_px.jpg",   
        wallpy   : "images/dark-s_py.jpg",   
        wallpz   : "images/dark-s_pz.jpg",   
        grid   : "images/shells-10.jpg",
        stone1   : "images/stone-02.jpg",
        texTile1 : "images/surface.jpg",//"images/woodtile27.jpg",
        gameOver: "images/gameOver.jpg"
    };
    //
    //PRELOADS
    //
    imagesPreload(requiredImages, g_images, main.sortImages);
    
    
}

main.sortImages = function(){

    //we need to sort the images because we load them asychronusly
    var images = [];
    for(var image in g_images){
        if(g_images[image].name === 'shell1'){
            images[0] = g_images[image];
        } else if(g_images[image].name === 'shell2'){
            images[1] = g_images[image];
        }else if(g_images[image].name === 'shell3'){
            images[2] = g_images[image];
        }else if(g_images[image].name === 'shell4'){
            images[3] = g_images[image];
        }else if(g_images[image].name === 'shell5'){
            images[4] = g_images[image];
        }else if(g_images[image].name === 'shell6'){
            images[5] = g_images[image];
        }else if(g_images[image].name === 'wall1'){
            images[6] = g_images[image];
        }else if(g_images[image].name === 'wallnx'){
            images[7] = g_images[image];
        }else if(g_images[image].name === 'wallny'){
            images[8] = g_images[image];
        }else if(g_images[image].name === 'wallnz'){
            images[9] = g_images[image];
        }else if(g_images[image].name === 'wallpx'){
            images[10] = g_images[image];
        }else if(g_images[image].name === 'wallpy'){
            images[11] = g_images[image];
        }else if(g_images[image].name === 'wallpz'){
            images[12] = g_images[image];
        }else if(g_images[image].name === 'stone1'){
            images[13] = g_images[image];
        }else if(g_images[image].name === 'texTile1'){
            images[14] = g_images[image];
        } else if(g_images[image].name === 'grid'){
            images[15] = g_images[image];
        }else if(g_images[image].name === 'gameOver'){
            images[16] = g_images[image];
        }
    }
    g_images = images;

    //load the audio
    preLoadAudio();
    main.preloadDone();
}

main.preloadDone = function() {

    main.init();
}



// Kick it off
main.requestPreloads();