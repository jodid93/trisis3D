"use strict"

function Square( descr ){
    for (var property in descr) {
        this[property] = descr[property];
    }

    this.buildSquare();
}


Square.prototype.points = [];	//keep track of every vertice points for Square
Square.prototype.textur = [];  //For every three Square vertices is a one
									//special color. 

Square.prototype.size = 0.25;       //Radius size of Square

Square.prototype.r = 0.2; //red
Square.prototype.g = 0.0; //green
Square.prototype.b = 0.0; //blue
Square.prototype.t = 0.8; //transparent


Square.prototype.colorN = 0;
Square.prototype.texind;

Square.prototype.buildSquare = function(){
	this.texind = [	[0, 3, 2 ],
					[0, 2, 1 ]]; // texture cornes
	
	this.trible(0,1,2);
	this.trible(0,2,3);
};


Square.prototype.trible = function( a, b, c ){
	var k = this.size;

	var vertices = [vec3(-k,-k, 0),
					vec3(-k, k, 0),
					vec3( k, k, 0),
					vec3( k,-k, 0)];

	var texCo = [
        vec2(0, 0),
        vec2(0, 1),
        vec2(1, 1),
        vec2(1, 0)
    ];

	var indices = [ a, b, c ];
	
	for(var i=0; i<indices.length; i++){
		this.points.push( vertices[ indices[i] ] );
		this.textur.push( texCo[  this.texind[this.colorN][i] ] );
	}
    this.colorN++;
};

