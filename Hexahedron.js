"use strict"

function Hexahedron( descr ){
    if (!this instanceof Hexahedron)
        return new Hexahedron();
    
    this.reset();
    
    for (var property in descr) {
        this[property] = descr[property];
    }

    this.vertices = this.getVertices( );
    this.t_textures = this.getTexture( );
    this.l_colors__ = this.getColor( );
    this.p_colors__ = this.getColor( );

    this.build( );
}

//TEXTURE MODE VERTICES
Hexahedron.prototype.t_points = [];	//keep track of LINE vertices points for Hexahedron
Hexahedron.prototype.t_textur = [];  //For every three Hexahedron vertices is an texturepart
Hexahedron.prototype.texturN  =  0;


//LINE MODE VERTICES
Hexahedron.prototype.l_points = [];   //keep track of every vertice points for Hexahedron
Hexahedron.prototype.l_colors = [];  //For every one Hexahedron vertices is a one special color. 
Hexahedron.prototype.colorN   =  0;

//POINT MODE VERTICES
Hexahedron.prototype.p_points = [];   //keep track of every vertice points for Hexahedron
Hexahedron.prototype.p_colors = [];  //For every one Hexahedron vertices is a one special color. 
Hexahedron.prototype.p_colorN   =  0;


Hexahedron.prototype.size = 0.25;       //Radius size of Hexahedron

//COLORS
Hexahedron.prototype.red; 
Hexahedron.prototype.green;
Hexahedron.prototype.bue; 
Hexahedron.prototype.transparent;

//AXIS SIZES
Hexahedron.prototype.xAxisSize;
Hexahedron.prototype.yAxisSize;
Hexahedron.prototype.zAxisSize;

//
//COORDINATES
//

Hexahedron.prototype.drawMode;

Hexahedron.prototype.vertices;
//texture mode
Hexahedron.prototype.t_textures;
//color mode
Hexahedron.prototype.l_colors__;


//Fastar
Hexahedron.prototype.LINE     = 1; //gl.LINES
Hexahedron.prototype.TRIANGLE = 4; //gl.TRIANGLES


Hexahedron.prototype.reset = function(){
    
    this.drawMode   = [];

    this.vertices   =  0;
    
    this.t_points   = [];
    this.t_textur   = [];
    this.t_textures =  0;
    this.textureN   =  0;

    this.l_points   = [];
    this.l_colors   = [];
    this.l_colors__ =  0;
    this.colorN     =  0;
    
    this.p_points   = [];
    this.p_colors   = [];
    this.p_colors__ =  0;
    this.colorN     =  0;

    this.size     = 0.25;
    this.xAxisSize = this.size;
    this.yAxisSize = this.size;
    this.zAxisSize = this.size;
}


Hexahedron.prototype.build = function( ){
    if( this.drawMode.POINTS )
    {
        this.buildPointHexahedron();
    }
    if( this.drawMode.LINES )
    {
        this.buildLineHexahedron();
    } 
    if( this.drawMode.TRIANGLES )
    {
        this.buildTriangleHexahedron();
    }
}

Hexahedron.prototype.buildPointHexahedron = function(){
    this.points( [0, 1, 2, 3, 4, 5, 6, 7] );
};

Hexahedron.prototype.points = function( indices ){
    for ( var i = 0; i < indices.length; ++i ) {
        this.p_points.push( this.vertices[indices[i]] );
        this.p_colors.push( this.p_colors__[this.p_colorN] );
    }
    this.p_colorN;
};

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
};


Hexahedron.prototype.insert = function( indices ){

    for ( var i = 0; i < indices.length; ++i ) {
        this.l_points.push( this.vertices[ indices[i] ]);
        this.l_colors.push( this.l_colors__[ this.colorN]);
    }

    this.colorN;
};

                      
Hexahedron.prototype.buildTriangleHexahedron = function(){
    this.quad( 1, 0, 3, 2 );
    this.quad( 2, 3, 7, 6 );
    this.quad( 3, 0, 4, 7 );
    this.quad( 6, 5, 1, 2 );
    this.quad( 6, 7, 4, 5 );
    this.quad( 5, 4, 0, 1 );
};




Hexahedron.prototype.quad = function(a, b, c, d) 
{
    //vertex texture coordinates assigned by the index of the vertex
    var indices = [ a, b, c, a, c, d ];
    var texind  = [ 1, 0, 3, 1, 3, 2 ];

    for ( var i = 0; i < indices.length; ++i ) {
        this.t_points.push( this.vertices[indices[i]] );
        this.t_textur.push( this.t_textures[texind [i]] );
    }
    this.texturN++; //gerir ekki neitt
};


Hexahedron.prototype.getVertices = function(  ){
    var x = this.xAxisSize;
    var y = this.yAxisSize;
    var z = this.zAxisSize;
    
    return [vec3( -x, -y,  z ),   //0
            vec3( -x,  y,  z ),   //1
            vec3(  x,  y,  z ),   //2
            vec3(  x, -y,  z ),   //3
            vec3( -x, -y, -z ),   //4
            vec3( -x,  y, -z ),   //5
            vec3(  x,  y, -z ),   //6
            vec3(  x, -y, -z )];  //7
};

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

//return a color red
Hexahedron.prototype.getColor = function( ){    
    return [vec3(this.red, this.blue, this.green) ];
};


//return a texture coordinate of a square
Hexahedron.prototype.getTexture = function( ){    
    return [vec2(0, 0), vec2(0, 1),
            vec2(1, 1), vec2(1, 0)];
};