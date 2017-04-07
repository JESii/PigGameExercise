/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Naive  initialization
function initialize(numP) {
  var numPlayers = numP
  var commentLine = $('#commentMe')
  var comment
  var players
  var gameScore
  var roundScore
  var gameScoreField
  var roundScoreField
  var diceImage

  function comment(text) {
    commentLine.text(text)
  }
  function newGame() {
    comment('Starting new game!')
    players = [0,0]
    gameScore = [0,0]
    roundScore = [0,0]
    gameScoreField = [$('#score-0'), $('#score-1')]
    roundScoreField = [$('#current-0'), $('#current-1')]
    diceImage = $('img.dice')
  }

  function newRoll() {
    comment('Rolling the dice')
    var randomRoll = Math.floor(Math.random() * 6) + 1
    comment('Random = ' + randomRoll)
    diceImage.attr('src', 'dice-' + randomRoll + '.png')
  }
  function holdEm() {
    comment("Hold em...")
  }
  $("button.btn-new").click(function() {
    $('#commentMe').text('btn-new clicked')
    newGame()
  })
  $('button.btn-roll').click(function() {
    $('#commentMe').text('btn-roll clicked')
    newRoll()
  })
  $('button.btn-hold').click(function() {
    $('#commentMe').text('btn-hold clicked')
    holdEm()
  })


}

$(document).ready(function() {
  initialize(2)
  alert("document ready")
})
