// Multi-Audio Preloader
//based on a preloader from Patric Kerr in accociation with the course tölvuleikja forritun

"use strict";

Audio.prototype.asyncLoad = function(src, asyncCallback) {

	//this.onloadeddata		= main.spilaTheme();
	//this.oncanplay 		= asyncCallback;
	//this.canplay 			= asyncCallback;
    this.oncanplaythrough   = asyncCallback;
    this.onerror            = asyncCallback;
    this.onloadstart        = asyncCallback;
    
	console.log("requesting sound src of ", src);
    this.src = src;
};



function soundsPreload(requiredSounds,
                       loadedSounds,
                       completionCallback) {

    var numSoundsRequired,
        numSoundsHandled = 0,
        currentName,
        currentSound,
        preloadHandler;

   
    numSoundsRequired = Object.keys(requiredSounds).length;

	
    preloadHandler = function () {

        console.log("preloadHandler called with this=", this);
        loadedSounds[this.name] = this;

		
		//this.onloadeddata     = null;
        //this.oncanplay        = null;
        //this.canplay          = null;
        this.oncanplaythrough = null;
        this.onerror = null;
        this.onloadstart = null;
		
        numSoundsHandled += 1;
		
		
        if (numSoundsHandled === numSoundsRequired) {
            console.log("all preload sounds handled");
            console.log("loadedSounds=", loadedSounds);
            console.log("");
            console.log("performing completion callback");
			
			completionCallback();

            console.log("completio n callback done");
            console.log("");
        }
    };

   
   
    for (currentName in requiredSounds) {
        
        if (requiredSounds.hasOwnProperty(currentName)) {
            
            console.log("preloading sound", currentName);
            currentSound = new Audio();
            currentSound.name = currentName;
			console.log("fer hann hingað?");
            currentSound.asyncLoad(requiredSounds[currentName], preloadHandler);
        }
    }
}
