describe('solvers', function() {

  window.displayBoard = () => {};

  describe('findNRooksSolution()', function() {

    it('finds a valid solution for n of 1-8', function() {
      _.range(1, 9).map((n) => {
        const solutionBoard = new Board(findNRooksSolution(n));
        const numPieces = _.reduce(solutionBoard.rows(), (memo, row) => {
          return memo + _.reduce(row, (memo, col) => {
            return memo + col;
          }, 0);
        }, 0);

        expect(solutionBoard.get('n')).to.equal(n);
        expect(numPieces).to.equal(n);
        expect(solutionBoard.hasAnyRooksConflicts()).to.be.equal(false);
      });
    });

  });

  describe('countNRooksSolutions()', function() {

    it('finds the number of valid solutions for n of 1-8', function() {
      _.range(1, 9).map((n) => {
        const solutionCount = countNRooksSolutions(n);
        const expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

  describe('findNQueensSolution()', function() {

    it('finds a valid solution for n of 0-7', function() {
      // Skip 2 and 3 because they have no solution.
      [0, 1, 4, 5, 6, 7, 8].map((n) => {
        const solutionBoard = new Board(findNQueensSolution(n));
        const numPieces = _.reduce(solutionBoard.rows(), (memo, row) => {
          return memo + _.reduce(row, (memo, col) => {
            return memo + col;
          }, 0);
        }, 0);

        expect(solutionBoard.get('n')).to.equal(n);
        expect(numPieces).to.equal(n);
        expect(solutionBoard.hasAnyQueensConflicts()).to.be.equal(false);
      });

      // Check 2 and 3 for no solution
      [2, 3].map((n) => {
        const solutionBoard = new Board(findNQueensSolution(n));
        const numPieces = _.reduce(solutionBoard.rows(), (memo, row) => {
          return memo + _.reduce(row, function(memo, col) {
            return memo + col;
          }, 0);
        }, 0);

        expect(numPieces).to.equal(0);
        expect(solutionBoard.get('n')).to.equal(n);
      });
    });

  });

  describe('countNQueensSolutions()', function() {

    it('finds the number of valid solutions for n of 0-8', function() {
      _.range(0, 9).map((n) => {
        const solutionCount = countNQueensSolutions(n);
        const expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

});
