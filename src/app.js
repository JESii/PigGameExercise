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
var gameScoreField = [null,null];
var roundScoreField = [null,null];
var diceImage = $('img.dice')
var diceRoll = null;
var previousRoll = null;
var mainEventFired = null;
var holdOn = null;
var closure = 'this is a test'

var PigGame = (function() {
  var numPlayers = 2;
  var PigGame = function() {
  // $('button.btn-roll').click(function() {
  //   console.log('button.btn-roll click handler called');
  //   $('#commentMe').text('btn-roll clicked');
  //   this.rollEm();
  // })
  };

  PigGame.prototype = {
    // numPlayers: 2,
    // playerNumber: 1,
    // players: null,
    // gameActive: false,
    // playerPanelField: null,
    // winningScore: 20,
    // gameScore: [0,0],
    // roundScore: null,
    // gameScoreField: [0,0],
    // roundScoreField: [0,0],
    // diceImage: $('img.dice'),
    // diceRoll: null,
    // previousRoll: null,
    // mainEventFired: null,
    // holdOvar: null,

    init: function() {
      console.log('f(init)');
      var self = this;
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
      roundScoreField = [$('#current-0'), $('#current-1')]
      gameScoreField[0].text('0'); gameScoreField[1].text('0');
      this.clearRoundScore(0); this.clearRoundScore(1);
      diceImage = $('img.dice')
      diceImage.attr('src', '')
      gameActive = true
      holdOn = false
      playerPanelField[playerNumber].removeClass('winner')
      playerPanelField[playerNumber].removeClass('winner')
    },


    comment: (text) => {
      console.log('f(comment) - ' + text);
      $('#commentMe').text(text)
    },

    gameScore: function() {
      var gameScore = [0,0]
      return {
        add: function() { gameScore[playerNumber] += roundScore },
        clr: function() { gameScore[playerNumber] = 0 },
        clrAll: function() { gameScore = [0,0] }
      }
    },

    updateScore: function(pNbr, score) {
      gameScore[pNbr] += score
      gameScoreField[pNbr].text(gameScore[pNbr])
    },

    gameOver: function(pNbr) {
      this.comment("Player #" + pNbr + " WON THE GAME!")
      this.setDiceImage('over');
      $('.player-' + pNbr + '-panel').addClass('winner')
    },

    newGame: function() {
      this.initVars()
    },

    nextPlayer: function() {
      roundScore = 0
      roundScoreField[playerNumber].text(0)
      playerPanelField[playerNumber].toggleClass('active')
      playerNumber = (playerNumber + 1) % numPlayers;
      playerPanelField[playerNumber].toggleClass('active')
    },

    rollEm: function() {
      console.log('f(rollEm); gameActive = ' + gameActive);
      if(!gameActive) {
        return null
      }
      this.comment('Rolling the dice')
      diceRoll = Math.floor(Math.random() * 6) + 1
      this.comment('Random = ' + diceRoll)
      this.setDiceImage(diceRoll);
      this.analyzeRoll(diceRoll);
      return diceRoll
    },

    setDiceImage: function(roll) {
      diceImage.attr('src', 'dice-' + roll + '.png')
      console.log('diceImage = ' + diceImage.attr('src'));
    },

    analyzeRoll: function(roll) {
      if(roll == 1) {
        this.comment("Rolled a 1; next player's turn")
        this.setDiceImage('next');
        this.nextPlayer()
      } else if(roll === 6  && previousRoll === playerNumber+'/'+roll) {
        gameActive = false
        this.gameOver((playerNumber + 1) % 2)
      } else if(gameScore[playerNumber] + roundScore + roll >= winningScore) {
        gameActive = false
        this.gameOver(playerNumber)
      } else {
        roundScore += roll
        roundScoreField[playerNumber].text(roundScore);
        previousRoll = playerNumber+'/'+roll
        this.updateRoundScore(playerNumber, roundScore);
      }
    },

    updateRoundScore: function(pNbr, score) {
      roundScoreField[pNbr].text(score);
    },

    clearRoundScore: function(pNbr) {
      roundScoreField[pNbr].text(0);
    },

    holdEm: function() {
      if(!gameActive) {
        return null
      }
      this.comment("Hold em...");
      this.updateScore(playerNumber, roundScore);
      this.clearRoundScore(playerNumber);
      this.nextPlayer();
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
