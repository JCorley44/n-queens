// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      //let count = 0;
      // this.get(rowIndex).forEach((ele) => {
      //   if (ele === 1) return count++;
      // });
      // return count > 1;
      

      // keep a count
      // iterate through the row index with reduce
      return this.get(rowIndex).reduce((count, ele) => {

        // conditional if value is equal to 1 add count by 1
        if (ele === 1) { count++; }
        return count;
        // if the value of reduce is greater than 1 is true
      }, 0) > 1; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      // let x = false;
      // this.rows().forEach((ele, ind, arr) => {
      //   if (this.hasRowConflictAt(ind)) {
      //     x = true;
      //   }
      // });
      // return x; // fixme
//final edit

      // iterate through the rows value and index
      return this.rows().reduce((acc, ele, ind, arr) => {

        // if there is not conflict with the index
        if (this.hasRowConflictAt(ind)) {

          // our count is equal to true
          acc = true;
        }
        return acc;

        //set seed to false
      }, false);
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      // let count = 0;
      // this.rows().forEach((ele, ind, arr) => {
      //   if (ele[colIndex] === 1) {
      //     count++;
      //   }
      // });
      // return count > 1;

      // iterate through row and index values 
      return this.rows().reduce((acc, ele, ind, arr) => {

        // if the value in the array is equal to 1, add + 1
        if (ele[colIndex] === 1) { acc++; }
        return acc;

        // if reduce value is greater than 1 return true
      }, 0) > 1;
    },


    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {

      // for (let i = 0; i < this.rows().length; i++) {
      //   if (this.hasColConflictAt(i)) {
      //     return true;
      //   }
      // }
      // let x = false;
      // this.rows().forEach((ele, ind, arr) => {
      //   if(this.hasColConflictAt(ind)) x = true;
      // });
      // return x;

      // reduce through the rows value 
      return this.rows().reduce((acc, ele, ind, arr) => {

        // if there are no index conflicts set the count to true
        if (this.hasColConflictAt(ind)) { acc = true; }
        return acc;

        // seed to false
      }, false);
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      const major = majorDiagonalColumnIndexAtFirstRow;
      // const diagonal = [];
      // for (let i = 0; i < this.rows().length; i++) {
      //   let col = major + i;
      //   if (col >= 0 && col < this.rows().length) {
      //     diagonal.push(this.rows()[i][col]);
      //   }
      // }

      // console.log(diagonal);
      //   let diagonalSum = diagonal.reduce((count, current) => count + current);

      //   if (diagonalSum > 1) {
      //     return true;
      //   } else {
      //     return false;
      //   }

      // container for the rows array
      let diagonal = this.rows()
      // iterate through the values and add the index
        .map((ele, ind) => ele[major + ind])
        // filter the undefined values
        .filter((ele) => ele !== undefined)
        // add all current values and return true if the values are greater than 1
        .reduce((count, current) => count + current) > 1;
      return diagonal;


    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {

      // set index to 2 and subtract the length
      
      for (let i = 2 - this.rows().length; i < this.rows().length - 1; i++) {
        // if there are conflicts with the index
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

  

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      let minor = minorDiagonalColumnIndexAtFirstRow;
      // const diagonal = [];

      // for (let i = 0; i < this.rows().length; i++) {
      //   let col = minor - i;
      //   if (col >= 0 && col < this.rows().length) {
      //     diagonal.push(this.rows()[i][col]);
      //   }
      // }
      // let diagonalSum = diagonal.reduce((count, current) => count + current);

      // if (diagonalSum > 1) {
      //   return true;
      // } else {

      //   return false; // fix me
      // }

      const diagonal = this.rows()

      // iterate through values and subtract the index to get the diagonal conflicts 
        .map((ele, ind) => ele[minor - ind])

        // filter the undefined(places pieces can't be)
        .filter((ele) => ele !== undefined)

        // we add all the values and if the value is greater than 1 return true
        .reduce((count, current) => count + current) > 1;

      return diagonal;

    },




    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      for (let i = 1; i <= 2 * this.rows().length - 2; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; 
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  const makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(() => {
      return _(_.range(n)).map(() => {
        return 0;
      });
    });
  };

}());
