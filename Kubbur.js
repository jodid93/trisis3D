//function that defines the Kubbur class
function Kubbur(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

//falling is used to controll the sound that comes when you press
//spaceBar. that is, sees to that the sound only plays once
var falling = 0;
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

//update the cube
Kubbur.prototype.update = function (du) {
    
    //kill me now value
    if(this.size <= 0){
        return -1;
    }
    this.time += du;

    //start by removing the block from the playfield
    playField[this.location1[0]][this.location1[1]][this.location1[2]] = false;
    playField[this.location2[0]][this.location2[1]][this.location2[2]] = false;
    playField[this.location3[0]][this.location3[1]][this.location3[2]] = false;

    //check for rotations.
    //there are many cases due to the many different directions the blocks can rotate in.
    //these are all quite simple by them selfs so i will only explain the first case for
    //type one of the blocks(the long one). to skip this go to line 658
    if(keys[A]&& this.active){
        if(soundFX){
            g_audio.shift.Play();
        }

        if(this.type === 1){

            if(this.state === 1){
                console.log("case 1, type 1, A");

                //check to see if the rotations would go outside our playfield in whitch case wo don't
                //allow for the rotation. and then check if the disired new location has any block occupying them
                if(this.location2[2]-1 >= 0 && this.location2[2]+1 <= 5 &&
                    playField[this.location2[0]][this.location2[1]][this.location2[2]+1] === false&&
                    playField[this.location2[0]][this.location2[1]][this.location2[2]-1] === false){

                    //if the condition above hold then we move the block
                    this.location1[2]--;
                    this.location1[1] = this.location2[1];
                    this.location3[2]++;
                    this.location3[1] = this.location2[1];
                    this.state = 2;

                    //lastly set the key to false so that it doesn't rotate like crazy.
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

        if(soundFX){
            g_audio.shift.Play();
        }

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

        if(soundFX){
            g_audio.shift.Play();
        }

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


    //check for movements. this works in the same way as the checks above
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

    //check if the block has landed
    this.checkBottom();
    
    //if we press space then we decrease the time so that it falls really fast
    if(keys[space]){
        var time = 1;
        falling ++;
        if(soundFX&&falling===1){
            g_audio.fall.Play();
            
        }
    }else{
        //the time it takes the block to fall down is dependent on the level youre on
        time = (100-(10*level));
        falling = 0;
    }

    //if the current time of the block has gone above the limit then we make the block fall
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
    }

    //after all the logic is done and the unit blocks are still alive then we mark them
    //as true again. possibly in a new location.
    if(this.block1Alive){

        playField[this.location1[0]][this.location1[1]][this.location1[2]] = true;
    }
    if(this.block2Alive){

        playField[this.location2[0]][this.location2[1]][this.location2[2]] = true;
    }
    if(this.block3Alive){

        playField[this.location3[0]][this.location3[1]][this.location3[2]] = true;
    }

    //return the signal to let trisis.js know what to do with the blocks
    return this.signal;

}

//check if the block has landed
Kubbur.prototype.checkBottom = function(){
    
    //if the block is alive and it has reached the blottom or has landed on another block... 
    if((this.location1[1]+1 > 21 || playField[this.location1[0]][this.location1[1]+1][this.location1[2]] == true)&&this.block1Alive){
        if(soundFX&&this.signal === 0){
            g_audio.thump.Play();
        }

        //...we increment the signal to let trisis.js know that we've landed
        this.signal++;
        this.landed = true;
        this.active = false;

        //check if the landed block is above the "legal" playfield
        //in that case we stop the game.
        if(this.location1[1]<3){
            hasWon = true;
            this.signal++;
        }
    }
    //same as above
    else if((this.location2[1]+1 > 21 || playField[this.location2[0]][this.location2[1]+1][this.location2[2]] == true)&&this.block2Alive){
        if(soundFX&&this.signal === 0){
            g_audio.thump.Play();
        }
        this.signal++;
        this.landed = true;
        this.active = false;
        if(this.location2[1]<3){
            hasWon = true;
            this.signal++;
        }
        
    }
    //same as above
    else if((this.location3[1]+1 > 21 || playField[this.location3[0]][this.location3[1]+1][this.location3[2]] == true)&&this.block3Alive){
        if(soundFX&&this.signal === 0){
            g_audio.thump.Play();
        }
        this.signal++;
        this.landed = true;
        this.active = false;
        if(this.location3[1]<3){
                hasWon = true;
                this.signal++;
        }
        
    }
}


//render all three of the unit cubes
Kubbur.prototype.render = function(ctm,matrixLoc){

    //only render them if they are still alive
    if(this.location1[1]>1&&this.block1Alive){

        x = 1.25 - this.location1[0] * 0.5;
        y = 5.75 - this.location1[1] * 0.5;
        z = 1.25 - this.location1[2] * 0.5;

        //choose different texture types for the different types of blocks
        if(this.type === 2){
            Ktexture = 3;
        }
        else{
            Ktexture = 5;
        }
        this.draw(ctm, matrixLoc, x,y,z,Ktexture);
    }

    //same as above
    if(this.location2[1] > 1&&this.block2Alive){

        x = 1.25 - this.location2[0] * 0.5;
        y = 5.75 - this.location2[1] * 0.5;
        z = 1.25 - this.location2[2] * 0.5;    
        if(this.type === 2){
            Ktexture = 3;
        }
        else{
            Ktexture = 5;
        }
        this.draw(ctm, matrixLoc, x,y,z,Ktexture);
    }

    //same as above
    if(this.location3[1]>1&&this.block3Alive){

        x = 1.25 - this.location3[0] * 0.5;
        y = 5.75 - this.location3[1] * 0.5;
        z = 1.25 - this.location3[2] * 0.5;
        if(this.type === 2){
            Ktexture = 3;
        }
        else{
            Ktexture = 5;
        }
        this.draw(ctm, matrixLoc, x,y,z,Ktexture);
    }
}

//the actual render of the cubes.
Kubbur.prototype.draw = function(ctm, matrixLoc,x,y,z,index){
    var start = vertices.cubeIndex.start;
    var count = vertices.cubeIndex.count;
    
    ctm1 = mult( ctm, translate( [x, y, z] ) );

    gl.uniformMatrix4fv(matrixLoc, false, flatten(ctm1)); 

    gl.bindTexture(gl.TEXTURE_2D, textures[index]);
    gl.drawArrays(drawMode, start, count);
};
