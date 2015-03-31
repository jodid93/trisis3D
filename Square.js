"use strict"

function Square( descr ){
    if (!this instanceof Square)
        return new Square();
    
    this.reset();
    
    for (var property in descr) {
        this[property] = descr[property];
    }

    this.vertices = this.getVertices( );
    this.t_textures = this.getTexture( );
    this.l_colors__ = this.getColor( );

    this.build( );
}

//TEXTURE MODE VERTICES
Square.prototype.t_points = [];	//keep track of LINE vertices points for Square
Square.prototype.t_textur = [];  //For every three Square vertices is an texturepart
Square.prototype.texturN  =  0;


//LINE MODE VERTICES
Square.prototype.l_points = [];   //keep track of every vertice points for Square
Square.prototype.l_colors = [];  //For every one Square vertices is a one special color. 
Square.prototype.colorN   =  0;


Square.prototype.size = 0.25;       //Radius size of Square

//COLORS
Square.prototype.red; 
Square.prototype.green;
Square.prototype.bue; 
Square.prototype.transparent;

//AXIS SIZES
Square.prototype.xAxisSize;
Square.prototype.yAxisSize;
Square.prototype.zAxisSize;

//
//COORDINATES
//
Square.prototype.vertices;
//texture mode
Square.prototype.t_textures;
//color mode
Square.prototype.l_colors__;


Square.prototype.texCopies;



Square.prototype.reset = function(){
    this.vertices   =  0;
    
    this.texCopies = 1;

    this.t_points   = [];
    this.t_textur   = [];
    this.t_textures =  0;
    this.textureN   =  0;

    this.l_points   = [];
    this.l_colors   = [];
    this.l_colors__ =  0;
    this.colorN     =  0;
    
    this.size     = 0.25;
    this.xAxisSize = this.size;
    this.yAxisSize = this.size;
    this.zAxisSize = this.size;
}


Square.prototype.build = function( ){
    this.buildLineSquare();
    this.buildTextureSquare();
}


Square.prototype.buildLineSquare = function(){
    this.square(0,1,2,3);
};


Square.prototype.square = function(a,b,c,d){
    var indices = [ a, b, b, c, c, d, d, a ];
    this.insert( indices );
};


Square.prototype.insert = function( indices ){

    for ( var i = 0; i < indices.length; ++i ) {
        this.l_points.push( this.vertices[ indices[i] ]);
        this.l_colors.push( this.l_colors__[ this.colorN]);
    }

    this.colorN;
};

                      
Square.prototype.buildTextureSquare = function(){
    this.quad( 1, 0, 3, 2);
};
/*

Square.prototype.buildTextureSquare = function(){
    this.quad( 0, 1, 2, 3);
};
*/

Square.prototype.quad = function(a, b, c, d) 
{
    //vertex texture coordinates assigned by the index of the vertex
     var indices = [ a, b, c, a, c, d ];
    var texind  = [ 1, 2, 3, 1, 3, 2 ];

    for ( var i = 0; i < indices.length; ++i ) {
        this.t_points.push( this.vertices[indices[i]]  );
        this.t_textur.push( this.t_textures[texind [i]]);

    }
    
    this.texturN++; //gerir ekki neitt
};
/*
Square.prototype.quad = function(a, b, c, d) 
{
    //vertex texture coordinates assigned by the index of the vertex
     var indices = [ a, b, c, d];
    var texind  = [ a, b, c, d];

    for ( var i = 0; i < indices.length; ++i ) {
        this.t_points.push( this.vertices[indices[i]]  );
        this.t_textur.push( this.t_textures[texind [i]]);

    }
    
    this.texturN++; //gerir ekki neitt
};*/




Square.prototype.getVertices = function(  ){
    var x = this.xAxisSize;
    var y = this.yAxisSize;
    var z = this.zAxisSize;
    
    return [vec3(-x,-y, z), //0
            vec3(-x, y, z), //1
            vec3( x, y, z), //2
            vec3( x,-y, z)];//3
};

//return a color red
Square.prototype.getColor = function( ){    
    return [vec3(this.red, this.blue, this.green) ];
};


//return a texture coordinate of a square
Square.prototype.getTexture = function( ){  
    console.log("this.texCopies: " + this.texCopies)  
    return [vec2(0, 0),                         //0
            vec2(0, this.texCopies),            //1
            vec2(this.texCopies, this.texCopies),//2 
            vec2(this.texCopies, 0)];               //3
};