window.expect = chai.expect;

describe('ChessboardView', function() {
  let view;

  beforeEach(function() {
    view = new BoardView({
      model: new Board({ n: 4 }),
    });
  });

  it('should exist', function() {
    expect(view).to.be.ok;
  });
});