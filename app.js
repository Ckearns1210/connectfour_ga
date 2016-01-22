/*
AUTHOR: COLIN KEARNS
DATE: 10/18/2015
DRAKE FOUR*/




//Cell constructors
var Cell = function() {
  //value placeholder that will take player value.
  this.value = null;
}

//Board constructors
var Board = function() {
  this.cellsArray = [];
  this.currentPlayer = null;
  this.image = null;
  this.winner = null;
  this.winnerFound = false;
};

//Start Game prototype
Board.prototype.startGame = function() {
  var $currentPlayerMarker1 = $('<div id = "Drake">').html("Drake");
  var $currentPlayerMarker2 = $('<div id = "Meek">').html('Meek');
  $('#currentplayer1').append($currentPlayerMarker1);
  this.cellsArray = [];
  this.currentPlayer = "Drake";
  this.image = $("<img id='Drake' src='icon03.png'/>");
  this.currentPlayerMarker1 = $currentPlayerMarker1;
  this.currentPlayerMarker2 = $currentPlayerMarker2;

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
  for (var j = 0; j < 7; j++) {
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
Board.prototype.switchPlayer = function() {
  switch (this.currentPlayer) {
    case 'Drake':
      this.currentPlayer = 'Meek';
      this.image = $("<img id='Meek' src='meek.png'/>");
      break;
    case 'Meek':
      this.currentPlayer = 'Drake';
      this.image = $("<img id='Drake' src='icon03.png'/>");
      break;
  }
};

//Checks Win
Board.prototype.checkWin = function(currentPlayer) {
  var board = this.cellsArray

  //Check horizontal
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 6; c++) {
      if ((board[r][c].value === board[r + 1][c].value) && (board[r + 1][c].value === board[r + 2][c].value) && (board[r + 2][c].value === board[r + 3][c].value)) {
        if (board[r][c].value !== null) {
          this.winner = currentPlayer;
          this.winnerFound = true;
        }
      }
    }
  };

  // Check Vertical
  for (var r = 0; r < 7; r++) {
    for (var c = 0; c < 3; c++) {
      if ((board[r][c].value === board[r][c + 1].value) && (board[r][c + 1].value === board[r][c + 2].value) && (board[r][c + 2].value === board[r][c + 3].value)) {
        if (board[r][c].value !== null) {
          this.winner = currentPlayer;
          this.winnerFound = true;
        }
      }
    }
  };

  //Check Diagonal Left to Right
  for (var r = 0; r < 4; r++) {
    for (var c = 0; c < 3; c++) {
      if ((board[r][c].value === board[r + 1][c + 1].value) && (board[r + 1][c + 1].value === board[r + 2][c + 2].value) && (board[r + 2][c + 2].value === board[r + 3][c + 3].value)) {
        if (board[r][c].value !== null) {
          this.winner = currentPlayer;
          this.winnerFound = true;
        }
      }
    }
  };

  //  Check Diagonal Right to Left
  for (var r = 3; r < 7; r++) {
    for (var c = 0; c < 3; c++) {
      if ((board[r][c].value === board[r - 1][c + 1].value) && (board[r - 1][c + 1].value === board[r - 2][c + 2].value) && (board[r - 2][c + 2].value === board[r - 3][c + 3].value)) {
        if (board[r][c].value !== null) {
          this.winner = currentPlayer;
          this.winnerFound = true;
        }
      }
    }
  }
};


//Clears body and displays win message and image.
Board.prototype.displayWinner = function(currentPlayer) {
  $('body').empty().append("<div id = 'winner-message'>");
  $('body').append("<iframe style='display:none;' src='https://www.youtube.com/embed/rB7Vv1dlqJE?autoplay=1'>")
  $('div').text(currentPlayer + " has gotten that Hotline Bling!  This could only mean one thing!")
  $('body').append('<img src="https://d13yacurqjgara.cloudfront.net/users/29332/screenshots/2209323/hotline-bling.gif" height="300px" width="300px">');
}

//Game Object Literal
var Game = {
  //Blank board
  board: null,
  makeBoard: function() {
    this.board = new Board();
    console.log('New board is made!');
  },
  start: function() {
    this.board.startGame();
    console.log('Game has started!');
  },
  play: function() {
    console.log('Play going!');
    var $columns = $('.col');

    //Click event on each Column
    $columns.click(function() {
      //used to pass in current player to function.
      var currentPlayer = Game.board.currentPlayer;
      //used to change game piece
      var tokenImage = Game.board.image;

      if (currentPlayer === "Drake") {
        Game.board.currentPlayerMarker1.remove();
        $('#currentplayer2').append(Game.board.currentPlayerMarker2);
      } else if (currentPlayer === 'Meek') {
        Game.board.currentPlayerMarker2.remove();
        $('#currentplayer1').append(Game.board.currentPlayerMarker1);
      }
      //If Column Zero is clicked
      if (this.id === 'col0') {
        //Check for the lowest free spot and add piece.
        console.log('Column 0' + ' has been clicked by ' + currentPlayer);
        for (var j = 0; j < 6; j++) {
          if ($('#0-' + j).text() === "") {
            var $this = $('#0-' + j);
            // var offset = $this.offset();
            // var width = $this.width();
            // var height = $this.height();
            // var centerX = offset.left + width / 2;
            // var centerY = offset.top + height / 2;
            var image = $(tokenImage);

            // var currentSpace = $('#0-' + j);
            // var locationOfSpace = currentSpace.offset();
            // var leftOffset = locationOfSpace.left;
            // var topOffset = locationOfSpace.top;

            image.hide();
            $('#0-' + j).text(currentPlayer);
            $this.append(image);
            image.velocity("transition.bounceDownIn")

            $('#0-' + j).append(image);
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
        for (var j = 0; j < 6; j++) {
          if ($('#1-' + j).text() === "") {
            $('#1-' + j).text(currentPlayer);
            $('#1-' + j).append(tokenImage);
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
        for (var j = 0; j < 6; j++) {
          if ($('#2-' + j).text() === "") {
            $('#2-' + j).text(currentPlayer);
            $('#2-' + j).append(tokenImage);
            Game.board.cellsArray[2][j].value = currentPlayer;
            Game.board.switchPlayer();
            Game.board.checkWin(currentPlayer);
            if (Game.board.winnerFound === true) {
              Game.board.displayWinner(currentPlayer);
            }
            return;
          }
        }
        alert('This column is full!');
      }

      //If Column Three is clicked
      else if (this.id === 'col3') {
        //Check for the lowest free spot and add piece.
        console.log('Column 3' + ' has been clicked by ' + currentPlayer);
        for (var j = 0; j < 6; j++) {
          if ($('#3-' + j).text() === "") {
            $('#3-' + j).text(currentPlayer)
            $('#3-' + j).append(tokenImage);
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
        for (var j = 0; j < 6; j++) {
          if ($('#4-' + j).text() === "") {
            $('#4-' + j).text(currentPlayer);
            $('#4-' + j).append(tokenImage);
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
        for (var j = 0; j < 6; j++) {
          if ($('#5-' + j).text() === "") {
            $('#5-' + j).text(currentPlayer);
            $('#5-' + j).append(tokenImage);
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
        for (var j = 0; j < 6; j++) {
          if ($('#6-' + j).text() === "") {
            $('#6-' + j).text(currentPlayer);
            $('#6-' + j).append(tokenImage);
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
