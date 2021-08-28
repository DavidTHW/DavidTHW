const prompt = require('prompt-sync')({sigint: true});
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10; //10x10 array (this._field)


class Field 
{
    constructor() {
        this._field = Array(rowNum).fill().map(() => Array(colNum)); //field object 
        this._locationX = 0; 
        this._locationY = 0; 
    }


generateField(percentage) { // generating playing field

    for (let y = 0; y < rowNum; y++) {
        for (let x = 0; x < colNum; x++) {
            const prob = Math.random(); // prob(random number) percentage of holes v character field in this field)
            this._field[y][x] = prob > percentage ? fieldCharacter : hole; //field object
        }
    }

    const hatLocation = { // generate hat location = r1 x col and r2 x row) 
        x: Math.floor(Math.random()* colNum),
        y: Math.floor(Math.random()* rowNum)
    };

    //make sure the 'hat' is not at the starting point , rerolls if starts at 0
    while (hatLocation.x == 0 && hatLocation.y == 0) {
        hatLocation.x = Math.floor(Math.random()* colNum);
        hatLocation.y = Math.floor(Math.random()* rowNum);
    }

    this._field[hatLocation.y][hatLocation.x] = hat; //field hat location
    this._field[0][0] = pathCharacter; // field character location 0,0 start postion

}


runGame() {
    //let playing = true;
    console.log("Start Game");
    //print the field
    this.print();
    this.askQuestion();
}   

print() {
    const displayString = this._field.map (row => { 
        return row.join(''); 
    }).join('\n');
    
    console.log(displayString);
    }

    askQuestion() {
    let playing = true;
    let y = 0; //locally scoped , remove if bugged
    let x = 0; //locally scoped , remove if bugged
    //let direction = prompt('which way do you want to move U , D , L , R').toUpperCase(); //endless loop warning
    
  while (playing)  {    //start of direction method

            let direction = prompt('which way do you want to move U , D , L , R').toUpperCase(); // lol , wrong placement caused endless loop. code works now when playing around with placement. part 1 testing done 

            if (direction === 'U' && y !==0 ) {  //point starts at y [0] and x [0]
                y -= 1; // y * x
            } else if (direction === 'U' && y ===0 ) {
                console.log('upperlimit reached');
            } else if (direction === 'D' && y !==9 ) { //input is from 0 - 9 , max is 9/9 min is 0/0 p2
                y += 1;
            } else if (direction === 'D' && y ===9 ) { // input removed if limit reached 
                console.log('lowlimit reached')
            } else if (direction === 'L' && y !==0) { //tested all edge limits , working as intended
                x -= 1;
            } else if (direction === 'L' && x ===0) {
                console.log('left limit reached')
            } else if (direction === 'R' && x !==9) { 
                x += 1;
            } else if (direction === 'R' && x ===9) {
                console.log('right limit reached') 
            } 
            
            //end of direction method
       
        //win lose of continue condition
        if (this._field[y][x] === hat) {
            console.log ("You Have won"); //p2 only beautify
            playing = false //test this line to stop crashing the game
            
          } else if (this._field[y][x] === hole) {
            console.log("you fell into a hole and lost") // p2 only beautify
            playing = false //in case losing crash as well , add to prevent crash
            
          } else 
          
        {
            this._field[y][x] = pathCharacter; 
            this.print(this._field);     
        }

    }
    
    }
} // end of field


        const myfield = new Field(); //creating game
        myfield.generateField(0.3);
        myfield.runGame(); 
    




            /* tried this part, it seem to fail for some reason, may redo a new one for testing (for fun after bootcamp)   

        switch (direction) { 
            case 'U': // U undefined due to not changing to string
            y -= 1 // or use location y?
            break; 
            case 'D':
            y += 1
            break;
            case 'R':
            x += 1
            break;
            case 'L':
            x -= 1
            break;
            default:direction = 'invalid input'; if no input
            }   
       return direction 
        } */
