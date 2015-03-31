"use strict"

function Octahedron( descr ){
    if (!this instanceof Octahedron)
        return new Octahedron();
    
    for (var property in descr) {
        this[property] = descr[property];
    }

    this.buildOctahedron();
}

Octahedron.prototype.l_points = [];	//keep track of every vertice points for Octahedron
Octahedron.prototype.l_colors = [];  //For every three Octahedron vertices is a one
				
Octahedron.prototype.t_points = [];	//keep track of every vertice points for Octahedron
Octahedron.prototype.t_textur = [];  //For every three Octahedron vertices is a one
									//special color. 

Octahedron.prototype.size = 0.5;       //Radius size of Octahedron

Octahedron.prototype.colorN = 0;

Octahedron.prototype.r; //r
Octahedron.prototype.g; //green
Octahedron.prototype.b; //blue
Octahedron.prototype.t; //transparent

Octahedron.prototype.color_;
/*Octahedron.prototype.buildOctahedron = function(){
	
	this.color_ =  [[ this.r, 0.7, this.b, 1.0 ],  // black
			[ this.r, 0.4, this.b, 1.0 ],  // red
		        [ this.r, 0.7, this.b, 1.0 ],  // yellow
		        	[ this.r, 0.4, this.b, 1.0 ],  // yellow
		        	[ this.r, 0.5, this.b, 1.0 ],  // yellow
		        	[ this.r, 0.5, this.b, 1.0 ],  // yellow
		        	[ this.r, 0.5, this.b, 1.0 ],  // yellow
		        	[ this.r, 0.5, this.b, 1.0 ],  // yellow
		        	[ this.r, 0.5, this.b, 1.0 ],  // yellow
		        	[ this.r, 0.5, this.b, 1.0 ],  // yellow
		        	[ this.r, 0.5, this.b, 1.0 ],  // yellow
		        	[ this.r, 0.4, this.b, 1.0 ],  // yellow
		        	[ this.r, 0.5, this.b, 1.0 ],  // yellow
		        	[this.r, 0.7, this.b, 1.0 ]]; // green



	//vængir tveir, hægri og vinstri (þríhyrningar)
	this.triple(0,1,2); //right arm
	this.triple(1,3,2); //front up
	this.triple(3,5,2); //left arm
	this.triple(5,0,2);

	this.triple(3,1,4);
	this.triple(3,4,5);
	//this.triple(1,0,4);
	this.triple(5,3,4);
	this.triple(0,5,4);
	this.triple(4,1,0);
	//this.triple(4,1,0);
};


Octahedron.prototype.triple = function( a1, b1, c1 ){
	var k = this.size;

	var a = 1/(2*Math.sqrt(2));
	var b = 1/2;

	var vertices = [vec3(-a, 0, a), 
					vec3(-a, 0,-a), 
					vec3( 0, b, 0), 
					vec3( a, 0,-a), 
					vec3( 0,-b, 0), 
					vec3( a, 0, a)];

	var indices = [ a1, b1, c1 ];
	
	for(var i=0; i<indices.length; i++){
		this.l_points.push( vertices[ indices[i] ] );
		this.t_points.push( vertices[ indices[i] ] );
		this.l_colors.push( this.color_[ this.colorN ] );
		this.t_textur.push( this.color_[ this.colorN ] );
	}
    	this.colorN++;
};*/



Octahedron.prototype.buildOctahedron = function(){
	
	this.color_ =  [vec4(this.r, this.g, this.b, 1.0 )];  /*// black
			[ this.r, this.g, this.b, 1.0 ],  // red
		        [ this.r, this.g, this.b, 1.0 ],  // yellow
		        	[ this.r, this.g, this.b, 1.0 ],  // yellow
		        	[ this.r, this.g, this.b, 1.0 ],  // yellow
		        	[ this.r, this.g, this.b, 1.0 ],  // yellow
		        	[ this.r, this.g, this.b, 1.0 ],  // yellow
		        	[ this.r, this.g, this.b, 1.0 ],  // yellow
		        	[ this.r, this.g, this.b, 1.0 ],  // yellow
		        	[ this.r, this.g, this.b, 1.0 ],  // yellow
		        	[ this.r, this.g, this.b, 1.0 ],  // yellow
		        	[this.r, this.g, this.b, 1.0 ]]; // green*/

		        	console.log( this.r );
		        	//debugger;
	this.line( 0, 1 );
	this.line( 1, 2 );
	this.line( 2, 3 );
	this.line( 3, 4 );
	this.line( 4, 5 );
	
	this.line( 5, 0 );
	this.line( 0, 2 );
	this.line( 2, 5 );
	this.line( 3, 5 );
	this.line( 4, 1 );
	this.line( 4, 0 );
	this.line( 1, 3 );
};



Octahedron.prototype.line = function( a1, b1 ){
	var k = this.size;

	var a = 1/(2*Math.sqrt(2));
	var b = 1/2;

	var vertices = [vec3(-a, 0, a), 
					vec3(-a, 0,-a), 
					vec3( 0, b, 0), 
					vec3( a, 0,-a), 
					vec3( 0,-b, 0), 
					vec3( a, 0, a)];

	var indices = [ a1, b1 ];
	
	for(var i=0; i<indices.length; i++){
		this.l_points.push( vertices[ indices[i] ] );
		this.t_points.push( vertices[ indices[i] ] );
		this.l_colors.push( this.color_[ this.colorN ] );
		this.t_textur.push( this.color_[ this.colorN ] );
	}
    	//this.colorN++;
};


