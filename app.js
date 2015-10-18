//Cell constructors
var Cell = function() {
  //value placeholder that will take player value.
  this.value = null;
}

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
  this.currentPlayer = "Drake";

  console.log('Current Player is Drake');
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
    //Inner loop to create an array of 6;
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

//Switches Player
Board.prototype.switchPlayer = function () {
  switch(this.currentPlayer){
        case 'Drake':
        this.currentPlayer = 'Rhianna';
        break;
        case 'Rhianna':
        this.currentPlayer = 'Drake';
        break;
      }
};

//Checks Win
Board.prototype.checkWin = function (currentPlayer) {
  var board = this.cellsArray

//Check horizontal
    for (var r = 0; r < 4; r++) {
      for (var c = 0; c < 6; c++) {
        if ((board[r][c].value === board[r+1][c].value) && (board[r+1][c].value === board[r+2][c].value) && (board[r+2][c].value === board[r+3][c].value)) {
          if(board[r][c].value !== null) {
          this.winner = currentPlayer;
          this.winnerFound = true;
          alert (currentPlayer + ' is the winner!');
        }
      }
    }
  };

  // Check Vertical
  for (var r = 0; r < 7; r++) {
    for (var c = 0; c < 3; c++) {
      if ((board[r][c].value === board[r][c+1].value) && (board[r][c+1].value === board[r][c+2].value) && (board[r][c+2].value === board[r][c+3].value)) {
        if(board[r][c].value !== null) {
          this.winner = currentPlayer;
          this.winnerFound = true;
          alert (currentPlayer + ' is the winner!');
        }
      }
    }
  };

  //Check Diagonal Left to Right
    for (var r = 0; r < 4; r++) {
      for (var c = 0; c < 3; c++) {
        if ((board[r][c].value === board[r+1][c+1].value) && (board[r+1][c+1].value === board[r+2][c+2].value) && (board[r+2][c+2].value === board[r+3][c+3].value))  {
          if(board[r][c].value !== null) {
            this.winner = currentPlayer;
            this.winnerFound = true;
            alert (currentPlayer + ' is the winner!');
          }
        }
      }
    };

  //  Check Diagonal Right to Left
      for (var r = 3; r < 6; r++) {
        for (var c = 0; c < 3; c++) {
          if ((board[r][c].value === board[r-1][c+1].value) && (board[r-1][c+1].value === board[r-2][c+2].value) && (board[r-2][c+2].value === board[r-3][c+3].value)) {
            if(board[r][c].value !== null) {
              this.winner = currentPlayer;
              this.winnerFound = true;
              alert (currentPlayer + ' is the winner!');
          }
        }
      }
    }
  };

  //Clears body and displays win message and image.
  Board.prototype.displayWinner = function (currentPlayer) {
    $('body').empty().append("<div id = 'winner-message'>");
    $('body').append("<iframe style='display:none;' src='https://www.youtube.com/embed/rB7Vv1dlqJE?autoplay=1'>")
    $('div').text(currentPlayer + " has gotten that Hotline Bling!  This could only mean one thing!")
    $('body').append('<img src="https://d13yacurqjgara.cloudfront.net/users/29332/screenshots/2209323/hotline-bling.gif" height="300px" width="300px">');
  }

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
    var $columns = $('.col');

    $columns.click(function () {
      var currentPlayer = Game.board.currentPlayer;

      //If Column Zero is clicked
            if (this.id === 'col0') {
          //Check for the lowest free spot and add piece.
          console.log('Column 0' + ' has been clicked by ' + currentPlayer);
          for(var j = 0; j < 6; j++) {
          if ($('#0-' + j).text() === "") {
            $('#0-' + j).text(currentPlayer);
            Game.board.cellsArray[0][j].value = currentPlayer;
            Game.board.switchPlayer();
            Game.board.checkWin(currentPlayer);
            if (Game.board.winnerFound === true) {
              Game.board.displayWinner(currentPlayer);
            }
            return;
          }
        }
          alert('This column is full!')
      }

      //If Column One is clicked
          else if (this.id === 'col1') {
        //Check for the lowest free spot and add piece.
        console.log('Column 1' + ' has been clicked by ' + currentPlayer);
        for(var j = 0; j < 6; j++) {
        if ($('#1-' + j).text() === "") {
          $('#1-' + j).text(currentPlayer);
          Game.board.cellsArray[1][j].value = currentPlayer;
          Game.board.switchPlayer();
          Game.board.checkWin(currentPlayer);
          if (Game.board.winnerFound === true) {
            Game.board.displayWinner(currentPlayer);
          }
          return;
        }
      }
        alert('This column is full!')
    }

      //If Column Two is clicked
          else if (this.id === 'col2') {
        //Check for the lowest free spot and add piece.
        console.log('Column 2' + ' has been clicked by ' + currentPlayer);
        for(var j = 0; j < 6; j++) {
        if ($('#2-' + j).text() === "") {
          $('#2-' + j).text(currentPlayer);
          Game.board.cellsArray[2][j].value = currentPlayer;
          Game.board.switchPlayer();
          Game.board.checkWin(currentPlayer);
          if (Game.board.winnerFound === true) {
            Game.board.displayWinner(currentPlayer);
          }
          return;
        }
      }
        alert('This column is full!')
    }

      //If Column Three is clicked
          else if (this.id === 'col3') {
        //Check for the lowest free spot and add piece.
        console.log('Column 3' + ' has been clicked by ' + currentPlayer);
        for(var j = 0; j < 6; j++) {
        if ($('#3-' + j).text() === "") {
          $('#3-' + j).text(currentPlayer);
          Game.board.cellsArray[3][j].value = currentPlayer;
          Game.board.switchPlayer();
          Game.board.checkWin(currentPlayer);
          if (Game.board.winnerFound === true) {
            Game.board.displayWinner(currentPlayer);
          }
          return;
        }
      }
        alert('This column is full!')
    }

      //If Column Four is clicked
          else if (this.id === 'col4') {
        //Check for the lowest free spot and add piece.
        console.log('Column 4' + ' has been clicked by ' + currentPlayer);
        for(var j = 0; j < 6; j++) {
        if ($('#4-' + j).text() === "") {
          $('#4-' + j).text(currentPlayer);
          Game.board.cellsArray[4][j].value = currentPlayer;
          Game.board.switchPlayer();
          Game.board.checkWin(currentPlayer);
          if (Game.board.winnerFound === true) {
            Game.board.displayWinner(currentPlayer);
          }
          return;
        }
      }
        alert('This column is full!')
    }

      //If Column Five is clicked
          else if (this.id === 'col5') {
        //Check for the lowest free spot and add piece.
        console.log('Column 5' + ' has been clicked by ' + currentPlayer);
        for(var j = 0; j < 6; j++) {
        if ($('#5-' + j).text() === "") {
          $('#5-' + j).text(currentPlayer);
          Game.board.cellsArray[5][j].value = currentPlayer;
          Game.board.switchPlayer();
          Game.board.checkWin(currentPlayer);
          if (Game.board.winnerFound === true) {
            Game.board.displayWinner(currentPlayer);
          }
          return;
        }
      }
        alert('This column is full!')
    }
      //If Column Six is clicked
          else if (this.id === 'col6') {
        //Check for the lowest free spot and add piece.
        console.log('Column 6' + ' has been clicked by ' + currentPlayer);
        for(var j = 0; j < 6; j++) {
        if ($('#6-' + j).text() === "") {
          $('#6-' + j).text(currentPlayer);
          Game.board.cellsArray[6][j].value = currentPlayer;
          Game.board.switchPlayer();
          Game.board.checkWin(currentPlayer);
          if (Game.board.winnerFound === true) {
            Game.board.displayWinner(currentPlayer);
          }
          return;
          }
        }
          alert('This column is full!')
      }
    })
  }
}

$(document).ready(function() {
  $('body').append("<iframe style='display:none;' src='https://www.youtube.com/embed/hNMMa69laFM?autoplay=1'>")
  Game.makeBoard();
  Game.start();
  Game.play();
 })
