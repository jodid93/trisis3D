var texture = {
	
	storage: [],

	convertImagesToTexture: function( images ){
        for( var image in images){
			this.storage.push( this.configureTexture( images[image] ) );
		}
        this.activeTexture();
        return this.storage;
	},

	//procces a image to a fully texture
    configureTexture: function( image ) {
        texture = gl.createTexture();
        gl.bindTexture( gl.TEXTURE_2D, texture );
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
        gl.generateMipmap( gl.TEXTURE_2D );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
        return texture;
    },

    //LAGA: það þarf að setja texture dót í fragment-sh.
    //      skoðum það þegar það er komið á hreint hvernig
    //      best er að vinna texture-ið (local-host...)

    //Activate all texture, all texture is stored
    //in the fragment-shader (trisis.html)
    activeTexture: function(){        
        // gl[("TEXTURE" + 0)] => gl.TEXTURE0
        for(var i=0; i<this.storage.length; i++){
            gl.activeTexture( gl[("TEXTURE" + i)] );
            gl.bindTexture(gl.TEXTURE_2D, this.storage[i]);
        }
        
        /*gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.storage[2]);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.storage[3]);*/

        /*gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.storage[1]); */
        // .
        // .
        // .
    }
};