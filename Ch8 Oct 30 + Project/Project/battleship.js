
function Model(){
    this.boardSize=7;
    this.numShips=3;
    this.shipLength=3;
    this.shipsSunk=0;
    this.ships=[
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] }
    ];
}
 
Model.prototype.fire=function(guess) {
	for (var i = 0; i < this.numShips; i++) {
		var ship = this.ships[i];	//Ships put into var ship array
		var index = ship.locations.indexOf(guess);

		if (ship.hits[index] === "HIT") {
			view.displayMessage("You already fired at that location!");
			return true;
		} else if (index >= 0) {
			ship.hits[index] = "hit";
			view.displayHit(guess);
			view.displayMessage("HIT!");

			if (this.isSunk(ship)) {
				view.displayMessage("The battleship sunk!");
				this.shipsSunk++;
			}
			return true;
		}
	}
	view.displayMiss(guess);
	view.displayMessage("You missed!");
	return false;
};

Model.prototype.isSunk=function(ship) {
	for (var i = 0; i < this.shipLength; i++) {
		if (ship.hits[i] !== "hit") {
			return false;
		}
	}
	return true;
};

Model.prototype.generateShipLocations=function() {
	var locations;
	for (var i = 0; i < this.numShips; i++) {
		do {
			locations = this.generateShip();
		} while (this.collision(locations));
		this.ships[i].locations = locations;
	}
	console.log("Ships array: ");
	console.log(this.ships);
};

Model.prototype.generateShip=function() {
	var direction = Math.floor(Math.random() * 2);
	var row, col;

	if (direction === 1) {	// horizontal
		row = Math.floor(Math.random() * this.boardSize);
		col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
	} else {	// vertical
		row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));	
		col = Math.floor(Math.random() * this.boardSize);
	}

	var newShipLocations = [];
	for (var i = 0; i < this.shipLength; i++) {
		if (direction === 1) {
			newShipLocations.push(row + "" + (col + i));	//Ship length increased downward
		} else {
			newShipLocations.push((row + i) + "" + col);	//Ship length increased to the right
		}
	}
	return newShipLocations;
};

Model.prototype.collision=function(locations) {
	for (var i = 0; i < this.numShips; i++) {
		var ship = this.ships[i];
		for (var j = 0; j < locations.length; j++) {
			if (ship.locations.indexOf(locations[j]) >= 0) {
				return true;
			}
		}
	}
	return false;
};

function View(){
}

View.prototype.displayMessage=function(msg) {
	var messageArea = document.getElementById("messageArea");
	messageArea.innerHTML = msg;
};

View.prototype.displayHit=function(location) {
	var cell = document.getElementById(location);
	cell.setAttribute("class", "hit");	//This will pop up the ship.png image
};

View.prototype.displayMiss=function(location) {
	var cell = document.getElementById(location);
	cell.setAttribute("class", "miss");	//This will pop up the miss.png image
};
	
	
	
	
function Controller(){
    this.guesses=0;
}

Controller.prototype.processGuess=function(guess) { 
	var location = parseGuess(guess);
	if (location) {
		this.guesses++;
		var hit = model.fire(location);
		if (hit && model.shipsSunk === model.numShips) {
			view.displayMessage("You sank all my battleships, in " 
					+ this.guesses + " guesses");
		}
	}
};

function parseGuess(guess) {	//Checks if the guess is legitimate
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Invalid Input. Please try again");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);

		if (isNaN(row) || isNaN(column)) {
			alert("That is not on the board.");
		} else if (row < 0 || row >= model.boardSize ||
			   column < 0 || column >= model.boardSize) {
			alert("That is off the board");
		} else {
			return row + column;
		}
	}
	return null;
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value.toUpperCase();

    controller.processGuess(guess);	

    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");

    e = e || window.event;

    if (e.keyCode === 13) {
            fireButton.click();
            return false;
    }
}

window.onload = init;

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;

    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}

var model = new Model();
var view = new View();
var controller = new Controller();
