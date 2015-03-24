//function sem skilgreinir Orma "klasann"
function Kubbur(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Initial, inheritable, default values
Kubbur.prototype.size;
Kubbur.prototype.location1;
Kubbur.prototype.location2;
Kubbur.prototype.location3;
Kubbur.prototype.arrayIndex;
Kubbur.prototype.time = 0;
Kubbur.prototype.landed = false;
Kubbur.prototype.signal = 0;
Kubbur.prototype.active = true;
Kubbur.prototype.type;
Kubbur.prototype.state = 1;
Kubbur.prototype.block1Alive = true;
Kubbur.prototype.block2Alive = true;
Kubbur.prototype.block3Alive = true;

//CONSTANT

//fall til að uppfæra kubba
Kubbur.prototype.update = function (du) {
    
    //kill me now value
    if(this.size <= 0){
        return -1;
    }
    this.time += du;

    console.log('checking')
    playField[this.location1[0]][this.location1[1]][this.location1[2]] = false;
    playField[this.location2[0]][this.location2[1]][this.location2[2]] = false;
    playField[this.location3[0]][this.location3[1]][this.location3[2]] = false;

    //check for rotations
    if(keys[A]&& this.active){


        if(this.type === 1){

            if(this.state === 1){
                console.log("case 1, type 1, A");
                if(this.location2[2]-1 >= 0 && this.location2[2]+1 <= 5 &&
                    playField[this.location2[0]][this.location2[1]][this.location2[2]+1] === false&&
                    playField[this.location2[0]][this.location2[1]][this.location2[2]-1] === false){

                    this.location1[2]--;
                    this.location1[1] = this.location2[1];
                    this.location3[2]++;
                    this.location3[1] = this.location2[1];
                    this.state = 2;
                    keys[A] = false;
                }
            }
            else if(this.state === 2){

                console.log("case 2, type 1, A");
                if( this.location1[1]+1 <= 21 &&
                    playField[this.location2[0]][this.location2[1]+1][this.location2[2]] === false &&
                    playField[this.location2[0]][this.location2[1]-1][this.location2[2]] === false){

                    this.location1[2] = this.location2[2];
                    this.location1[1]--;
                    this.location3[2] = this.location2[2];
                    this.location3[1]++;
                    this.state = 1;
                    keys[A] = false;
                }

            }
            else if(this.state === 3){
                console.log("case 3, type 1, A");
                
                    keys[A] = false;
                
            }
        }else{

            console.log(this.state)
            if(this.type === 2){
                if(this.state === 1){
                    console.log("case 1, type 2, A");
                    if( this.location2[2]-1 >= 0 &&
                    playField[this.location2[0]][this.location2[1]][this.location2[2]-1] === false){

                        this.location3[1] = this.location2[1];
                        this.location3[2]--;
                        this.state = 10;
                        keys[A] = false;
                    }

                }else if(this.state === 2){
                    console.log("case 2, type 2, A");
                    if( playField[this.location2[0]][this.location2[1]+1][this.location2[2]+1] === false){

                        this.location1[2]--;
                        this.location2[2]++;
                        this.location3[2]++;
                        this.state = 4;
                        keys[A] = false;
                    }

                }
                else if(this.state === 3){
                    console.log("case 3, type 2, A");
                    if( this.location2[2] -1 >= 0 &&
                        playField[this.location2[0]][this.location2[1]][this.location2[2]-1] === false){

                        this.location3[1]--;
                        this.location3[2]--;
                        this.state = 5;
                        keys[A] = false;
                    }

                }else if(this.state === 4){
                    console.log("case 4, type 2, A");
                    if( playField[this.location1[0]][this.location1[1]+1][this.location1[2]] === false){

                        this.location3[1]--;
                        this.location2[1]++;
                        this.location1[1]++;
                        this.state = 6;
                        keys[A] = false;
                    }

                }
                else if(this.state === 5){
                    console.log("case 5, type 2, A");
                    if( playField[this.location2[0]][this.location2[1]-1][this.location2[2]] === false){

                        this.location3[1]--;
                        this.location3[2]++;
                        this.state = 7;
                        keys[A] = false;
                    }

                }
                else if(this.state === 6){
                    console.log("case 6, type 2, A");
                    if( playField[this.location1[0]][this.location1[1]-1][this.location1[2]] === false){

                        this.location3[2]--;
                        this.location1[2]++;
                        this.location2[2]--;
                        this.state = 9;
                        keys[A] = false;
                    }

                }
                else if(this.state === 7){
                    console.log("case 7, type 2, A");
                    if( this.location2[2]+1 <= 5 &&
                        playField[this.location1[0]][this.location1[1]-1][this.location1[2]] === false){

                        this.location3[1]++;
                        this.location3[0]++;
                        this.location1[2]++;
                        this.location1[0]--;
                        this.state = 8;
                        keys[A] = false;
                    }

                }
                else if(this.state === 8){
                    console.log("case 8, type 2, A");
                    if( this.location2[1]+1 <= 21 &&
                        playField[this.location2[0]][this.location2[1]+1][this.location2[2]] === false){

                        this.location3[0]--;
                        this.location3[1]++;
                        this.location1[2]--;
                        this.location1[0]++;
                        this.state = 3;
                        keys[A] = false;
                    }

                }
                else if(this.state === 9){
                    console.log("case 9, type 2, A");
                    if( playField[this.location2[0]][this.location2[1]][this.location2[2]+1] === false){

                        
                        this.location3[1]++;
                        this.location1[1]--;
                        this.location2[1]--;
                        this.state = 2;
                        keys[A] = false;
                    }

                }
                else if(this.state === 10){
                    console.log("case 10, type 2, A");
                    if( playField[this.location2[0]][this.location2[1]-1][this.location2[2]] === false){
                        console.log("hallo")
                        
                        this.location3[1]--;
                        this.location3[2]++;
                        this.state = 11;
                        keys[A] = false;
                    }

                }
                else if(this.state === 11){
                    console.log("case 11, type 2, A");
                    if( this.location2[2]+1 <= 5 &&
                        playField[this.location2[0]][this.location2[1]][this.location2[2]+1] === false){

                        
                        this.location3[1]++;
                        this.location3[0]--;
                        this.location1[0]++;
                        this.location1[2]++;
                        this.state = 12;
                        keys[A] = false;
                    }

                }
                else if(this.state === 12){
                    console.log("case 12, type 2, A");
                    if( this.location2[1]+1 <= 21 &&
                        playField[this.location2[0]][this.location2[1]+1][this.location2[2]] === false){

                        
                        this.location3[0]++;
                        this.location3[1]++;
                        this.location1[0]--;
                        this.location1[2]--;
                        this.state = 1;
                        keys[A] = false;
                    }

                }

            }
        }
    }

    if(keys[S]&& this.active){


        if(this.type === 1){

            if(this.state === 1){
                console.log("case 1, type 1, S");
            }
            else if(this.state === 2){

                console.log("case 2, type 1, S");
                if( this.location2[0]+1 <= 5 && this.location2[0]-1 >= 0 &&
                    playField[this.location2[0]+1][this.location2[1]][this.location2[2]] === false &&
                    playField[this.location2[0]-1][this.location2[1]][this.location2[2]] === false){

                    this.location1[2] = this.location2[2];
                    this.location1[0]--;
                    this.location3[2] = this.location2[2];
                    this.location3[0]++;
                    this.state = 3;
                    keys[S] = false;
                }

            }
            else if(this.state === 3){

                console.log("case 3, type 1, S");
                if( this.location2[2]+1 <= 5 && this.location2[2]-1 >= 0 &&
                    playField[this.location2[0]][this.location2[1]][this.location2[2]+1] === false &&
                    playField[this.location2[0]][this.location2[1]][this.location2[2]-1] === false){

                    this.location1[0] = this.location2[0];
                    this.location1[2]--;
                    this.location3[0] = this.location2[0];
                    this.location3[2]++;
                    this.state = 2;
                    keys[S] = false;
                }
                
            }
        }else{

            if(this.type === 2){
                if(this.state === 1){
                    console.log("case 1, type 2, S");
                    if( this.location2[2]+1 <= 21 &&
                    playField[this.location2[0]][this.location2[1]][this.location2[2]-1] === false){

                        this.location1[0] = this.location2[0];
                        this.location1[2]++;
                        this.state = 2;
                        keys[S] = false;
                    }

                }
                else if(this.state === 2){
                    console.log("case 2, type 2, S");
                    if( this.location2[0]+1 <= 5 &&
                        playField[this.location2[0]+1][this.location2[1]][this.location2[2]] === false){

                        this.location1[2]--;
                        this.location1[0]++;
                        this.state = 3;
                        keys[S] = false;
                    }

                }
                else if(this.state === 3){
                    console.log("case 3, type 2, S");
                    if( this.location2[2]-1 >= 0 &&
                        playField[this.location2[0]][this.location2[1]][this.location2[2]-1] === false){

                        this.location1[2]--;
                        this.location1[0]--;
                        this.state = 4;
                        keys[S] = false;
                    }

                }
                else if(this.state === 4){
                    console.log("case 4, type 2, S");
                    if( this.location2[0]-1 >= 0 &&
                        playField[this.location2[0]-1][this.location2[1]][this.location2[2]] === false){

                        this.location1[2]++;
                        this.location1[0]--;
                        this.state = 1;
                        keys[S] = false;
                    }

                }
                else if(this.state === 5){
                    console.log("case 5, type 2, S");
                    if(
                        playField[this.location2[0]+1][this.location2[1]][this.location2[2]-1] === false){

                        this.location1[0]--;
                        this.location2[0]++;
                        this.location3[0]++;
                        this.state = 10;
                        keys[S] = false;
                    }

                }
                else if(this.state === 6){
                    console.log("case 6, type 2, S");
                    if( this.location2[0]-1 >= 0 &&
                        playField[this.location2[0]-1][this.location2[1]][this.location2[2]] === false){

                        this.location1[0]--;
                        this.location1[2]++;
                        this.state = 11;
                        keys[S] = false;
                    }

                }
                else if(this.state === 7){
                    console.log("case 7, type 2, S");
                    if( this.location2[2]-1 >= 0 &&
                        playField[this.location2[0]][this.location2[1]][this.location2[2]-1] === false){

                        this.location1[0]--;
                        this.location1[2]--;
                        this.state = 6;
                        keys[S] = false;
                    }

                }
                else if(this.state === 8){
                    console.log("case 8, type 2, S");
                    if(
                        playField[this.location2[0]][this.location2[1]+1][this.location2[2]+1] === false){

                        this.location3[0]--;
                        this.location2[2]++;
                        this.location1[0]++;
                        this.state = 5;
                        keys[S] = false;
                    }

                }else if(this.state === 9){
                    console.log("case 9, type 2, S");
                    if( this.location2[0]+1 <= 5 &&
                        playField[this.location2[0]+1][this.location2[1]][this.location2[2]] === false){

                        this.location1[0]++;
                        this.location1[2]--;
                        this.state = 7;
                        keys[S] = false;
                    }

                }
                else if(this.state === 10){
                    console.log("case 10, type 2, S");
                    if( playField[this.location2[0]-1][this.location2[1]][this.location2[2]-1] === false){

                        this.location3[0]--;
                        this.location2[2]--;
                        this.location1[0]++;
                        this.state = 12;
                        keys[S] = false;
                    }

                }
                else if(this.state === 11){
                    console.log("case 11, type 2, S");
                    if( this.location2[2]+1 <= 5 &&
                        playField[this.location2[0]-1][this.location2[1]][this.location2[2]-1] === false){

                        this.location1[0]++;
                        this.location1[2]++;
                        this.state = 9;
                        keys[S] = false;
                    }

                }
                else if(this.state === 12){
                    console.log("case 12, type 2, S");
                    if( playField[this.location2[0]-1][this.location2[1]][this.location2[2]+1] === false){

                        this.location1[0]--;
                        this.location2[0]--;
                        this.location3[0]++;
                        this.state = 8;
                        keys[S] = false;
                    }

                }
            }
        }
    }

    if(keys[D]&& this.active){


        if(this.type === 1){

            if(this.state === 1){
                console.log("case 1, type 1, D");
                if( this.location2[0]+1 <= 5 && this.location2[0]-1 >= 0 &&
                    playField[this.location2[0]+1][this.location2[1]][this.location2[2]] === false &&
                    playField[this.location2[0]-1][this.location2[1]][this.location2[2]] === false){

                    this.location1[1] = this.location2[1];
                    this.location1[0]--;
                    this.location3[1] = this.location2[1];
                    this.location3[0]++;
                    this.state = 3;
                    keys[D] = false;
                }
            }
            else if(this.state === 2){

                console.log("case 2, type 1, D");

            }
            else if(this.state === 3){

                console.log("case 3, type 1, D");
                if( this.location2[1]+1 <= 21 &&
                    playField[this.location2[0]][this.location2[1]+1][this.location2[2]] === false &&
                    playField[this.location2[0]][this.location2[1]-1][this.location2[2]] === false){

                    this.location1[0] = this.location2[0];
                    this.location1[1]--;
                    this.location3[0] = this.location2[0];
                    this.location3[1]++;
                    this.state = 1;
                    keys[D] = false;
                }
                
            }
        }else{

            if(this.type === 2){
                if(this.state === 1){
                    console.log("case 1, type 2, D");
                    if(  playField[this.location1[0]][this.location1[1]-1][this.location1[2]] === false){

                        this.location3[0]--;
                        this.location2[0]--;
                        this.location1[0]++;
                        this.state = 3;
                        keys[D] = false;
                    }

                }else if(this.state === 2){
                    console.log("case 2, type 2, D");
                    if( this.location2[0]+1 <= 5 && 
                        playField[this.location2[0]+1][this.location2[1]][this.location2[2]] === false){

                        this.location3[0]++;
                        this.location3[1]--;
                        this.state = 8;
                        keys[D] = false;
                    }

                }else if(this.state === 3){
                    console.log("case 3, type 2, D");
                    if( playField[this.location1[0]][this.location1[1]+1][this.location1[2]] === false){

                        this.location1[1]++;
                        this.location2[1]++;
                        this.location3[1]--;
                        this.state = 7;
                        keys[D] = false;
                    }

                }
                else if(this.state === 4){
                    console.log("case 4, type 2, D");
                    if( this.location2[0]+1 <=5 &&
                        playField[this.location2[0]+1][this.location2[1]][this.location2[2]] === false){

                        this.location1[2]++;
                        this.location1[0]++;
                        this.location3[1]--;
                        this.location3[2]--;

                        this.state = 5;
                        keys[D] = false;
                    }

                }else if(this.state === 5){
                    console.log("case 5, type 2, D");
                    if( 
                        playField[this.location2[0]][this.location2[1]-1][this.location2[2]] === false){

                        this.location1[2]--;
                        this.location1[0]--;
                        this.location3[1]--;
                        this.location3[2]++;

                        this.state = 6;
                        keys[D] = false;
                    }

                }else if(this.state === 6){
                    console.log("case 6, type 2, D");
                    if( this.location2[0]-1 >= 0 &&
                        playField[this.location2[0]-1][this.location2[1]][this.location2[2]] === false){

                        this.location1[2]++;
                        this.location1[0]--;
                        this.location3[1]++;
                        this.location3[2]--;

                        this.state = 10;
                        keys[D] = false;
                    }

                }
                else if(this.state === 7){
                    console.log("case 7, type 2, D");
                    if( this.location2[0]-1 >= 0 &&
                        playField[this.location2[0]-1][this.location2[1]][this.location2[2]] === false){

                        this.location1[0]--;
                        this.location2[0]++;
                        this.location3[0]++;

                        this.state = 11;
                        keys[D] = false;
                    }

                }
                else if(this.state === 8){
                    console.log("case 8, type 2, D");
                    if( playField[this.location2[0]][this.location2[1]-1][this.location2[2]] === false){

                        this.location3[0]--;
                        this.location3[1]--;

                        this.state = 9;
                        keys[D] = false;
                    }

                }
                else if(this.state === 9){
                    console.log("case 9, type 2, D");
                    if( this.location2[0]-1 >= 0 &&
                        playField[this.location2[0]-1][this.location2[1]][this.location2[2]] === false){

                        this.location3[0]--;
                        this.location3[1]++;

                        this.state = 12;
                        keys[D] = false;
                    }

                }
                else if(this.state === 10){
                    console.log("case 10, type 2, D");
                    if( this.location2[1]+1 <= 21 &&
                        playField[this.location2[0]][this.location2[1]+1][this.location2[2]] === false){

                        this.location3[1]++;
                        this.location3[2]++;
                        this.location1[0]++;
                        this.location1[2]--;

                        this.state = 4;
                        keys[D] = false;
                    }

                }
                else if(this.state === 11){
                    console.log("case 11, type 2, D");
                    if( playField[this.location2[0]-1][this.location2[1]-1][this.location2[2]] === false){

                        this.location3[1]++;
                        this.location2[1]--;
                        this.location1[1]--;

                        this.state = 1;
                        keys[D] = false;
                    }

                }
                else if(this.state === 12){
                    console.log("case 12, type 2, D");
                    if( this.location2[1]+1 <=21 &&
                        playField[this.location2[0]][this.location2[1]+1][this.location2[2]] === false){

                        this.location3[1]++;
                        this.location3[0]++;

                        this.state = 2;
                        keys[D] = false;
                    }

                }
            }
        }
    }


    //check for movements
    if(keys[left]&& this.active){

        console.log("A")
        if(this.location1[0]-1 >= 0 && this.location2[0]-1 >= 0 && this.location3[0]-1 >= 0&&
            playField[this.location1[0]-1][this.location1[1]][this.location1[2]] === false&&
            playField[this.location2[0]-1][this.location2[1]][this.location2[2]] === false&&
            playField[this.location3[0]-1][this.location3[1]][this.location3[2]] === false){

            this.location1[0]--;
            this.location2[0]--;
            this.location3[0]--;
            keys[left] = false;
        }
    }
    if(keys[right]&& this.active){
        if(this.location1[0]+1 <= 5 && this.location2[0]+1 <= 5 && this.location3[0]+1 <= 5&&
            playField[this.location1[0]+1][this.location1[1]][this.location1[2]] === false&&
            playField[this.location2[0]+1][this.location2[1]][this.location2[2]] === false&&
            playField[this.location3[0]+1][this.location3[1]][this.location3[2]] === false){

            this.location1[0]++;
            this.location2[0]++;
            this.location3[0]++;
            keys[right] = false;
        }
    }
    if(keys[down]&& this.active){
        if(this.location1[2]+1 <= 5 && this.location2[2]+1 <= 5 && this.location3[2]+1 <= 5 &&
            playField[this.location1[0]][this.location1[1]][this.location1[2]+1] === false&&
            playField[this.location2[0]][this.location2[1]][this.location2[2]+1] === false&&
            playField[this.location3[0]][this.location3[1]][this.location3[2]+1] === false){

            this.location1[2]++;
            this.location2[2]++;
            this.location3[2]++;
            keys[down] = false;
        }
    }
    if(keys[up]&& this.active){
        if(this.location1[2]-1 >= 0 && this.location2[2]-1 >= 0 && this.location3[2]-1 >= 0 &&
            playField[this.location1[0]][this.location1[1]][this.location1[2]-1] === false&&
            playField[this.location2[0]][this.location2[1]][this.location2[2]-1] === false&&
            playField[this.location3[0]][this.location3[1]][this.location3[2]-1] === false
            ){

            this.location1[2]--;
            this.location2[2]--;
            this.location3[2]--;

            keys[up] = false;
        }
    }

    this.checkBottom();
    
    if(keys[space]){
        var time = 1;
    }else{
        time = 200;
    }
    if(this.time > time && !this.landed){
        this.time = 0;

        if(this.block1Alive){

            this.location1[1]++;
        }
        if(this.block2Alive){

            this.location2[1]++;
        }
        if(this.block3Alive){

            this.location3[1]++;
        }
        //console.log('dropping acid bitch');
    }

    if(this.block1Alive){

        playField[this.location1[0]][this.location1[1]][this.location1[2]] = true;
    }
    if(this.block2Alive){

        playField[this.location2[0]][this.location2[1]][this.location2[2]] = true;
    }
    if(this.block3Alive){

        playField[this.location3[0]][this.location3[1]][this.location3[2]] = true;
    }

    //console.log(this.signal);
    return this.signal;


   //console.log(this.size);
}

Kubbur.prototype.checkBottom = function(){
    
    if((this.location1[1]+1 > 21 || playField[this.location1[0]][this.location1[1]+1][this.location1[2]] == true)&&this.block1Alive){
        this.signal++;
        this.landed = true;
        this.active = false;
        if(this.location1[1]<3){
            hasWon = true;
            this.signal++;
        }
        //console.log('herna 1')
    }
    else if((this.location2[1]+1 > 21 || playField[this.location2[0]][this.location2[1]+1][this.location2[2]] == true)&&this.block2Alive){
        this.signal++;
        this.landed = true;
        this.active = false;
        if(this.location2[1]<3){
            hasWon = true;
            this.signal++;
        }
        //console.log('herna 2')
    }
    else if((this.location3[1]+1 > 21 || playField[this.location3[0]][this.location3[1]+1][this.location3[2]] == true)&&this.block3Alive){
        this.signal++;
        this.landed = true;
        this.active = false;
        if(this.location3[1]<3){
                hasWon = true;
                this.signal++;
        }
        //console.log('herna 3')
    }
}


Kubbur.prototype.render = function(ctm,matrixLoc){

    if(this.location1[1]>1&&this.block1Alive){

        x = 1.25 - this.location1[0] * 0.5;
        y = 5.75 - this.location1[1] * 0.5;
        z = 1.25 - this.location1[2] * 0.5;
        ctm1 = mult( ctm, translate( x, y, z ) );
        gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm1));
        this.draw();
    }

    if(this.location2[1] > 1&&this.block2Alive){

        x = 1.25 - this.location2[0] * 0.5;
        y = 5.75 - this.location2[1] * 0.5;
        z = 1.25 - this.location2[2] * 0.5;
        ctm1 = mult( ctm, translate( x, y, z ) );
        gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm1));        
        this.draw();
    }

    if(this.location3[1]>1&&this.block3Alive){

        x = 1.25 - this.location3[0] * 0.5;
        y = 5.75 - this.location3[1] * 0.5;
        z = 1.25 - this.location3[2] * 0.5;
        ctm1 = mult( ctm, translate( x, y, z ) );
        gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm1));        
        this.draw();
    }
}

Kubbur.prototype.draw = function(){
    var start = this.arrayIndex[0];
    var count = this.arrayIndex[1];
    gl.drawArrays(drawMode, start, count);
};
