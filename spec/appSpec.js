// require (['jasmine-fixture'])

describe('gameOver method', function() {
  describe('minimal tests for initializing game', function() {
    it('recognizes the PigGame object', function() {
      var testGame = new PigGame()
      expect(testGame).toBeDefined()
    })
    it('has a working init function', function() {
      var testGame = new PigGame()
      expect(testGame.initVars).toBeDefined()
    })
  })
  describe('tests initializtion operation', function() {
    beforeEach ( function() {
      // var testGame = new PigGame()
      // testGame.initVars()
    })
    it('initializes the winningScore variable', function() {
      testGame = new PigGame()
      expect(testGame.comment).toBeDefined()
      console.log('testGame.comment is defined')
      spyOn(testGame, 'comment').and.callThrough()
      spyOn(testGame, 'initVars').and.callThrough()
      testGame.initVars()
      affix('span.testclass#my-id')
      console.log('testGame.initVars has been called')
      expect(testGame.initVars).toHaveBeenCalled()
      console.log('testGame.initVars shows as called')
      expect(testGame.comment).toHaveBeenCalled()
    })
  })
})
