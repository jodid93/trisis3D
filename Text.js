"use strict"

function Text( descr ){
    if (!this instanceof Text)
        return new Text();

    this.reset();
    
    for (var property in descr) {
        this[property] = descr[property];
    }

    if( this.text === 'press' ){
    	this.buildPRESS();
    }
    else if( this.text === 'enter' ){
    	this.buildENTER();
    }
    else if( this.text === 'to' ){
    	this.buildTO();
    }
    else if( this.text === 'start' ){
    	this.buildSTART();
    }
}

Text.prototype.text;

Text.prototype.l_points = [];	//keep track of every vertice points for Text
Text.prototype.l_colors = [];  //For every three Text vertices is a one
				
Text.prototype.t_points = [];	//keep track of every vertice points for Text
Text.prototype.t_textur = [];  //For every three Text vertices is a one
									//special color. 

Text.prototype.size = 0.5;       //Radius size of Text

Text.prototype.colorN = 0;

Text.prototype.r; //r
Text.prototype.g; //green
Text.prototype.b; //blue
Text.prototype.t; //transparent

Text.prototype.color_;


Text.prototype.reset = function(){
    this.t_points   = [];
    this.t_textur   = [];
    this.t_textures =  0;
    
    this.l_points   = [];
    this.l_colors   = [];
    this.l_colors__ =  0;

    this.colorN     =  0;

    this.size     = 0.5;
};


Text.prototype.buildPRESS = function(){
	this.color_ =  [vec4(this.r, this.g, this.b, 1.0 )]; 
	//P
	this.line( 0, 19 );
	this.line( 0, 1 );
	this.line( 1, 20 );
	this.line( 20, 19 );
	this.line( 19, 38 );

	//R
	this.line( 2, 40 );
	this.line( 2, 3 );
	this.line( 3, 22 );
	this.line( 22, 21 );
	this.line( 21, 41 );

	//E
	this.line( 4, 5 );
	this.line( 23, 24 );
	this.line( 42, 43 );
	this.line( 4, 42 );

	//S
	this.line( 7, 6 );
	this.line( 6, 25 );
	this.line( 25, 26 );
	this.line( 26, 45 );
	this.line( 45, 44 );

	//S
	this.line( 9, 8 );
	this.line( 8, 27 );
	this.line( 27, 28 );
	this.line( 28, 47 );
	this.line( 47, 46 );
};

Text.prototype.buildENTER = function(){
	this.color_ =  [vec4(this.r, this.g, this.b, 1.0 )]; 
	//E
	this.line( 0, 1 );
	this.line( 19, 20 );
	this.line( 38, 39 );
	this.line( 0, 38 );
	
	//N
	this.line( 40, 2 );
	this.line( 2, 41 );
	this.line( 41, 3 );

	//T
	this.line( 4, 6 );
	this.line( 5, 43 );

	//E
	this.line( 7, 8 );
	this.line( 26, 27 );
	this.line( 45, 46 );
	this.line( 7, 45 );

	//R
	this.line( 9, 47 );
	this.line( 9, 10 );
	this.line( 10, 29 );
	this.line( 29, 28 );
	this.line( 28, 48 );
};


Text.prototype.buildTO = function(){
	this.color_ =  [vec4(this.r, this.g, this.b, 1.0 )]; 
	//E
	this.line( 0, 2 );
	this.line( 1, 39 );
	
	//N
	this.line( 3, 4 );
	this.line( 4, 42 );
	this.line( 42, 41 );
	this.line( 41, 3 );

};


Text.prototype.buildSTART = function(){
	this.color_ =  [vec4(this.r, this.g, this.b, 1.0 )]; 
	//S
	this.line( 0, 1 );
	this.line( 0, 19 );
	this.line( 19, 20 );
	this.line( 20, 39 );
	this.line( 39, 38 );

	//T
	this.line( 2, 4 );
	this.line( 3, 41 );

	//A
	this.line( 5, 6 );
	this.line( 5, 43 );
	this.line( 6, 44 );
	this.line( 24, 25 );

	//R
	this.line( 7, 45 );
	this.line( 7, 8 );
	this.line( 8, 27 );
	this.line( 27, 26 );
	this.line( 26, 46 );

	//T
	this.line( 9, 11 );
	this.line( 10, 48 );
};



