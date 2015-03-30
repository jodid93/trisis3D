var texture = {
    
    storage: [],

    convertImagesToTexture: function( images ){
        var counter = 0;
        for( var image in images){
            this.storage.push( this.configureTexture( images[image], counter ) );
            counter++;
        }
        gl.uniform1i(gl.getUniformLocation(program, "texture1"), 0);
        return this.storage;
    },
    
    //procces a image to a fully texture
    configureTexture: function( image, index ) {
        texture = gl.createTexture();
        gl.bindTexture( gl.TEXTURE_2D, texture );
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
        gl.generateMipmap( gl.TEXTURE_2D );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
        gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
        return texture;
    },

};