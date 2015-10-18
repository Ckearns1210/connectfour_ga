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
// Board.prototype.makePlay = function(columnArray, currentPlayer) {
//   //empty variable to hold the number of spaces occupied
//   var occupiedSpaces = 0;
//   //Goes through the array, checks if each cell object is occupied, if it is, it adds to the variable.
//   //This will be used both to check if the column is playable, and also to choose where to place the piece.
//   for (var i = 0; i < columnArray.length; i++) {
//     if (columnArray[i].value != null) {
//       occupiedSpaces += 1
//     }
//   };
//   console.log(occupiedSpaces + ' is the number of occupied spaces in this column!');
//   //if the column isn't filled already
//   //Placeholder variable for the index chooser.
//   var piecePlacer = 0;
//     //If the column isn't filled already
//     if (occupiedSpaces < 6) {
//       //check what the occupied spaces amount is, and return the corresponding index value where the piece will be placed.
//       switch(occupiedSpaces){
//          case 0:
//          piecePlacer = 5;
//          columnArray[piecePlacer].value = currentPlayer;
//          break;
//          case 1:
//          piecePlacer = 4;
//          columnArray[piecePlacer].value = currentPlayer;
//          break;
//          case 2:
//          piecePlacer = 3;
//          columnArray[piecePlacer].value = currentPlayer;
//          break;
//          case 3:
//          piecePlacer = 2;
//          columnArray[piecePlacer].value = currentPlayer;
//          break;
//          case 4:
//          piecePlacer = 1;
//          columnArray[piecePlacer].value = currentPlayer;
//          break;
//          case 5:
//          piecePlacer = 0;
//          columnArray[piecePlacer].value = currentPlayer;
//          break;
//        }
//       console.log('Piece will be placed at ' + piecePlacer)
//       console.log('This cell now has a value of ' + columnArray[piecePlacer].value);
//     }
//     //If column is full, alert you can't place here.
//     else alert('You can\'t just shove a piece in here, it is full!');
Board.prototype.switchPlayer = function () {
  switch(this.currentPlayer){
        case 'blue':
        this.currentPlayer = 'red';
        break;
        case 'red':
        this.currentPlayer = 'blue';
        break;
      }
}
    // switch(this.currentPlayer){
    //       case 1:
    //       this.currentPlayer = 2;
    //       break;
    //       case 2:
    //       this.currentPlayer = 1;
    //       break;
    //     }
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
    console.log('Play going!');
    var $cells = $('#cells');
    console.log($cells);
    var $columns = $('.col');
    console.log($columns);

    $columns.click(function () {
      var currentPlayer = Game.board.currentPlayer;
      //If Column One is clicked
      if (this.id === "col1") {
        //Check for the lowest free spot and add piece.
        console.log('Column 1 has been clicked by ' + currentPlayer);
        if ($('#0-0').text() === "") {
          $('#0-0').text(currentPlayer);
          Game.board.cellsArray[0][0].value = currentPlayer;
        }
        else if ($('#0-1').text() === "") {
          $('#0-1').text(currentPlayer);
            Game.board.cellsArray[0][1].value = currentPlayer;
        }
        else if ($('#0-2').text() === "") {
          $('#0-2').text(currentPlayer);
            Game.board.cellsArray[0][2].value = currentPlayer;
        }
        else if ($('#0-3').text() === "") {
          $('#0-3').text(currentPlayer);
            Game.board.cellsArray[0][3].value = currentPlayer;
        }
        else if ($('#0-4').text() === "") {
          $('#0-4').text(currentPlayer);
            Game.board.cellsArray[0][4].value = currentPlayer;
        }
        else if ($('#0-5').text() === "") {
          $('#0-5').text(currentPlayer);
            Game.board.cellsArray[0][5].value = currentPlayer;
        }
        else alert('This column is full!');
      }

      else if (this.id === "col2") {
        console.log('Column 2 has been clicked by ' + currentPlayer);
        if ($('#1-0').text() === "") {
          $('#1-0').text(currentPlayer);
          Game.board.cellsArray[1][0].value = currentPlayer;
        }
        else if ($('#1-1').text() === "") {
          $('#1-1').text(currentPlayer);
            Game.board.cellsArray[1][1].value = currentPlayer;
        }
        else if ($('#1-2').text() === "") {
          $('#1-2').text(currentPlayer);
            Game.board.cellsArray[1][2].value = currentPlayer;
        }
        else if ($('#1-3').text() === "") {
          $('#1-3').text(currentPlayer);
            Game.board.cellsArray[1][3].value = currentPlayer;
        }
        else if ($('#1-4').text() === "") {
          $('#1-4').text(currentPlayer);
            Game.board.cellsArray[1][4].value = currentPlayer;
        }
        else if ($('#1-5').text() === "") {
          $('#1-5').text(currentPlayer);
            Game.board.cellsArray[1][5].value = currentPlayer;
        }
        else alert('This column is full!')
      }

      else if (this.id === "col3") {
        console.log('Column 3 has been clicked by ' + currentPlayer);
        if ($('#2-0').text() === "") {
          $('#2-0').text(currentPlayer);
          Game.board.cellsArray[2][0].value = currentPlayer;
        }
        else if ($('#2-1').text() === "") {
          $('#2-1').text(currentPlayer);
            Game.board.cellsArray[2][1].value = currentPlayer;
        }
        else if ($('#2-2').text() === "") {
          $('#2-2').text(currentPlayer);
            Game.board.cellsArray[2][2].value = currentPlayer;
        }
        else if ($('#2-3').text() === "") {
          $('#2-3').text(currentPlayer);
            Game.board.cellsArray[2][3].value = currentPlayer;
        }
        else if ($('#2-4').text() === "") {
          $('#2-4').text(currentPlayer);
            Game.board.cellsArray[2][4].value = currentPlayer;
        }
        else if ($('#2-5').text() === "") {
          $('#2-5').text(currentPlayer);
            Game.board.cellsArray[2][5].value = currentPlayer;
        }
        else alert('This column is full!')
      }
      else if (this.id === "col4") {
        console.log('Column 4 has been clicked by ' + currentPlayer);
        if ($('#3-0').text() === "") {
          $('#3-0').text(currentPlayer);
          Game.board.cellsArray[3][0].value = currentPlayer;
        }
        else if ($('#3-1').text() === "") {
          $('#3-1').text(currentPlayer);
            Game.board.cellsArray[3][1].value = currentPlayer;
        }
        else if ($('#3-2').text() === "") {
          $('#3-2').text(currentPlayer);
            Game.board.cellsArray[3][2].value = currentPlayer;
        }
        else if ($('#3-3').text() === "") {
          $('#3-3').text(currentPlayer);
            Game.board.cellsArray[3][3].value = currentPlayer;
        }
        else if ($('#3-4').text() === "") {
          $('#3-4').text(currentPlayer);
            Game.board.cellsArray[3][4].value = currentPlayer;
        }
        else if ($('#3-5').text() === "") {
          $('#3-5').text(currentPlayer);
            Game.board.cellsArray[3][5].value = currentPlayer;
        }
        else alert('This column is full!')
      }
      else if (this.id === "col5") {
        console.log('Column 5 has been clicked by ' + currentPlayer);
        if ($('#4-0').text() === "") {
          $('#4-0').text(currentPlayer);
          Game.board.cellsArray[4][0].value = currentPlayer;
        }
        else if ($('#4-1').text() === "") {
          $('#4-1').text(currentPlayer);
            Game.board.cellsArray[4][1].value = currentPlayer;
        }
        else if ($('#4-2').text() === "") {
          $('#4-2').text(currentPlayer);
            Game.board.cellsArray[4][2].value = currentPlayer;
        }
        else if ($('#4-3').text() === "") {
          $('#4-3').text(currentPlayer);
            Game.board.cellsArray[4][3].value = currentPlayer;
        }
        else if ($('#4-4').text() === "") {
          $('#4-4').text(currentPlayer);
            Game.board.cellsArray[4][4].value = currentPlayer;
        }
        else if ($('#4-5').text() === "") {
          $('#4-5').text(currentPlayer);
            Game.board.cellsArray[4][5].value = currentPlayer;
        }
        else alert('This column is full!')
      }
      else if (this.id === "col6") {
        console.log('Column 6 has been clicked by ' + currentPlayer);
        if ($('#5-0').text() === "") {
          $('#5-0').text(currentPlayer);
          Game.board.cellsArray[5][0].value = currentPlayer;
        }
        else if ($('#5-1').text() === "") {
          $('#5-1').text(currentPlayer);
            Game.board.cellsArray[5][1].value = currentPlayer;
        }
        else if ($('#5-2').text() === "") {
          $('#5-2').text(currentPlayer);
            Game.board.cellsArray[5][2].value = currentPlayer;
        }
        else if ($('#5-3').text() === "") {
          $('#5-3').text(currentPlayer);
            Game.board.cellsArray[5][3].value = currentPlayer;
        }
        else if ($('#5-4').text() === "") {
          $('#5-4').text(currentPlayer);
            Game.board.cellsArray[5][4].value = currentPlayer;
        }
        else if ($('#5-5').text() === "") {
          $('#5-5').text(currentPlayer);
            Game.board.cellsArray[5][5].value = currentPlayer;
        }
        else alert('This column is full!')
      }
      else if (this.id === "col7"){
      console.log('Column 7 has been clicked by ' + currentPlayer);
        if ($('#6-0').text() === "") {
          $('#6-0').text(currentPlayer);
          Game.board.cellsArray[6][0].value = currentPlayer;
        }
        else if ($('#6-1').text() === "") {
          $('#6-1').text(currentPlayer);
            Game.board.cellsArray[6][1].value = currentPlayer;
        }
        else if ($('#6-2').text() === "") {
          $('#6-2').text(currentPlayer);
            Game.board.cellsArray[6][2].value = currentPlayer;
        }
        else if ($('#6-3').text() === "") {
          $('#6-3').text(currentPlayer);
            Game.board.cellsArray[6][3].value = currentPlayer;
        }
        else if ($('#6-4').text() === "") {
          $('#6-4').text(currentPlayer);
            Game.board.cellsArray[6][4].value = currentPlayer;
        }
        else if ($('#6-5').text() === "") {
          $('#6-5').text(currentPlayer);
            Game.board.cellsArray[6][5].value = currentPlayer;
        }
          else alert('This column is full!');
      }
        Game.board.switchPlayer();
    })
  }
};





//Board Tester
Game.makeBoard();
Game.start();
Game.play(this.currentPlayer);

// b.makePlay(b.cellsArray[5], "blue");
// b.makePlay(b.cellsArray[4], "blue");
// b.makePlay(b.cellsArray[3], "blue");
// b.makePlay(b.cellsArray[2], "blue");
