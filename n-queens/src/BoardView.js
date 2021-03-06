// This file is a Backbone View.
// It's part of the board visualizer

(function() {

  window.BoardView = Backbone.View.extend({

    tagName: 'table',

    initialize: function() {
      this.model.on('change', this.render, this);
    },

    render: function() {
      const model = this.model;

      return this.$el.html(_(_.range(model.get('n'))).map((rowIndex) => {
        return $('<tr class="row"/>').html(_(_.range(model.get('n'))).map((colIndex) => {
          const $square = $('<td class="square"/>').on('click', (e) => {
            model.togglePiece(rowIndex, colIndex);
          }).addClass(['positive', 'negative'][(rowIndex + colIndex) % 2]);

          model.get(rowIndex)[colIndex] && $square.html('&#9813;');
          model.hasAnyQueenConflictsOn(rowIndex, colIndex) && $square.addClass('inConflict');

          return $square;
        }));
      }));
    },
  });

}());
