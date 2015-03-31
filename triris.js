"use strict"

//playField is a 3D boolean array to keep track of all the blocks
var playField;
//this is where all the instances of blockes are stored
var kubbar = [];
var score = 0;
var level = 1;
//this variable is used to generate a new block if the game is restarted
var restart = false;

//function to initialize a new block
function geraKubb( drawArrayIndex ) {
    //a random variable choosese between the two types of blocks
    if(Math.random()>0.5){

        //the location variables hold the position of the three unit
        //blocks in the Playfield array
        kubbar.push(new Kubbur({
                type: 1,
                size: 3,
                location1: [3,0,3],
                location2: [3,1,3],
                location3: [3,2,3]
            }));    
    }else{
        kubbar.push(new Kubbur({
                type: 2,
                size: 3,
                location1: [2,1,3],
                location2: [3,1,3],
                location3: [3,2,3]
            }));
    }
};


//function to update all the game locic. engine.js calls this function
function updateSimulation(du) {

    //write out the score and level onto the web page
    //document.getElementById("Score").innerHTML = score;
    //document.getElementById("Level").innerHTML = level;
   

   //initialize a new block if the game is restarted
   if(restart){
    geraKubb( );
    restart = false;
   }

   if( startGame ){
       //go through all the blocks and update them.
       //each block returns a signal telling us what needs to be done next.
        for(var i = 0; i<kubbar.length; i++){
            var stateOfBlock = kubbar[i].update(du)
            
            //if the state is 1 the block has landed and we need to make 
            //another block
            if(stateOfBlock === 1){

                //this function checks to see if we have scored any points
                //by making a fumble
                checkForFumble(du);

                //logic for the new block
                geraKubb();
                
            //if the state is -1 that means that all 3 of the unit
            //blocks with in a block have been destroyd, meaning that
            //we can now get rid of that block alltogether
            }else if(stateOfBlock === -1){
                kubbar.splice(i,1);
                i--;
            }
        }
    }

    //various graphical options for debugging and such
    if(  eatKey(G) ){ 
        gridPoints = !gridPoints;
    }
    if(  eatKey( KEY_ONE ) ){ 
        GRID_ONE = !GRID_ONE;
    }
    if(  eatKey( KEY_TWO ) ){ 
        GRID_TWO = !GRID_TWO;
    }
    if(  eatKey( KEY_T ) ){ 
        initializeTextureMode();
    }
    if(  eatKey( KEY_L ) ){ 
        initializeLineMode();
    }


    if( eatKey( KEY_ENTER ) ) {
        startGame = true;
        startIntro = true;
        initializeTextureMode();
    }


   /* if(  eatKey( KEY_UP ) ){ //UP

        ppos[0] += step*lookdir[0];
        ppos[2] += step*lookdir[2];
    }
    if( eatKey( KEY_DOWN ) ){ //DOWN
        ppos[0] -= step*lookdir[0];
        ppos[2] -= step*lookdir[2];
    }
    if( eatKey( KEY_LEFT ) ){ // LEFT
        ppos[0] += step*lookdir[2];
        ppos[2] -= step*lookdir[0];
    }
    if( eatKey( KEY_RIGHT ) ){ //RIGHT 
        ppos[0] -= step*lookdir[2];
        ppos[2] += step*lookdir[0];
     }
     if( eatKey( M )){
        look = !look;
       // mouselook = !mouselook;
        resetLook();*/

}

//this function goes through the Playfield and checks if there is 
//a row that contains only true values. if so we have a fumble
function checkForFumble(du){

    //flag and index are used to mark the floor to fumble
    var flag = true;
    var index = 0;
    //currentScore is a variable used to keep track of our score 
    //from the current fumble in order to do combos if you fumble
    //multiple rows
    var currentScore = 0;

    //check the floors
    for(var i = 0; i <22; i++){
        for(var u = 0; u <6; u++){
            for(var o = 0; o <6 ; o++){
                if(playField[u][i][o] === false){
                    flag = false;
                }
            }
        }
        //if we find a fumble we clear that floor and update our currentScore
        if(flag === true){
            
            currentScore += 10;
            index = i;
            clearFloor(i,du);

        }
        flag  = true;
    }

    //various scoring options based on how many rows you managed to fumble
    if(currentScore === 10){

        score += 10;
        //check if the level increases (this is the same for the other options)
        if((score%50) === 0){
            level++;
            if(soundFX){
                g_audio.levelUp.Play();
            }
        }else{
            if(soundFX){
                g_audio.fumble.Play();
            }
        }
    }else if(currentScore === 20){
        //fumbl is used to play only one sound if we have multiple fumbles
        var fumbl = true;
        //we need to update the score 10 points at a time in order to check 
        //if we have updated the level
        for(var i = 0; i<3; i++){

            score += 10;
            if((score%50) === 0){
                level++;
                if(soundFX){
                    g_audio.levelUp.Play();
                }
                fumbl = false;
            }
        }
        if(fumbl){ 
            if(soundFX){

                g_audio.fumble.Play();
            }
        }
    }else if(currentScore === 30){
        //same as above
        var fumbl = true;
        for(var i = 0; i<6; i++){

            score += 10;
            if((score%50) === 0){
                level++;
                if(soundFX){
                    g_audio.levelUp.Play();
                }
                fumbl = false;
            }
        }
        if(fumbl){ 
            if(soundFX){
                g_audio.fumble.Play();
            }
        }
    }
}