Text.prototype.line = function( a1, b1 ){
	var k = this.size;

	var space = 0.1; 
	var s1 = space; //space
	var s2 = space / 2; //space
	var z = 0.0;

	var vertices = [vec3( s1*9, s1*1, z), //0
					vec3( s1*8, s1*1, z), //1
					vec3( s1*7, s1*1, z), //2
					vec3( s1*6, s1*1, z), //3
					vec3( s1*5, s1*1, z), //4
					vec3( s1*4, s1*1, z), //5
					vec3( s1*3, s1*1, z), //6
					vec3( s1*2, s1*1, z), //7
					vec3( s1*1, s1*1, z), //8
					vec3( s1*0, s1*1, z), //9
					vec3(-s1*1, s1*1, z), //10
					vec3(-s1*2, s1*1, z), //11
					vec3(-s1*3, s1*1, z), //12
					vec3(-s1*4, s1*1, z), //13
					vec3(-s1*5, s1*1, z), //14
					vec3(-s1*6, s1*1, z), //15
					vec3(-s1*7, s1*1, z), //16
					vec3(-s1*8, s1*1, z), //17
					vec3(-s1*9, s1*1, z), //18

					vec3( s1*9, s1*0, z), //19
					vec3( s1*8, s1*0, z), //20
					vec3( s1*7, s1*0, z), //21
					vec3( s1*6, s1*0, z), //22
					vec3( s1*5, s1*0, z), //23
					vec3( s1*4, s1*0, z), //24
					vec3( s1*3, s1*0, z), //25
					vec3( s1*2, s1*0, z), //26
					vec3( s1*1, s1*0, z), //27
					vec3( s1*0, s1*0, z), //28
					vec3(-s1*1, s1*0, z), //29
					vec3(-s1*2, s1*0, z), //30
					vec3(-s1*3, s1*0, z), //31
					vec3(-s1*4, s1*0, z), //32
					vec3(-s1*5, s1*0, z), //33
					vec3(-s1*6, s1*0, z), //34
					vec3(-s1*7, s1*0, z), //35
					vec3(-s1*8, s1*0, z), //36
					vec3(-s1*9, s1*0, z), //37
					
					vec3( s1*9, -s1*1, z), //38
					vec3( s1*8, -s1*1, z), //39
					vec3( s1*7, -s1*1, z), //41
					vec3( s1*6, -s1*1, z), //42
					vec3( s1*5, -s1*1, z), //43
					vec3( s1*4, -s1*1, z), //44
					vec3( s1*3, -s1*1, z), //45
					vec3( s1*2, -s1*1, z), //46
					vec3( s1*1, -s1*1, z), //47
					vec3( s1*0, -s1*1, z), //48
					vec3(-s1*1, -s1*1, z), //49
					vec3(-s1*2, -s1*1, z), //50
					vec3(-s1*3, -s1*1, z), //51
					vec3(-s1*4, -s1*1, z), //52
					vec3(-s1*5, -s1*1, z), //53
					vec3(-s1*6, -s1*1, z), //54
					vec3(-s1*7, -s1*1, z), //55
					vec3(-s1*8, -s1*1, z), //56
					vec3(-s1*9, -s1*1, z), //57
					];

	var indices = [ a1, b1 ];
	
	for(var i=0; i<indices.length; i++){
		this.l_points.push( vertices[ indices[i] ] );
		this.t_points.push( vertices[ indices[i] ] );
		this.l_colors.push( this.color_[ this.colorN ] );
		this.t_textur.push( this.color_[ this.colorN ] );
	}
	console.log( this.color_ );
};


