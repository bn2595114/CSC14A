//declare variables      pg~52
var randomLoc = Math.floor(Math.random()*5);
var location1 = randomLoc;
var location2 = location1+1;
var location3 = location2+1;
var guess; //undefined
var hits = 0;
var guesses = 0;
var isSunk = false;



//loops while ship not sunk
while(isSunk == false){
	
	guess = prompt("Ready Aim Fire! (enter a number (0-6): ");
	if(guess<0 || guess>6){
		alert("Please enter a valid cell number");
	}
	else{
		guesses++;
		if(guess == location1 || guess == location2 || guess == location3){
			alert("Hit!");
			hits++;
			if(hits == 3){
				isSunk=true;
				alert("You sank my battleship!");
			}
		}
		else{
			alert("MISS");
		}
	}
}

var stats = "You took " + guesses + " guesses to sink the battleship, " 
+ "which means your shooting accuracy was " + (3/guesses*100) + "%";
alert(stats);


//compare if user input is valid
//if not vald, say so
// add one to guesses

//if user guess location, add one to hits
	//if hits == 3, sunk = true
	//user wins, "You Sank My Battleship!"
//end if sank
//end if matching
//end if guess
//end else add one to guesses
// end loops

//output results