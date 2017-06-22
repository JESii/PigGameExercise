/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
CHALLENGE #3
1) Player loses the game for 2 6-s in a row
2) Add input field so that players can set the winning score
3) Roll two die; players loses his turn if any one of them is a 1

TODO:
1) Display round score
2) Display "You won!" over player that won

*/

// TODO: Download underscore.js locally
// var _ = require(['underscore'])


// Simple Module pattern
// These variaables closed over for the Game module
var numPlayers = 2;
var playerNumber = 1;
var comment = null;
var players = null;
var gameActive = false;
var playerPanelField = null;
var winningScore = 20
var gameScore = [0,0];
var roundScore = null;
var gameScoreField = [0,0];
var roundScoreField = [0,0];
var diceImage = $('img.dice')
var diceRoll = null;
var previousRoll = null;
var mainEventFired = null;
var holdOn = null;

var PigGame = (function() {
  var numPlayers = 2;
  // 'class' level, private variables, methods
  var PigGame = function() {
  };

  PigGame.prototype = {
    numPlayers: 2,
    // playerNumber: 1,
    players: null,
    gameActive: false,
    playerPanelField: null,
    winningScore: 20,
    gameScore: [0,0],
    roundScore: null,
    gameScoreField: [0,0],
    roundScoreField: [0,0],
    diceImage: $('img.dice'),
    diceRoll: null,
    previousRoll: null,
    mainEventFired: null,
    holdOvar: null,
    // playerNumber: 1,

    init: function() {
      console.log('f(init)');
      var self = this;

      console.log("value of self or this = " + self.value );
      console.log('parent of self = ' + self.parentElement);
      // console.log('parent of self.PigGame  = ' + self.PigGame.parentNode);
      console.log('parent of PigGame  = ' + PigGame.parentNode);
      console.log('parent of this.diceRoll  = ' + this.diceRoll);
      console.log('parent of diceRoll  = ' + diceRoll);
      console.log('parent of numPlayers  = ' + this.numPlayers.parentElement);
      console.log('this.diceImage = ' + this.diceImage);
      console.log('diceImage = ' + diceImage);
      console.log("compare === " + (diceImage === this.diceImage));
      console.log("compare == " + (diceImage == this.diceImage));
      console.log('Preparing f(comment)');
      self.comment('Starting new game!')
      this.initVars();
    },

    initVars: function() {
      this.comment('Starting new game!')
      playerNumber = 0
      players = [0,0]
      previousRoll = ''
      gameScore = [0,0]
      roundScore = 0
      // TODO: These are mostly constants, so could be initialized only upon load?
      playerPanelField = [$('.player-0-panel'), $('.player-1-panel')]
      gameScoreField = [$('#score-0'), $('#score-1')]
      gameScoreField[0].text('0'); gameScoreField[1].text('0')
      roundScoreField = [$('#current-0'), $('#current-1')]
      roundScoreField[0].text(0)
      roundScoreField[1].text(0)
      // debugger
      diceImage = $('img.dice')
      diceImage.attr('src', '')
      this.gameActive = true
      holdOn = false
      $('div.player-0-panel').removeClass('winner')
      $('div.player-1-panel').removeClass('winner')
    },


    comment: (text) => {
      console.log('f(comment) - ' + text);
      $('#commentMe').text(text)
    },

    GameScore: function() {
      var gameScore = [0,0]
      return {
        add: function() { gameScore[playerNumber] += roundScore },
        clr: function() { gameScore[playerNumber] = 0 },
        clrAll: function() { gameScore = [0,0] }
      }
    },

    updateScore: function() {
      // debugger;
      gameScore[playerNumber] += roundScore
      gameScoreField[playerNumber].text(gameScore[playerNumber])
    },

    gameOver: function(pNbr) {
      self.comment("Player #" + pNbr + " WON THE GAME!")
      $('.player-' + pNbr + '-panel').addClass('winner')
    },

    newGame: function() {
      // debugger;
      this.initVars()
    },

    nextPlayer: function() {
      // debugger;
      roundScore = 0
      roundScoreField[playerNumber].text(0)
      playerPanelField[playerNumber].toggleClass('active')
      playerNumber = (playerNumber + 1) % 2
      playerPanelField[playerNumber].toggleClass('active')
      diceImage.attr('src', '')
    },

    rollEm: function() {
      console.log('f(rollEm); gameActive = ' + this.gameActive);
      if(!this.gameActive) {
        return
      }
      this.comment('Rolling the dice')
      var diceRoll = Math.floor(Math.random() * 6) + 1
      // this.diceRoll = 6
      this.comment('Random = ' + this.diceRoll)
      // debugger;
      console.log('this.diceImage = ' + this.diceImage);
      // console.log('diceImage = ' + diceImage);
      this.diceImage.attr('src', 'dice-' + this.diceRoll + '.png')
      // debugger;
      if(this.diceRoll == 1) {
        this.comment("Rolled a 1; next player's turn")
        this.nextPlayer()
        // debugger;
      } else if(this.diceRoll === 6  && this.previousRoll === playerNumber+'/'+this.diceRoll) {
        // debugger;
        this.gameActive = false
        this.gameOver((playerNumber + 1) % 2)
      } else if(this.gameScore[playerNumber] + this.roundScore + this.diceRoll >= this.winningScore) {
        this.gameActive = false
        this.gameOver(playerNumber)
      } else {
        // debugger;
        this.roundScore += this.diceRoll
        debugger;
        this.roundScoreField[playerNumber] = (this.roundScore)
        this.previousRoll = playerNumber+'/'+this.diceRoll
      }
    },
    holdEm: function() {
      if(!gameActive) {
        return
      }
      // debugger;
      this.comment("Hold em...")
      this.updateScore()
      this.nextPlayer()
    }
  };
  return PigGame;

})();


$(document).ready(() => {
  var pg = new PigGame();
  pg.init();

  $("button.btn-new").click(function() {
    $('#commentMe').text('btn-new clicked');
    pg.newGame();
  })
  $('button.btn-roll').click(function() {
    console.log('button.btn-roll click handler called');
    $('#commentMe').text('btn-roll clicked');
    pg.rollEm();
  })
  $('button.btn-hold').click(function() {
    $('#commentMe').text('btn-hold clicked');
    pg.holdEm();
  })

});
