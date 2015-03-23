"use strict"

function Shapes( descr ){
    for (var property in descr) {
        this[property] = descr[property];
    }
}


Shapes.prototype.shape = [];	//keep all shapes in one place
Shapes.prototype.swings = [];	//keep all swing motion for each shape in array shape
Shapes.prototype.points = [];	//keep track of every vertice points for Shapes
Shapes.prototype.textur = []; 	//For every three vertices points is a one
								//special color. 

//keeps track of subinterval for every shape
// 			e.g. if first shape1 have 12 vertices, subinterval[0]
//			will hold the object {start: 0, end: 12}. If second 
//			shape2 have 3 vertices, subinterval[1] will hold
//			the object {start: 12, end: 15} etc.
Shapes.prototype.subinterval = [];
Shapes.prototype.numVertices =  0;  //how many vertices in points
Shapes.prototype.numShapes   =  0;  //how many shape in shapes



Shapes.prototype.insertShape = function( shape ){
	this.shape.push( shape );
	this.points = this.points.concat( shape.points );
	this.textur = this.textur.concat( shape.textur );
	//this.swings = this.swings.concat( new Swing()  );
	var temp = this.numVertices + shape.points.length;
	this.subinterval[ this.numShapes ] = {start: this.numVertices, end: temp };
	this.numVertices = temp;
	this.numShapes++;
};

