var startScreen = {

	shape: new Shapes(),
	points: [],
	colors: [],
	index: [],
	spinY: 0,

	build: function(){
		starter( 1.0, 1.0, 1.0, 1.0 );
		initializeLocation();

		this.index = this.shape.insertShape( new Octahedron(), "startScreen" );
		this.points = this.shape.shape[0].points;
		this.colors = this.shape.shape[0].colors;
	},


	render: function(){
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		this.spinY += 0.01;

	    var ctmStack = [];
	    var proj = perspective( 50.0, 1.0, 0.2, 100.0 );
	    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
	    
	    var ctm = lookAt( vec3(0.0, 0.0, -5.0), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
	    ctm = mult( ctm, rotate( parseFloat(this.spinY), [0, 1, 0] ) );
	    ctm = mult( ctm, scale4(0.3,0.3,0.3));
	    
	    /*console.log( this.points.length );
	    debugger;*/

	 	gl.uniformMatrix4fv(mvLoc, false, flatten(ctm));
	    gl.drawArrays(gl.LINES, 0, this.points.length);
	},

 
	buildBuffers: function(){
		cBuffer = gl.createBuffer();
	    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.colors), gl.STATIC_DRAW );

	    var vColor = gl.getAttribLocation( program, "vColor" );
	    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
	    gl.enableVertexAttribArray( vColor );

	    kassi = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, kassi);
	    gl.bufferData(gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW);

	    var vPosition = gl.getAttribLocation( program, "vPosition" );
	    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	    gl.enableVertexAttribArray( vPosition );

	    var locColor = gl.getUniformLocation( program, "fColor" );
	    gl.uniform4fv( locColor, flatten(this.colors) );

	    var drMode = gl.getUniformLocation( program, "drawMode" );
	    gl.uniform2fv( drMode, flatten(vec2(0.0, 1.0)) );
	}
};