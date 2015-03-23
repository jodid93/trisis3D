"use strict"

function Hexahedron( descr ){
    for (var property in descr) {
        this[property] = descr[property];
    }

    this.vertices = this.getVertices( this.drawMode );
    this.colorTex = this.getColorTex( this.drawMode );

    this.build( this.drawMode );
}


Hexahedron.prototype.points = [];	//keep track of every vertice points for Hexahedron
Hexahedron.prototype.textur = [];  //For every three Hexahedron vertices is a one
									//special color. 

Hexahedron.prototype.size = 0.25;       //Radius size of Hexahedron

Hexahedron.prototype.colorN = 0;

//COLORS
Hexahedron.prototype.red; 
Hexahedron.prototype.green;
Hexahedron.prototype.bue; 
Hexahedron.prototype.transparent;

Hexahedron.prototype.xAxisLen;
Hexahedron.prototype.yAxisLen;
Hexahedron.prototype.zAxisLen;

//COORDINATES
Hexahedron.prototype.vertices;
Hexahedron.prototype.colorTex;

Hexahedron.prototype.drawMode;

//Fastar
Hexahedron.prototype.LINE     = "line";
Hexahedron.prototype.TRIANGLE = "tiangle";



Hexahedron.prototype.build = function( drawMode ){
    if( drawMode === this.LINE ){
        this.buildLineHexahedron();
    } else
    if( drawMode === this.TRIANGLE ){
        this.buildTriangleHexahedron();
    }
}


Hexahedron.prototype.buildLineHexahedron = function(){
    this.square(0,3,2,1);
    this.square(7,4,5,6);

    this.line(2,6);
    this.line(1,5);
    this.line(0,4);
    this.line(3,7);
};

Hexahedron.prototype.line = function(a,b){
    var indices = [ a, b ];
    this.insert( indices );
};

Hexahedron.prototype.square = function(a,b,c,d){
    var indices = [ a, b, b, c, c, d, d, a ];
    this.insert( indices );
}


Hexahedron.prototype.insert = function( indices ){
    for ( var i = 0; i < indices.length; ++i ) {
        this.points.push( this.vertices[ indices[i] ]);
        this.textur.push( this.colorTex[ this.colorN]);
    }
    this.colorN;
}

                      
Hexahedron.prototype.buildTriangleHexahedron = function(){
    this.quad( 1, 0, 3, 2 );
    this.quad( 2, 3, 7, 6 );
    this.quad( 3, 0, 4, 7 );
    this.quad( 6, 5, 1, 2 );
    this.quad( 4, 5, 6, 7 );
    this.quad( 5, 4, 0, 1 );
};




Hexahedron.prototype.quad = function(a, b, c, d) 
{
    var k = this.size; 

    //vertex texture coordinates assigned by the index of the vertex
    var indices = [ a, b, c, a, c, d ];
    var texind  = [ 1, 0, 3, 1, 3, 2 ];

    for ( var i = 0; i < indices.length; ++i ) {
        this.points.push( this.vertices[indices[i]] );
        this.textur.push( this.colorTex[texind [i]] );
    }
    this.colorN++;
}


Hexahedron.prototype.getVertices = function( drawMode ){
    var x = this.xAxisLen;
    var y = this.yAxisLen;
    var z = this.zAxisLen;
    
    if(drawMode === this.LINE || drawMode == this.TRIANGLE){
        return [vec3( -x, -y,  z ),   //0
                vec3( -x,  y,  z ),   //1
                vec3(  x,  y,  z ),   //2
                vec3(  x, -y,  z ),   //3
                vec3( -x, -y, -z ),   //4
                vec3( -x,  y, -z ),   //5
                vec3(  x,  y, -z ),   //6
                vec3(  x, -y, -z )];  //7
    }
}

