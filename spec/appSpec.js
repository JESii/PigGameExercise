// Global variables for developing tests...
// var diceRoll;

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
      var pg = new PigGame();
      pg.init();
      expect(pg).toBeDefined();
    });
    it('has a working init function', function() {
      var pg = new PigGame()
      pg.init();
      expect(pg.init).toBeDefined()
    });
    it('has a defined "winning Score" of 20', () => {
      var pg = new PigGame();
      pg.init();
      expect(pg.winningScore).toEqual(20);
    });
  });

  describe('tests initializtion operation', function() {
    beforeEach ( function() {
      var pg = new PigGame()
      pg.init();
    })
    it('has a working comment function', function() {
      var pg = new PigGame();
      pg.init();
      expect(pg.comment).toBeDefined()
      console.log('pg.comment is defined')
      // var spy = spyOn(pg, 'comment').and.callThrough();
      var spy = spyOn(pg, 'comment');
      affix('span.testclass#my-id');
      pg.comment('Testing comments');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('Testing comments');
      console.log('Successful call to pg.comment("Testing comments")');
    })
    it('has a working init function', function() {
      let pg = new PigGame();
      let spy = spyOn(pg, 'comment');
      pg.init()
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith('Starting new game!');
    })
  })
})

describe('test holdEm', () => {
  it('has a holdEm function', () => {
    var pg = new PigGame();
    pg.init();
    var spy = spyOn(pg, 'comment');
    expect(pg.holdEm).toBeDefined()
    console.log('test holdEm completed');
  })
})

describe('test rollEm', () => {
  it('has a rollEm function', () => {
    var pg = new PigGame();
    pg.init();
    expect(pg.rollEm).toBeDefined();
    console.log('test rollEm#1 completed');
  });

  it('has a roller function', () => {
    var pg = new PigGame();
    pg.init();
    expect(pg.roller).toBeDefined();
  });

  it('calls comment function when called', () => {
    var pg = new PigGame();
    pg.init();
    let spy = spyOn(pg, 'comment').and.callThrough();
    pg.rollEm();
    expect(pg.comment).toHaveBeenCalled();
    expect(pg.comment).toHaveBeenCalledWith('Rolling the dice');
    console.log('test rollEm#2 completed');
  });
});

describe('game operation', () => {
  // this statement never called
  console.log('test game operation starting');

  it('goes to next player after a 1 is rolled', () => {
    var pg = new PigGame();
    pg.init();
    let spy = spyOn(pg, 'roller').and.returnValue(1);
    let spyNext = spyOn(pg, 'nextPlayer');
    pg.rollEm();
    expect(spyNext).toHaveBeenCalled();
  });

  it('causes player to lose with two sixes in a row', () => {
    console.log('two sixes in a row loses game');
    var pg = new PigGame();
    pg.init();
    let spy = spyOn(pg, 'roller').and.returnValue(6);
    let spyOver = spyOn(pg, 'gameOver');
    pg.rollEm();
    pg.rollEm();
    expect(spyOver).toHaveBeenCalled();
  });

  describe('winning games', () => {

    it('player does not win with 19 out of 20 points', () => {
      console.log('19 out of 20');
      var pg = new PigGame();
      pg.init();
      expect(pg.winningScore).toEqual(20);
      let spy = spyOn(pg, 'roller').and.returnValue(19);
      let spyOver = spyOn(pg, 'gameOver');
      pg.rollEm();
      expect(spyOver).not.toHaveBeenCalled();
    });

    it('player wins with 20 out of 20 points', () => {
      console.log('20 out of 20');
      var pg = new PigGame();
      pg.init();
      expect(pg.winningScore).toEqual(20);
      let spy = spyOn(pg, 'roller').and.returnValue(20);
      let spyOver = spyOn(pg, 'gameOver');
      pg.rollEm();
      expect(spyOver).toHaveBeenCalled();
    });

    it('player wins with 21 out of 20 points', () => {
      console.log('21 out of 20');
      var pg = new PigGame();
      pg.init();
      let spy = spyOn(pg, 'roller').and.returnValue(21);
      let spyOver = spyOn(pg, 'gameOver');
      pg.winningScore = 20;
      pg.rollEm();
      expect(spyOver).toHaveBeenCalled();
    });
  });
});

describe('winning game', () => {
  it('has jasmine-fixture tool', () => {
      var pg = new PigGame();
      pg.init();
    affix('div.winner#myId');
    $('div.winner').text('this is my test');
    expect($('div.winner').text()).toEqual('this is my test');
  });
});
