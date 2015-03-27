var vertices = {
	
	shape: new Shapes(),

	gridIndex:      null,
	cubeIndex:      null,	
	worldIndex:     null,	
	groundIndex:    null,
	pointGridIndex: null,	

	build: function( ){
    	this.worldIndex = this.makeWorld( );
		this.gridIndex = this.makeGrid( );
    	this.cubeIndex = this.makeCube(  );
    	this.groundIndex = this.makeGround( );
    	this.pointGridIndex = this.makePointGrid( );
    	this.pushVertices( );
	},

	pushVertices: function(){
	    if( drawMode === gl.LINES ){
	        points = points.concat( this.shape.l_points );
	        colors = colors.concat( this.shape.l_colors );
	    } else
	    if( drawMode === gl.TRIANGLES ){
	        points = points.concat( this.shape.t_points );
	        texCoords = texCoords.concat( this.shape.t_textur );
	    }
	    //texCoords = texCoords.concat( this.shape.t_textur); 
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

	makePointGrid: function( ){
	    var storePoints = [];
	    var storeColors = [];

	    var xStart = -1.0;
	    var yStart = -4.5;
	    var zStart = -1.0;
	    var xEnd   =  1.0;
	    var yEnd   =  4.5;
	    var zEnd   =  1.0;

	    var factor = 0.5;
	    for(var x=xStart; x<=xEnd; x = x+factor ){
		    	for(var y=yStart; y<=yEnd; y = y+factor ){
		    for(var z=zStart; z<=zEnd; z = z+factor ){
	    			mat = mat4();
	    			mat = mult( mat, translate([x, y, z]));
					vec = vec3(mat[0][3],mat[1][3],mat[2][3]);
	    			storePoints.push( vec );
	    			storeColors.push( vec4(0.5, 0.5, 0.5, 1.0) );
	    		}
	    	}
	    }

	    return this.add( {	p_points: storePoints, 
	    					p_colors: storeColors }, "pointGrid" );
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

	makeWorld: function( ){
		return this.add( new Hexahedron(
		{
            drawMode: {POINTS: false, LINES: true, TRIANGLES: true},
	        red: 0.0,
	        blue: 0.0,
	        green: 1.0,
	        xAxisSize: 50.0,
	        yAxisSize: 40.0,
	        zAxisSize: 50.0
		}), "world");
	},

	//puts a shape into a shape keeper that returns
	//a position information in the array, it depends
	//on which drawMode is activated.
	add: function( shape, speciality ){
		return this.shape.insertShape( shape, speciality );
	},



	renderGrid: function( ctm, matrixLoc){
	
		ctm = mult( ctm, translate([0.0, 0.12, 0.0]));	

		gl.activeTexture( gl.TEXTURE0 );
    	gl.bindTexture(gl.TEXTURE_2D, textures[1]);
		gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));   
		//gl.uniform1i(gl.getUniformLocation(program, "texture1"), 8);
	
		var start1 = this.gridIndex.start;
		var count1 = this.gridIndex.count;
		//draw a outlined structure of the grid
		if( GRID_ONE ){
			gl.drawArrays(gl.LINES, start1, count1);
		}

		//draw square ground for the
		//trisis cubes landing place
		if( GRID_TWO ){
			gl.drawArrays(gl.LINES, start1,    2);
			gl.drawArrays(gl.LINES, start1+8,  2);
			gl.drawArrays(gl.LINES, start1+20, 2);
			gl.drawArrays(gl.LINES, start1+22, 2);
		}

		//draw dots in every possiable
		//cube corner possition in the grid
		if( gridPoints ){
			var start2 = this.pointGridIndex.start;
			var count2 = this.pointGridIndex.count;
			gl.drawArrays(gl.POINTS, start2, count2);
		}
	},

	renderGround: function( ctm, matrixLoc){
		var start = this.groundIndex.start;
		var count = this.groundIndex.count;

        ctm = mult( ctm, translate([0.0, -3.9, 0.0]));
        ctm = mult( ctm, scale4( 5.0,1.0,5.0));
        ctm = mult( ctm, rotate( 90, [ 1, 0, 0]));

        gl.activeTexture( gl.TEXTURE0 );
    	gl.bindTexture(gl.TEXTURE_2D, textures[5]);
		gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));   
		//gl.uniform1i(gl.getUniformLocation(program, "texture1"), 3);
		gl.drawArrays(drawMode, start, count);
	},

	renderWorld: function( ctm, matrixLoc ){
		var start = this.worldIndex.start;
		var count = this.worldIndex.count;
		
		ctm = mult(ctm, translate([0.0,35.0,0.0]));
		gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm));

		gl.activeTexture( gl.TEXTURE0 );
    	gl.bindTexture(gl.TEXTURE_2D, textures[8]);
		//gl.uniform1i(gl.getUniformLocation(program, "texture1"), 6);
		gl.drawArrays(gl.TRIANGLES, start, count);
	}
};