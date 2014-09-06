var Dispatcher = require('./dispatcher.js');
var merge  = require('react/lib/merge');

var FieldDispatcher = merge(Dispatcher.prototype, {
  handleViewAction: function handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = FieldDispatcher;