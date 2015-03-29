var pinski = {
        //creating square points
        vertices: [
            vec2( -1, -1 ),
            vec2( -1,  1 ),
            vec2(  1,  1 ),
            vec2(  1, -1 )
        ],

    //Creates a array of points in a specific order 
    //(for two triangles that creates a shape of a box)
    //
    //      b___c 
    //      |\  |
    //      | \ |
    //      |__\|
    //      a   d
    createBox: function(a,b,c,d){
        return [a, b, d, 
                c, b, d];
    },

    // (a,b,c,d)->pushed into array in this order->[a,b,d,c,b,d]
    box: function(a,b,c,d){
        var vertices = createBox(a,b,c,d);
        for(var i=0; i<vertices.length; i++){
            points.push(vertices[i]);
        }
    },


    //Center of the these points (A,B,C,D) is an empty box
    //Around the empty box Divides a box into 8 seprate boxes 
    divideBox: function(A, B, C, D, count){
        
        if(count === 0){
            box( A, B, C, D);
        }
        else
        {
            count--;

            var AB =  mix(B, A, 1/3 );
            var BA =  mix(B, A, 2/3 );

            var BC =  mix(C, B, 1/3 );
            var CB =  mix(C, B, 2/3 );

            var CD =  mix(D, C, 1/3 );
            var DC =  mix(D, C, 2/3 );

            var AD =  mix(D, A, 1/3 );
            var DA =  mix(D, A, 2/3 );

            var a  =  mix(BC,AD,1/3 );
            var b  =  mix(BC,AD,2/3 );
            var d  =  mix(CB,DA,1/3 );
            var c  =  mix(CB,DA,2/3 );

            //LEFT                              //POSITION IN THE BOX
            divideBox( A, AB,  a, AD, count);   //1
            divideBox(AB, BA,  b, a,  count);   //2
            divideBox(BA,  B, BC, b,  count);   //3

            //CENTER
            divideBox(b, BC, CB, c,   count);   //4
            divideBox(AD, a, d, DA,   count);   //5

            //RIGHT
            divideBox(c, CB, C, CD,   count);   //6
            divideBox(d,  c, CD, DC,  count);   //7
            divideBox(DA, d, DC, D,   count);   //8

            //  An picture of the points here above:
            //
            //  B_______BC______CB______C
            //  |   3   |   4   |   6   |
            //  BA------b-------c-------CD
            //  |   2   |       |   7   |
            //  AB------a-------d-------DC
            //  |   1   |   5   |   8   |
            //  A-------AD------DA------D
        }
    }
};