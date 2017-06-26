// Global variables for developing tests...
var diceRoll;

describe('our tools work', () => {
  it('finds the jasmine-jquery library', () => {
    expect('jasmine-jquery').toBeDefined();
    expect($('<div><ul></ul><h1>header</h1></div>')).toContainText('header')
    // expect($('div#commentMe').text()).toContainText('Some comments here!');
  });
});

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
    it('has a defined "winning Score" of 20', () => {
      var tg = new PigGame();
      tg.init();
      // debugger;
      expect(tg.winningScore).toEqual(20);
    });
  });
  describe('tests initializtion operation', function() {
    beforeEach ( function() {
      var testGame = new PigGame()
      testGame.init();
    })
    it('has a working comment function', function() {
      var testGame = new PigGame();
      expect(testGame.comment).toBeDefined()
      console.log('testGame.comment is defined')
      // var spy = spyOn(testGame, 'comment').and.callThrough();
      var spy = spyOn(testGame, 'comment');
      affix('span.testclass#my-id')
      testGame.comment('Testing comments');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('Testing comments');
      console.log('Successful call to testGame.comment("Testing comments")');
    })
    it('has a working init function', function() {
      let tg = new PigGame();
      let spy = spyOn(tg, 'comment');
      tg.init()
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith('Starting new game!');
    })
  })
})

describe('test holdEm', () => {
  it('has a holdEm function', () => {
    var tg = new PigGame();
    var spy = spyOn(tg, 'comment');
    expect(tg.holdEm).toBeDefined()
    console.log('test holdEm completed');
  })
})

describe('test rollEm', () => {
  it('has a rollEm function', () => {
    var tg = new PigGame();
    debugger;
    expect(tg.rollEm).toBeDefined();
    console.log('test rollEm#1 completed');
  });

  it('calls comment function when called', () => {
    var tg = new PigGame();
    tg.gameActive = true;
    expect(tg.gameActive).toBeDefined();
    let spy = spyOn(tg, 'comment').and.callThrough();
    tg.rollEm();
    expect(tg.comment).toHaveBeenCalled();
    expect(tg.comment).toHaveBeenCalledWith('Rolling the dice');
    console.log('test rollEm#2 completed');
  });

  it('goes to next player after a 6 is rolled', () => {
    var pg = new PigGame();
    pg.game_active = true;
    expect(pg.playerNumber).toBe(1)
    pg.rollEm();
  });
});
