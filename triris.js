"use strict"

////////////////////////////////////////////////////////////////////////////
//              RENDER
////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////7///
//              UPDATE SIMULATION Leikurinn sjálfur
//////////////////////////////////////////////////////////////////////////////

var playField;
//hér eru allir kubbar geymdir
var kubbar = [];
var score = 0;
var level = 1;

//function til að initialize-a nýjan orm
function geraKubb( drawArrayIndex ) {
    if(Math.random()>0.5){

        kubbar.push(new Kubbur({
                type: 1,
                size: 3,
                location1: [3,0,3],
                location2: [3,1,3],
                location3: [3,2,3],
                arrayIndex: drawArrayIndex
            }));    
    }else{
        kubbar.push(new Kubbur({
                type: 2,
                size: 3,
                location1: [2,1,3],
                location2: [3,1,3],
                location3: [3,2,3],
                arrayIndex: drawArrayIndex
            }));
    }
};


//fall sem sér um að uppfæra alla hlutina í leiknum*/
function updateSimulation(du) {
    document.getElementById("Score").innerHTML = score;
    document.getElementById("Level").innerHTML = level;
    var flow = false;
   
    for(var i = 0; i<kubbar.length; i++){
        var stateOfBlock = kubbar[i].update(du)
        
        if(stateOfBlock === 1){

            checkForFumble(du);
            var start = vertices.cubeIndex.start;
            var count = vertices.cubeIndex.count;
            geraKubb( [start,count] );

        }else if(stateOfBlock === -1){
           
            kubbar.splice(i,1);
            i--;
            
        }
    }
    if(  eatKey(G) ){
        gridPoints = !gridPoints;
    }
    //console.log(playField[0][3][3]);
}

function checkForFumble(du){
    var flag = true;
    var index = 0;
    for(var i = 0; i <22; i++){
        for(var u = 0; u <6; u++){
            for(var o = 0; o <6 ; o++){
                if(playField[u][i][o] === false){
                    flag = false;
                }
            }
        }
        if(flag === true){
           
            index = i;
            clearFloor(i,du);
            score += 10;

            if((score%10) === 0){
                level++;
            }
        }
        flag  = true;
    }

    //console.log(playField[0][3][3]);
}

function clearFloor(u,du){
    for(var i = 0; i<kubbar.length; i++){
        kubbar[i].landed = false;
        playField[kubbar[i].location1[0]][kubbar[i].location1[1]][kubbar[i].location1[2]] = false;
        playField[kubbar[i].location2[0]][kubbar[i].location2[1]][kubbar[i].location2[2]] = false;
        playField[kubbar[i].location3[0]][kubbar[i].location3[1]][kubbar[i].location3[2]] = false;

        if(kubbar[i].location1[1] === u && kubbar[i].block1Alive){
            kubbar[i].block1Alive = false;
            
            kubbar[i].size--;
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
        console.log(kubbar[0]);
    }
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


//
// GLOBAL VARIABLES
//
var canvas;
var gl;

var NumVertices  = 24;

var shape  = [];
var points = [];
var colors = [];

var drawMode;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

//TÍMABUNDIÐ:
var cBuffer;
var kassi;

//KEYS TRIGGERS
var gridPoints;

var POINTS     = 0;
var LINES      = 1;
var TRIANGLES  = 4;


var zDist = -4.0;

var proLoc;
var mvLoc;

window.onload = function init()
{
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

    //console.log( playField );
    //debugger;

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    /*colors.push( vec3(  0.0, 0.0, 0.0 ) );
    colors.push( vec3(  0.0, 0.0, 0.0 ) );
    points.push( vec3(  0.5, 0.6, 0.0 ) );
    points.push( vec3(  0.5, -0.6, 0.0 ) );

    colors.push( vec3(  0.0, 0.0, 0.0 ) );
    colors.push( vec3(  0.0, 0.0, 0.0 ) );
    points.push( vec3(  0.0, -0.175, 0.0 ) );
    points.push( vec3(  0.0, 0.175, 0.0 ) );*/

    /*gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );*/

    //
    // SELECT DRAW MODE
    //
    drawMode = gl.LINES;
    //drawMode = gl.TRIANGLES;

    //
    // CREATE MAP
    //
    vertices.build();

    //
    // INITIALIZE BUFFERS
    //
    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    kassi = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, kassi);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );

    
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
        if(movement) {
            spinY = ( spinY + (e.offsetX - origX) ) % 360;
            spinX = ( spinX + (origY - e.offsetY) ) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    } );
    
    

    // Event listener for mousewheel
     window.addEventListener("mousewheel", function(e){
         if( e.wheelDelta > 0.0 ) {
             zDist += 0.1;
         } else {
             zDist -= 0.1;
         }
     }  );  

    geraKubb( [24,24] );
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



function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var ctmStack = [];

    var proj = perspective( 50.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    
    var ctm = lookAt( vec3(0.0, 0.0, zDist), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    ctm = mult( ctm, rotate( parseFloat(spinX), [1, 0, 0] ) );
    ctm = mult( ctm, rotate( parseFloat(spinY), [0, 1, 0] ) );
    ctm = mult( ctm, scale4(0.3,0.3,0.3));
    
  /*  console.log( ctm );
    debugger;*/
    //RENDER GRID
    ctmStack.push( ctm );
        vertices.renderGrid(ctm, mvLoc);
    ctm = ctmStack.pop();
    
    
    //RENDER EARTH
    ctmStack.push( ctm );
        vertices.renderGround(ctm, mvLoc);
    ctm = ctmStack.pop();


    //RENDER GRIDPOINTS
    ctmStack.push( ctm );
        vertices.renderGrid(ctm, mvLoc);
    ctm = ctmStack.pop();

    //RENDER CUBES
    for(var i = 0; i<kubbar.length; i++){
        kubbar[i].render(ctm, mvLoc);
    }
}
