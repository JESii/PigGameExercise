# PigGame

A legacy PigGame with a touch of (React) class

This started off as a simple JavaScript exercise, but when it came time to add an input field to change
the game's winning score, I used a React component. This was a useful exercise for me: adding React required
hooking into the original code and can be used as a template of sorts for other such tasks. This was
accomplished with:

1. Define the new input form with the React Component "GetWinningScoreForm".
1. Define a new PigGame method "setWinningScore" as the callback (hook) function. React uses this function to pass
the updated winningScore value back to PigGame.
1. Call the setWinningScore method from the input form's submit method.


## Game Rules

* The game has 2 players, playing in rounds
* In each turn, a player rolls a dice as many times as he whishes. Each result get added to there ROUND score
* BUT, if the player rolls a 1, all there ROUND score gets lost. After that, it's the next player's turn
* AND, if a player rolls two sixes in a row, they lose the game
* The player can choose to 'Hold', which means that there ROUND score gets added to there GLBAL score. After that, it's the next player's turn
* Game starts at 100 points to win the game;
* Players can change the points required to win the game
* The first player to reach the winningScore points on GLOBAL score wins the game

## TODO: Additional options / fixes
* Roll two die; players loses there turn if any one of them is a 1
* Determine why we get this error "Uncaught TypeError: self.postMessage is not a function" at startup
* Consider breaking out the "currentWinningScore" code into a separate component.

## Setup & run the game
* yarn install
* yarn start
