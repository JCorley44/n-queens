/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function (n) {

  //creating a new board
  let newBoard = new Board({ 'n': n });

  //iterating over the board object
  for (let col in newBoard.rows()) {

    //creating an array of row and col values
    let arr = newBoard.rows()[col];

    //placing a piece
    arr[col] = 1;
  }



  let solution = newBoard.rows(); // fixme

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {

  //starting at one because there is at minimum one solution
  let start = 1;

  //iterating from 1 to the number of rooks on the board
  for (let i = 1; i <= n; i++) {

    //the number of possible solutions is equal to the factorial of n pieces
    start *= i;
  }



  //assigning start to solutionCount
  let solutionCount = start; // fixme

  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {

  let solution = new Board({'n': n}).rows();

  //creating new board
  var newBoard = new Board({ 'n': n });

  //function to find combos
  var finder = function (row) {

    //if the rows are equal to the number of pieces
    if (row === n) {

      //returning the number of rows
      return newBoard.rows();
      return;
    }

    //iterating from 0 to n
    for (var i = 0; i < n; i++) {

      //placing a piece on the board
      newBoard.togglePiece(row, i);

      //if there are no conflict
      if (!newBoard.hasAnyQueensConflicts()) {

        //setting solution equal to the next row
        solution = finder(row + 1);

        //if there is a solution
        if (solution) {

          //returning solution
          return solution;
        }
      }

      //moving to the next row
      newBoard.togglePiece(row, i);
    }
  };

  //solution will either be equal to the first solution or the current row after the iterations
  solution = finder(0) || newBoard.rows();

  console.log(newBoard.rows());
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  let solutionCount = 0;// fixme
  var newBoard = new Board({ 'n': n });

  //PSEUDOCODE
  //check each space in board to see if it empty
  //place queen onto empty space
  //use has any conflict functions to make sure there are np conflicts
  //if so, recur
  //move queen to new space

  //helper function to find permutations
  let finder = function (row) {

    //if the number of rows are the same as the number of pieces
    if (row === n) {

      //add one to the counter
      solutionCount++;
      return;
    }

    //iterating from 0 to the number of queen pieces
    for (var i = 0; i < n; i++) {

      //placing queen on board
      newBoard.togglePiece(row, i);

      //checking to see if there is a conflict
      if (!newBoard.hasAnyQueensConflicts()) {

        //if there are no conflicts moving on to row below
        finder(row + 1);
      }

      //moving queen to next row and col
      newBoard.togglePiece(row, i);
    }
  };

  //invoking function
  finder(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