//clearFloor clears a floor that has all it's values in Playfield marked as True
function clearFloor(u,du){
    //go through all the blocks to mark the blocks that share in the marked floor
    for(var i = 0; i<kubbar.length; i++){

        //mark all the block as false in order to re-order them without collision
        kubbar[i].landed = false;
        playField[kubbar[i].location1[0]][kubbar[i].location1[1]][kubbar[i].location1[2]] = false;
        playField[kubbar[i].location2[0]][kubbar[i].location2[1]][kubbar[i].location2[2]] = false;
        playField[kubbar[i].location3[0]][kubbar[i].location3[1]][kubbar[i].location3[2]] = false;

        //go thruogh all the unit blocks in a block and demark them if they share in the marked floor
        if(kubbar[i].location1[1] === u && kubbar[i].block1Alive){
            kubbar[i].block1Alive = false;
            
            //and then reduce the size of the block
            kubbar[i].size--;

        //if it does not share in the floor but is above it then we take it down one floor
        }else if(kubbar[i].location1[1] < u){
            kubbar[i].location1[1]++;
        }

        if(kubbar[i].location2[1] === u && kubbar[i].block2Alive){
            kubbar[i].block2Alive = false;
            
            kubbar[i].size--;
        }else if(kubbar[i].location2[1] < u){
            kubbar[i].location2[1]++;
        }

        if(kubbar[i].location3[1] === u && kubbar[i].block3Alive){
            kubbar[i].block3Alive = false;
            
            kubbar[i].size--;
        }else if(kubbar[i].location3[1] < u){
            kubbar[i].location3[1]++;
        }
    }

    //go through all the blocks that are still alive and mark them true again
    for(var i = 0; i<kubbar.length; i++){
        if(kubbar[i].block1Alive){

            playField[kubbar[i].location1[0]][kubbar[i].location1[1]][kubbar[i].location1[2]] = true;
        }
        if(kubbar[i].block2Alive){
            playField[kubbar[i].location2[0]][kubbar[i].location2[1]][kubbar[i].location2[2]] = true;
        }
        if(kubbar[i].block3Alive){
            playField[kubbar[i].location3[0]][kubbar[i].location3[1]][kubbar[i].location3[2]] = true;
        }
    }

  
    
}
var x=0;
var y = 0;
var z = 0;
var reverse = false;
//
// GLOBAL VARIABLES (mainly used for the graphics)
//
var canvas;
var gl;
var g_ctx;

var NumVertices  = 24;

var shape  = [];
var points = [];
var colors = [];
var texCoords = [];
var g_textures = [];

var points_l;
var colors_l;
var points_t;
var texCoords_t; 

var drawMode;

var startGame = true;
var gameOver = false;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var movement = false;     // Do we rotate?
var mouselook = true;
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var startGameSpinY = 0;
var startGameSpinX = 0;

var mouseX;
var mouseY;

var startIntro = false;

var viewHalfX;
var viewHalfY;

//TÍMABUNDIÐ:
var cBuffer;
var kassi;

var ppos;
var lookdir;
var stefna;

var step;

var look = true;


var locColor;

var program;
var textures;

//KEYS TRIGGERS
var gridPoints;
var GRID_ONE = true;
var GRID_TWO = false;


var POINTS     = 0;
var LINES      = 1;
var TRIANGLES  = 4;


var zDist = -5.0;

var proLoc;
var mvLoc;
var gildi = 0;

/*var lightPosition = vec4(1.0, 3.0, 1.0, 0.0 );
var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 0.19225,  0.19225,  0.19225, 1.0 );
var materialDiffuse = vec4( 0.50754, 0.50754, 0.50754, 1.0 );
var materialSpecular = vec4( 0.508273, 0.508273, 0.508273, 1.0 );
var materialShininess = 51.2;*/

