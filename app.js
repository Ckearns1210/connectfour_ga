//Cell constructors

var Cell = function() {
  //value placeholder that will take player value.
  this.value = null;
}

// Cell.prototype.setState = function(player) {
//   this.value === player;
//   }
//
//
// Cell.prototype.render = function() {
//   return this.value;
// }


//Board constructors
var Board = function () {
  this.cellsArray = [];
  this.currentPlayer = null;
  this.winner = null;
  this.winnerFound = false;
 };

//Start Game prototype
Board.prototype.startGame = function () {
  this.cellsArray = [];
  this.currentPlayer = "blue";


  console.log('Current Player is Woe 1');
  //Gives me a board of objects with acessible rows and columns
  //Temp Array with all the cells
  var bigArray = [];
  //Temporary Array to store Column Cells
  var columnArray = [];
  //Create big Array of cell objects
  for (var i = 0; i < 42; i++) {
    bigArray.push(new Cell());
  }
  console.log(bigArray);
  //outer loop to repeat the below process 7 times, creating 7 column arrays.
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

//Take two variables, the currentplay, and the clicked Column array from this.cells
Board.prototype.makePlay = function(columnArray, currentPlayer) {
  //empty variable to hold the number of spaces occupied
  var occupiedSpaces = 0;
  //Goes through the array, checks if each cell object is occupied, if it is, it adds to the variable.
  //This will be used both to check if the column is playable, and also to choose where to place the piece.
  for (var i = 0; i < columnArray.length; i++) {
    if (columnArray[i].value != null) {
      occupiedSpaces += 1
    }
  };
  console.log(occupiedSpaces + ' is the number of occupied spaces in this column!');
  //if the column isn't filled already
  //Placeholder variable for the index chooser.
  var piecePlacer = 0;
    //If the column isn't filled already
    if (occupiedSpaces < 6) {
      //check what the occupied spaces amount is, and return the corresponding index value where the piece will be placed.
      switch(occupiedSpaces){
         case 0:
         piecePlacer = 5;
         columnArray[piecePlacer].value = currentPlayer;
         break;
         case 1:
         piecePlacer = 4;
         columnArray[piecePlacer].value = currentPlayer;
         break;
         case 2:
         piecePlacer = 3;
         columnArray[piecePlacer].value = currentPlayer;
         break;
         case 3:
         piecePlacer = 2;
         columnArray[piecePlacer].value = currentPlayer;
         break;
         case 4:
         piecePlacer = 1;
         columnArray[piecePlacer].value = currentPlayer;
         break;
         case 5:
         piecePlacer = 0;
         columnArray[piecePlacer].value = currentPlayer;
         break;
       }
      console.log('Piece will be placed at ' + piecePlacer)
      console.log('This cell now has a value of ' + columnArray[piecePlacer].value);
    }
    //If column is full, alert you can't place here.
    else alert('You can\'t just shove a piece in here, it is full!');

    // switch(this.currentPlayer){
    //       case 1:
    //       this.currentPlayer = 2;
    //       break;
    //       case 2:
    //       this.currentPlayer = 1;
    //       break;
    //     }
};
//array location is equal to this.cellsArray[col][row]
Board.prototype.checkWinner = function () {
  var board = this.cellsArray
  // console.log(board);
//Check horizontal
    for (var r = 0; r < 4; r++) {
      for (var c = 0; c < 6; c++) {
        // console.log(((board[r][c].value === board[r+1][c].value) && (board[r+1][c].value === board[r+2][c].value) && (board[r+2][c].value === board[r+3][c].value)))
        if ((board[r][c].value === board[r+1][c].value) && (board[r+1][c].value === board[r+2][c].value) && (board[r+2][c].value === board[r+3][c].value)) {
          if(board[r][c].value !== null) {

          this.winner = this.currentplayer;
          this.winnerFound = true;
          return 'is the winner!';
        }
      }
    }
  }
  // Check Vertical
  for (var r = 0; r < 7; r++) {
    for (var c = 0; c < 3; c++) {
      if ((board[r][c].value === board[r][c+1].value) && (board[r][c+1].value === board[r][c+2].value) && (board[r][c+2].value === board[r][c+3].value)) {
        if(board[r][c].value !== null) {
          this.winner = this.currentplayer;
          this.winnerFound = true;
          return 'is the winner!';
        }
      }
    }
  };

  //Check Diagonal Left to Right
    for (var r = 0; r < 4; r++) {
      for (var c = 0; c < 3; c++) {
        if ((board[r][c].value === board[r+1][c+1].value) && (board[r+1][c+1].value === board[r+2][c+2].value) && (board[r+2][c+2].value === board[r+3][c+3].value))  {
          if(board[r][c].value !== null) {
            this.winner = this.currentplayer;
            this.winnerFound = true;
            return 'is the winner!';
          }
        }
      }
    };

  //  Check Diagonal Right to Left
      for (var r = 3; r < 6; r++) {
        for (var c = 0; c < 3; c++) {
          if ((board[r][c].value === board[r-1][c+1].value) && (board[r-1][c+1].value === board[r-2][c+2].value) && (board[r-2][c+2].value === board[r-3][c+3].value)) {
            if(board[r][c].value !== null) {
              this.winner = this.currentplayer;
              this.winnerFound = true;
              return 'is the winner!';
          }
        }
      }
    }
  };

var Game  = {
  board : null,
  makeBoard : function () {
    this.board = new Board ();
    console.log('New board is made!');
  },
  start : function () {
    this.board.startGame();
    console.log('Game has started!');
  },
  play : function () {
    var currentPlayer = Game.board.currentPlayer;
    console.log('Play going!');
    var $columns = $('.col');
    console.log($columns);
    $columns.click(function () {
      if (this.id === "col1") {
        console.log('Column 1 has been clicked by ' + currentPlayer);
        Game.board.makePlay(currentPlayer);
      }
      else if (this.id === "col2") {
        console.log('Column 2 has been clicked by ' + currentPlayer);
      }
      else if (this.id === "col3") {
        console.log('Column 3 has been clicked by ' + currentPlayer);
      }
      else if (this.id === "col4") {
        console.log('Column 4 has been clicked by ' + currentPlayer);
      }
      else if (this.id === "col5") {
        console.log('Column 5 has been clicked by ' + currentPlayer);
      }
      else if (this.id === "col6") {
        console.log('Column 6 has been clicked by ' + currentPlayer);
      }
      else console.log('Column 7 has been clicked by ' + currentPlayer);
    })

  //   var $col1 = $('#col1');
  //   console.log($col1);
  //   $col1.click(function () {
  //     console.log('Column 1 has been clicked!')
  //   });
  //   var $col2 = $('#col2');
  //   console.log($col2);
  //   $col2.click(function () {
  //     console.log('Column 2 has been clicked!')
  //   });
  //   var $col3 = $('#col3');
  //   console.log($col3);
  //   $col3.click(function () {
  //     console.log('Column 3 has been clicked!')
  //   });
  //   var $col4 = $('#col4');
  //   console.log($col4);
  //   $col4.click(function () {
  //     console.log('Column 4 has been clicked!')
  //   });
  //   var $col5 = $('#col5');
  //   console.log($col5);
  //   $col5.click(function () {
  //     console.log('Column 5 has been clicked!')
  //   });
  //   var $col6 = $('#col6');
  //   console.log($col6);
  //   $col6.click(function () {
  //     console.log('Column 6 has been clicked!')
  //   });
  //   var $col7 = $('#col7');
  //   console.log($col7);
  //   $col7.click(function () {
  //     console.log('Column 7 has been clicked!')
  //   });
  },
}





//Board Tester
Game.makeBoard();
Game.start();
Game.play(this.currentPlayer);

// b.makePlay(b.cellsArray[5], "blue");
// b.makePlay(b.cellsArray[4], "blue");
// b.makePlay(b.cellsArray[3], "blue");
// b.makePlay(b.cellsArray[2], "blue");
