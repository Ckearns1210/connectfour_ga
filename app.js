//Cell constructors

var Cell = function() {
  //value placeholder that will take player value.
  this.value = null;
  // this.column = col;
  // this.row = row;

}

Cell.prototype.setState = function(player) {
  this.value === player;
  }
//
// Cell.prototype.playable = function() {
//   if (this.value === null) {
//     return true;
//   }
//   else return false;
// }

Cell.prototype.render = function() {
  return this.value;
}

// //Column Constructor
// var Column = function (columnletter, cellsLength) {
//   for (var i = 0; i < cellsLength; i++) {
//     if (cellsLength[i].column === columnletter) {
//       this.colArray.push(cellsLength[i]);
//     }
//   }
// };

//Board constructors
var Board = function () {
  this.cellsArray = [];
  this.currentPlayer = null;
  this.winner = null;
  this.winnerFound = false;
//   this.colAArray = [];
//   this.colBArray = [];
//   this.colCArray = [];
//   this.colDArray = [];
//   this.colEArray = [];
//   this.colFArray = [];
//   this.colGArray = [];
 };

//Start Game prototype
Board.prototype.startGame = function () {
  this.cellsArray = [];
  this.currentPlayer = 1;


  console.log('Current Player is Woe 1');
  //Gives me a board of objects with acessible rows and columns
  //Array with all the cells
  var bigArray = [];
  //Temporary Array to store Column Cells
  var columnArray = [];
  //Create big Array of cell objects
  for (var i = 0; i < 42; i++) {
    bigArray.push(new Cell());
  }
  console.log(bigArray);
  //outer loop to repeat the process 7 times, creating 7 column arrays.
  for (var j = 0; j < 7; j++){
    //This iterates 6 times
    for (var i = 0; i < 6; i++) {
      //each time it pushes into the column Array, and then takes one from the big array
        columnArray.push(bigArray[0]);
        bigArray.shift();
      }
      //[pushes that column array into the final array for the board]
      this.cellsArray.push(columnArray);
      //resets column array to be used for bigger outer loop.
      columnArray = [];
    }
      console.log(this.cellsArray);
  };
//cellArrayColumn = this.cellArray[i] in click event, the column index that has been clicked
//makePlay takes in this array.

Board.prototype.makePlay = function(columnArray, currentPlayer) {
  //empty variable to hold the number of spaces occupied
  var occupiedSpaces = 0;
  //Goes through the array, checks if each cell object is occupied, if it is, it adds to the variable.
  for (var i = 0; i < columnArray.length; i++) {
    if (columnArray[i].value != null) {
      occupiedSpaces += 1
    }
  };
  console.log(occupiedSpaces + ' is the number of occupied spaces in this column!');
  //if the column isn't filled already
  var piecePlacer = 0;
    if (occupiedSpaces < 6) {
      switch(piecePlacer){
         case occupiedSpaces = 0:
         piecePlacer = 5;
         columnArray[piecePlacer].value = currentPlayer;
         break;
         case occupiedSpaces = 1:
         piecePlacer = 4;
         columnArray[piecePlacer].value = currentPlayer;
         break;
         case occupiedSpaces = 2:
         piecePlacer = 3;
         columnArray[piecePlacer].value = currentPlayer;
         break;
         case occupiedSpaces = 3:
         piecePlacer = 2;
         columnArray[piecePlacer].value = currentPlayer;
         break;
         case occupiedSpaces = 4:
         piecePlacer = 1;
         columnArray[piecePlacer].value = currentPlayer;
         break;
         case occupiedSpaces = 5:
         piecePlacer = 0;
         columnArray[piecePlacer].value = currentPlayer;
         break;
       }
      console.log('Piece will be placed at ' + piecePlacer)

      console.log('This cell now has a value of ' + columnArray[piecePlacer].value);
    }

    else alert('You can\'t just shove a piece in here, it is full!');
};







//Board Tester
b = new Board;
b.startGame();
//
// Board.prototype.makeColumnArrays = function() {
//   this.colAArray.push(new Column('a', this.cells.length));
//   this.colBArray.push(new Column('b', this.cells.length));
//   this.colCArray.push(new Column('c', this.cells.length));
//   this.colDArray.push(new Column('d', this.cells.length));
//   this.colEArray.push(new Column('e', this.cells.length));
//   this.colFArray.push(new Column('f', this.cells.length));
//   this.colGArray.push(new Column('g', this.cells.length));
// };
//

 //   for (var i = 0; i < this.cells.length; i++) {
 //     if (this.cells[i].column === 'columnletter') {
 //       this.colAArray.push(this.cells[i]);
 //     }
 //   }
 //
 //   for (var i = 0; i < this.cells.length; i++) {
 //     if (this.cells[i].column === 'b') {
 //       this.colBArray.push(this.cells[i]);
 //     }
 //   }
 //
 //   for (var i = 0; i < this.cells.length; i++) {
 //     if (this.cells[i].column === 'c') {
 //       this.colCArray.push(this.cells[i]);
 //     }
 //   }
 //
 //   for (var i = 0; i < this.cells.length; i++) {
 //     if (this.cells[i].column === 'd') {
 //       this.colDArray.push(this.cells[i]);
 //     }
 //   }
 //
 //   for (var i = 0; i < this.cells.length; i++) {
 //     if (this.cells[i].column === 'e') {
 //       this.colEArray.push(this.cells[i]);
 //     }
 //   }
 //
 //   for (var i = 0; i < this.cells.length; i++) {
 //     if (this.cells[i].column === 'f') {
 //       this.colFArray.push(this.cells[i]);
 //     }
 //   }
 //
 //   for (var i = 0; i < this.cells.length; i++) {
 //     if (this.cells[i].column === 'g') {
 //       this.colGArray.push(this.cells[i]);
 //     }
 //   }
 //
 //   for (var i = 0; i < this.cells.length; i++) {
 //     if (this.cells[i].column === 'h') {
 //       this.colHArray.push(this.cells[i]);
 //     }
 //   }
 // }
 //
 // b.makeColumnArrays();

// //
// Board.prototype.makePlay = function(columnArray){
//   for (var i = 0; i < columnArray.length; i++) {
//       if (columnArray[i].isPlayable()) {
//         columnArray.splice(i, 1);
//       }
//       return columnArray;
//     }
// if (columnArray.length > 0) {
//
// }
//creates a Broad obj
//var b = new Board();
//b.startGame();