var lightPosition = vec4( 0.0, 10000.0, -25.0, 0.0);
var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 0.5, 0.5, 0.5, 1.0 );
var materialDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 1000.0;

var ambientColor, diffuseColor, specularColor;

window.onload = function init()
{
    //initialize our playfield
    playField = new Array();

    for(var i = 0; i<6; i++){
        playField[i] = new Array();
        for(var u = 0; u<22; u++){
            playField[i][u] = new Array();
            for(var o = 0; o<6; o++){
                playField[i][u][o] = new Array();
                playField[i][u][o] = false;

            }
        }
    }



    //
    // CONFIGURE TEXTURE
    //
  //  textures = texture.convertImagesToTexture( g_images );

    initializeTextureMode();
    //initializeLineMode();

    textures = texture.convertImagesToTexture( g_images );



    //  var drMode = gl.getUniformLocation( program, "drawModse" );
    //gl.uniform2fv( drMode, flatten(vec2(0.0, 1.0)) );
    

    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);
    

    gl.uniform4fv( gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct) );   
    gl.uniform4fv( gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, "shininess"), materialShininess );
    //
    // INITIALIZE LISTENERS
    //
    //event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault();         // Disable drag and drop
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){

        if( look ){
             if(movement) {
                spinY = ( spinY + (e.offsetX - origX) ) % 360;
                spinX = ( spinX + (origY - e.offsetY) ) % 360;

                //so you are not able to see outside of our skybox
                /*if(spinX > 10){
                    spinX = 10;
                }else if(spinX <-180){
                    spinX = -180;
                }*/
                origX = e.offsetX;
                origY = e.offsetY;
                //console.log(spinX)
            }   
        }else {
            if( mouselook ) {
                e.preventDefault();
                e.stopPropagation();
                stefna += (e.clientX - origX)/200;
                if( stefna > 360.0 ) stefna -= 360.0;
                lookdir[0] = Math.cos(stefna);
                lookdir[2] = -Math.sin(stefna);

                origX = e.clientX;
            }
        }
    } );


    canvas.addEventListener("mouseup", function(e){
        //mouselook = true;
    } );

    
    // Event listener for mousewheel
     window.addEventListener("mousewheel", function(e){
           /* if( e.wheelDelta > 0.0 ) {
                
                gildi += 0.1;
                lightPosition = vec4(0.0, gildi, 0.0, 0.0 );
            } else {
                
                gildi -= 0.1;
                lightPosition = vec4(0.0, gildi, 0.0, 0.0 );
            }
            gl.uniform4fv( gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition) );
            console.log(gildi)*/

        });

    geraKubb(  );
}

//resets our buffers for reinitialization
function reset(){
    shape  = [];
    points = [];
    colors = [];
    texCoords = [];
    points_l = [];
    colors_l = [];
    points_t = [];
    texCoords_t = [];
    resetLook();
}

//fix our look to the default starting position
function resetLook(){
    spinX = 0;
    spinY = 0;
    origX = 0;
    origY = 0;
    ppos = vec3(0.0, 0.5, -zDist); // Núverandi staðsetning leikmanns
    lookdir = vec3(0.0, 0.0, -1.0); // Núverandi áhorfsvigur leikmanns
    stefna = 90.0               // Upphafleg stefna leikmanns
    step = 0.05;                // Skrefstærð hreyfingar
}

//basic
function resetPlayfield(){
    playField = new Array();

    for(var i = 0; i<6; i++){
        playField[i] = new Array();
        for(var u = 0; u<22; u++){
            playField[i][u] = new Array();
            for(var o = 0; o<6; o++){
                playField[i][u][o] = new Array();
                playField[i][u][o] = false;

            }
        }
    }
}


var aspect = 1.0;   

 function resizeCanvas() {
   /* only change the size of the canvas if the size it's being displayed
    has changed.*/
   var width = canvas.clientWidth;
   var height = canvas.clientHeight;

   aspect = (width/height);

   if (canvas.width != width ||
       canvas.height != height) {
     /*Change the size of the canvas to match the size it's being displayed*/
     canvas.width = width;
     canvas.height = height;
   }
}



function resize(gl) {
  // Get the canvas from the WebGL context
  var canvas = gl.canvas;
 
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;
 

  // Check if the canvas is not the same size.
  if (canvas.width  != displayWidth ||
      canvas.height != displayHeight) {
 
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
 
    // Set the viewport to match
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
}

//initialize our shaders
function starter(){
    canvas = document.getElementById( "canvas" );
    

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    resizeCanvas();

    gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
}

function initializeLocation(){
    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );
}