Hexahedron.prototype.getColorTex = function( drawMode ){
    
    //return a color red
    if( drawMode === this.LINE ){
        return [vec3(this.red, this.blue, this.green) ];
    } 

    //return a texture coordinate of a square
    else if( drawMode === this.TRIANGLE ){
    return [vec2(0, 0), vec2(0, 1),
            vec2(1, 1), vec2(1, 0)];
    }
};

/*BÚA TIL KASS MEÐ ALLAR HLIÐAR sdlfjkl kknmmmmnhjhjhghg!!!

    this.square(0,3,2,1);
    this.square(1,2,6,5);
    this.square(7,4,5,6);
    this.square(3,0,4,7);
    this.square(3,7,6,2);
    this.square(4,0,1,5);
};


/*

/*
      DRASL SEM MÁ HENDA!!!! - ÞS
        points.push( vec3( -0.25, -0.25, -0.25));
        points.push(  vec3( 0.25, -0.25, -0.25));

        points.push( vec3( 0.25, -0.25, -0.25));
        points.push( vec3( 0.25,-0.25,  0.25));

        points.push( vec3( 0.25, -0.25,  0.25));
        points.push( vec3( -0.25, -0.25,  0.25));

        points.push( vec3( -0.25, -0.25, 0.25));
        points.push( vec3( -0.25, -0.25,  -0.25));



        points.push( vec3( -0.25, -0.25, -0.25));
        points.push( vec3( -0.25, 0.25,  -0.25));

        points.push( vec3( 0.25, -0.25, -0.25));
        points.push( vec3( 0.25, 0.25,  -0.25));

        points.push( vec3( -0.25, -0.25, 0.25));
        points.push( vec3( -0.25, 0.25,  0.25));

        points.push( vec3( 0.25, -0.25, 0.25));
        points.push( vec3( 0.25, 0.25,  0.25));


        points.push( vec3( -0.25, 0.25, -0.25));
        points.push(  vec3( 0.25, 0.25, -0.25));

        points.push( vec3( 0.25, 0.25, -0.25));
        points.push( vec3( 0.25, 0.25,  0.25));

        points.push( vec3( 0.25, 0.25,  0.25));
        points.push( vec3( -0.25, 0.25,  0.25));

        points.push( vec3( -0.25, 0.25, 0.25));
        points.push( vec3( -0.25, 0.25, -0.25));*/

       /* colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));

        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));

        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));*/
        /*console.log(colors1);
        console.log(colors);
        debugger;*/




        /*points.push( vec3(-1.5, -5.0, -1.5));
        points.push(  vec3( 1.5, -5.0, -1.5));

        points.push( vec3( 1.5, -5.0, -1.5));
        points.push( vec3( 1.5, -5.0,  1.5));

        points.push( vec3( 1.5, -5.0,  1.5));
        points.push( vec3( -1.5, -5.0,  1.5));

        points.push( vec3( -1.5, -5.0, 1.5));
        points.push( vec3( -1.5, -5.0,  -1.5));



        points.push( vec3( -1.5, -5.0, -1.5));
        points.push( vec3( -1.5, 5.0,  -1.5));

        points.push( vec3( 1.5, -5.0, -1.5));
        points.push( vec3( 1.5, 5.0,  -1.5));

        points.push( vec3( -1.5, -5.0, 1.5));
        points.push( vec3( -1.5, 5.0,  1.5));

        points.push( vec3( 1.5, -5.0, 1.5));
        points.push( vec3( 1.5, 5.0,  1.5));


        points.push( vec3(-1.5, 5.0, -1.5));
        points.push(  vec3( 1.5, 5.0, -1.5));

        points.push( vec3( 1.5, 5.0, -1.5));
        points.push( vec3( 1.5, 5.0,  1.5));

        points.push( vec3( 1.5, 5.0,  1.5));
        points.push( vec3( -1.5, 5.0,  1.5));

        points.push( vec3( -1.5, 5.0, 1.5));
        points.push( vec3( -1.5, 5.0,  -1.5));

        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
    
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));

        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));

        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));
        colors.push( vec3(1.0 , 0.0, 0.0));*/
