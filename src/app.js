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

// We can create an object version of PigGame
// but we cannot instantiate it for testing
// as we can the protytpye or module version

// This is the prototype version
function PigGame() {
  this.numPlayers = null
  this.playerNumber = null
  this.players = null
  this.gameActive = null
  this.playerPanelField = null
  this.winningScore = 20
  this.gameScore = null
  this.roundScore = null
  this.gameScoreField = null
  this.roundScoreField = null
  this.diceImage = null
  this.diceRoll = null
  this.previousRoll = null
  this.mainEventFired = null
  this.holdOn = null
}
PigGame.prototype = {
  init: function() {
    var piggame = this
  },
  initVars : function() {
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
    gameActive = true  
    holdOn = false
    $('div.player-0-panel').removeClass('winner')
    $('div.player-1-panel').removeClass('winner')
  },
  comment : function(text) {
    $('#commentMe').text(text)
    console.log('comment: ' + text)
  }
}


// Naive  initialization
var numPlayers
var playerNumber
var comment
var players
var gameActive
var playerPanelField
var winningScore = 20
var gameScore
var roundScore
var gameScoreField
var roundScoreField
var diceImage
var diceRoll
var previousRoll
var mainEventFired
var holdOn

// Example of hiding a value inside a function (a private value)
// Could do that with gameScore, for example
function Counter() {
  var counter = 0
  return {
    inc: function() { counter ++ },
    dec: function() { counter -- },
    clr: function() { counter = 0 },
    dsp: function() { console.log('Value of counter: ', counter)} 
  }
}
function GameScore() {
  var gameScore = [0,0]
  return {
    add: function() { gameScore[playerNumber] += roundScore },
    clr: function() { gameScore[playerNumber] = 0 },
    clrAll: function() { gameScore = [0,0] }
  }
}

function comment(text) {
  $('#commentMe').text(text)
}
function initVars() {
  comment('Starting new game!')
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
  gameActive = true  
  holdOn = false
  $('div.player-0-panel').removeClass('winner')
  $('div.player-1-panel').removeClass('winner')
}

function updateScore() {
  // debugger;
  gameScore[playerNumber] += roundScore
  gameScoreField[playerNumber].text(gameScore[playerNumber])
}
function gameOver(pNbr) {
  comment("Player #" + pNbr + " WON THE GAME!")
  $('.player-' + pNbr + '-panel').addClass('winner')
}
function newGame() {
  // debugger;
  initVars()
}

function nextPlayer() {
  // debugger;
  roundScore = 0
  roundScoreField[playerNumber].text(0)
  playerPanelField[playerNumber].toggleClass('active')
  playerNumber = (playerNumber + 1) % 2
  playerPanelField[playerNumber].toggleClass('active')
  diceImage.attr('src', '')
}
function rollEm() {
  if(!gameActive) {
    return
  }
  comment('Rolling the dice')
  // var diceRoll = Math.floor(Math.random() * 6) + 1
  var diceRoll = 6
  comment('Random = ' + diceRoll)
  // debugger;
  diceImage.attr('src', 'dice-' + diceRoll + '.png')
  if(diceRoll == 1) {
    comment("Rolled a 1; next player's turn")
    nextPlayer()
    // debugger;
  } else if(diceRoll === 6  && previousRoll === playerNumber+'/'+diceRoll) {
    debugger;
    gameActive = false
    gameOver((playerNumber + 1) % 2)
  } else if(gameScore[playerNumber] + roundScore + diceRoll >= winningScore) {
    gameActive = false
    gameOver(playerNumber)
  } else {
    // debugger;
    roundScore += diceRoll
    debugger;
    roundScoreField[playerNumber].text(roundScore)
    previousRoll = playerNumber+'/'+diceRoll
  }
}
function holdEm() {
  if(!gameActive) {
    return
  }
  // debugger;
  comment("Hold em...")
  updateScore()
  nextPlayer()
}
$("button.btn-new").click(function() {
  $('#commentMe').text('btn-new clicked')
  newGame()
})
$('button.btn-roll').click(function() {
  $('#commentMe').text('btn-roll clicked')
  rollEm()
})
$('button.btn-hold').click(function() {
  $('#commentMe').text('btn-hold clicked')
  holdEm()
})

$(document).ready(function() {
  initVars()
  // alert("document ready")
})