//balic
function initializeTextureMode(){
    
    reset();


    starter();

    drawMode = gl.TRIANGLES;
    //
    // CREATE MAP
    //
    vertices.build();

    //
    // INITIALIZE BUFFERS
    //
    kassi = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, kassi);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points_t), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoords_t), gl.STATIC_DRAW );
    
    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );


    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);
    

    var drMode = gl.getUniformLocation( program, "drawMode" );

    gl.uniform2fv( drMode, flatten(vec2(1.0, 0.0)) );

    initializeLocation();
}


//a function that is used for a different graphical mode
function initializeLineMode(){
    
    reset();

    starter();

    drawMode = gl.LINES;
    //
    // CREATE MAP
    //
    vertices.build();

    //
    // INITIALIZE BUFFERS
    //

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors_l), gl.STATIC_DRAW );

    /*var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );*/

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);

    kassi = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, kassi);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points_l), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

   /* cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors_l), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );*/

    locColor = gl.getUniformLocation( program, "fColor" );
    gl.uniform4fv( locColor, flatten(colors_l) );

    var drMode = gl.getUniformLocation( program, "draMode" );
    gl.uniform2fv( drMode, flatten(vec2(0.0, 1.0)) );

    initializeLocation();
}

//breytur sem hjálpa við stjórn leiksins
var hasWon = false;


//----------------------------------------------------------------------------
// Define the transformation scale here (two scale functions in MV.js)
function scale4( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][0] = x;
    result[1][1] = y;
    result[2][2] = z;

    return result;
}


//teikna skjámynd
function render()
{   
    
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var ctmStack = [];
    var proj = perspective( 50.0, aspect, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    



    if( !startGame && !gameOver ){
        startGameSpinY += 0.4;
        startGameSpinX += 0.4;
        var ctm1 = lookAt( vec3(0.0, 0.0, -5.0), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );

        //RENDER STARTSCREEN TEXT
        ctmStack.push( ctm1 );
            vertices.renderStartText(ctm1, mvLoc);
        ctm1 = ctmStack.pop();


        ctm1 = mult( ctm1, rotate( parseFloat( startGameSpinX ), [1, 0, 0] ) );
        ctm1 = mult( ctm1, rotate( parseFloat(startGameSpinY), [0, 1, 0] ) );
        
        ctm1 = mult( ctm1, scale4(0.3,0.3,0.3));
        
        //RENDER STARTSCREEN OBJECTS
        ctmStack.push( ctm1 );
            vertices.renderStartScreen(ctm1, mvLoc);
        ctm1 = ctmStack.pop();

    } else if (startGame && !gameOver){

        // staðsetja áhorfanda og meðhöndla músarhreyfingu
        if(look){
            var ctm = lookAt( vec3(0.0, 0.0, zDist), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );    
        }else{
            var ctm = lookAt( ppos, add(ppos, lookdir), vec3(0.0, 1.0, 0.0));
        }
        ctm = mult( ctm, rotate( parseFloat(spinX), [1, 0, 0] ) );
        ctm = mult( ctm, rotate( parseFloat(spinY), [0, 1, 0] ) );
        ctm = mult( ctm, scale4(0.3,0.3,0.3));

        //RENDER WORLD
        ctmStack.push( ctm );
            vertices.renderWorld(ctm, mvLoc);
        ctm = ctmStack.pop();

        ctmStack.push( ctm );
            vertices.renderGroundSurface(ctm, mvLoc);
        ctm = ctmStack.pop();
        
        
        //translate tetris playground
        ctm = mult( ctm, translate([0.0, 1.0, 0.0]));

        //RENDER GRID
        ctmStack.push( ctm );
            vertices.renderGrid(ctm, mvLoc);
        ctm = ctmStack.pop();
        
        if( !GRID_TWO ){
            //RENDER EARTH
            ctmStack.push( ctm );
                vertices.renderGround(ctm, mvLoc);
            ctm = ctmStack.pop();
        }

        //RENDER GRIDPOINTS
        ctmStack.push( ctm );
            vertices.renderGrid(ctm, mvLoc);
        ctm = ctmStack.pop();

        //RENDER CUBES
        for(var i = 0; i<kubbar.length; i++){
            kubbar[i].render(ctm, mvLoc);
        }
    }
    else if ( gameOver ){
        console.log( "game over ...")
    }

    if(hasWon){
        ctmStack.push(ctm);
            vertices.renderPlank(ctm, mvLoc, spinY );
        ctm = ctmStack.pop();
    }

    //RENDER CUBES

    for(var i = 0; i<kubbar.length; i++){
        ctmStack.push(ctm);
        kubbar[i].render(ctm, mvLoc);
        ctm = ctmStack.pop();
    }
    

}
