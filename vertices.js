var vertices = {
	
	shape: new Shapes(),

	gridIndex:   null,	
	cubeIndex:   null,	
	groundIndex: null,
	counter:     null,	

	build: function( ){
		this.gridIndex = this.makeGrid( );
    	this.cubeIndex = this.makeCube(  );
    	this.groundIndex = this.makeGround( );
    	this.pushVertices( );
	},

	pushVertices: function(){
	    if( drawMode === gl.LINES ){
	        points = points.concat( this.shape.l_points );
	        colors = colors.concat( this.shape.l_colors );
	    } else
	    if( drawMode === gl.TRIANGLES ){
	        points = points.concat( this.shape.t_points );
	        colors = colors.concat( this.shape.t_textur );
	    }
	},

	makeGrid: function( ){
	    return this.add( new Hexahedron(
    	{
            drawMode: {POINTS: false, LINES: true, TRIANGLES: true},
            red: 1.0,
            blue: 0.0,
            green: 0.0,
            xAxisSize: 1.5,
            yAxisSize: 5.0,
            zAxisSize: 1.5
	    }), "grid");
	},

	makeCube: function( ){
	    return this.add( new Hexahedron(
	    {
            drawMode: {POINTS: false, LINES: true, TRIANGLES: true},
            red: 1.0,
            blue: 0.0,
            green: 0.0,
            xAxisSize: 0.25,
            yAxisSize: 0.25,
            zAxisSize: 0.25
    	}), "cube");
	},


	
	makeGround: function( ){
	    return this.add( new Square(
		{
            drawMode: {POINTS: false, LINES: true, TRIANGLES: true},
	        red: 0.0,
	        blue: 0.0,
	        green: 1.0,
	        xAxisSize: 1.0,
	        yAxisSize: 1.0,
	        zAxisSize: 1.0
		}), "ground");
	},

	//puts a shape into a shape keeper that returns
	//a position information in the array, it depends
	//on which drawMode is activated.
	add: function( shape, speciality ){
		return this.shape.insertShape( shape, speciality );
	},


	//VERÐUM AÐ HAFA ÞETTA ALLTAF TEIKNAÐ MEÐ LÍNUM
	renderGrid: function( ctm, matrixLoc){
		var start = this.gridIndex.start;
		var count = this.gridIndex.count;
		//var start = shape.l_subinterval[this.gridIndex.index].start;

		gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));   
		gl.drawArrays(gl.LINES, start, count);
	},

	renderGround: function( ctm, matrixLoc){
		var start = this.groundIndex.start;
		var count = this.groundIndex.count;

        ctm = mult( ctm, translate([0.0, -4.0, 0.0]));
        ctm = mult( ctm, scale4( 5.0,1.0,5.0));
        ctm = mult( ctm, rotate( 90, [ 1, 0, 0]));

		gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));   
		gl.drawArrays(drawMode, start, count);
	}
};