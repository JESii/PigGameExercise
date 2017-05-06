// require (['jasmine-fixture'])

describe('gameOver method', function() {
  describe('minimal tests for initializing game', function() {
    it('recognizes the PigGame object', function() {
      var testGame = new PigGame();
      expect(testGame).toBeDefined();
    });
    it('has a working init function', function() {
      var testGame = new PigGame()
      expect(testGame.init).toBeDefined()
    });
  });
  describe('tests initializtion operation', function() {
    beforeEach ( function() {
      var testGame = new PigGame()
      testGame.init();
    })
    it('initializes the winningScore variable', function() {
      var testGame = new PigGame();
      expect(testGame.comment).toBeDefined()
      console.log('testGame.comment is defined')
      spyOn(testGame, 'comment').and.callThrough()
      affix('span.testclass#my-id')
      testGame.comment('Testing comments');
      expect(testGame.comment).toHaveBeenCalled()
      expect(testGame.comment).toHaveBeenCalledWith('Testing comments');
    })
  })
  describe('test holdEm', () => {
    it('has a holdEm function', () => {
      var tg = new PigGame();
      expect(tg.holdEm).toBeDefined()
    })
  })
})
