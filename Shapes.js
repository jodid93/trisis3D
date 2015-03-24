"use strict"

function Shapes( descr ){
    if (!this instanceof Shapes)
        return new Shapes();
	
	this.reset();

    for (var property in descr) {
        this[property] = descr[property];
    }
}


Shapes.prototype.shape;	//keep all shapes in one place

Shapes.prototype.t_points;	//keep track of every triangle vertice points
Shapes.prototype.t_textur; //For every three vertices points is a one texture

Shapes.prototype.l_points;	//keep track of every vertice points for Shapes
Shapes.prototype.l_colors; //For every three vertices points is a one
								//special color. 

Shapes.prototype.p_points;	//keep track of every vertice points for Shapes
Shapes.prototype.p_colors; //For every three vertices points is a one
								//special color. 


//keeps track of subinterval for every shape
// 			e.g. if first shape1 have 12 vertices, subinterval[0]
//			will hold the object {start: 0, end: 12}. If second 
//			shape2 have 3 vertices, subinterval[1] will hold
//			the object {start: 12, end: 15} etc.
Shapes.prototype.t_subinterval;
Shapes.prototype.t_numVertices;  //how many vertices in points
Shapes.prototype.t_numShapes;  //how many shape in shapes

Shapes.prototype.l_subinterval;
Shapes.prototype.l_numVertices;  //how many vertices in points
Shapes.prototype.l_numShapes;  //how many shape in shapes



Shapes.prototype.reset = function(){
	this.shape = [];

	this.t_points = [];	
	this.t_textur = []; 
	this.t_subinterval = [];
	this.t_numVertices =  0;  

	this.l_points = [];	
	this.l_colors = [];
	this.l_subinterval = [];
	this.l_numVertices =  0;
	
	this.numShapes   =  0;
};


Shapes.prototype.insertShape = function( shape, enviroment ){
	this.shape.push( shape );
	

	if( enviroment === "grid" ){
		this.t_points = this.t_points.concat( shape.l_points );
		this.t_textur = this.t_textur.concat( shape.l_colors );	
		var temp = this.t_numVertices + shape.l_points.length;
		this.t_subinterval[ this.numShapes ]=
		{
			index: this.numShapes,
			start: this.t_numVertices, 
			count: shape.l_points.length,
			end:   temp 
		};
		this.t_numVertices = temp;
	} else {
		this.t_points = this.t_points.concat( shape.t_points );
		this.t_textur = this.t_textur.concat( shape.t_textur );	
		var temp = this.t_numVertices + shape.t_points.length;
		this.t_subinterval[ this.numShapes ]=
		{
			index: this.numShapes,
			start: this.t_numVertices, 
			count: shape.t_points.length,
			end:   temp 
		};
		this.t_numVertices = temp;
	}
	console.log("t_temp: " + temp);


	this.l_points = this.l_points.concat( shape.l_points );
	this.l_colors = this.l_colors.concat( shape.l_colors );
	var temp = this.l_numVertices + shape.l_points.length;
	console.log( this.numShapes );
	this.l_subinterval[ this.numShapes ] =
	{
		index: this.numShapes, 
		start: this.l_numVertices,
		count: shape.l_points.length, 
		end:   temp 
	};
	this.l_numVertices = temp;

	this.numShapes++;

	console.log("l_temp: " + temp);
	//console.log( this.t_points );
	//console.log( this.l_points );

	
	if( drawMode === gl.LINES ){
		return this.l_subinterval[this.numShapes-1];
	} else
	if( drawMode === gl.TRIANGLES){
		return this.t_subinterval[this.numShapes-1];
	}
};

