var FieldDispatcher = require('../dispatchers/field-dispatcher');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

module.exports = function createStore(actionResponders, extras) {

  var store = null;

  var storeFunctions = merge({
    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherIndex: FieldDispatcher.register(function(payload) {
      var action = payload.action;
      if (actionResponders[action.actionType]) {
        actionResponders[action.actionType](action.value);
        store.emitChange();
        return true;
      } else {
        console.warn('Store has no action responder for action type ' + action.actionType);
        return false;
      }
    })
  }, extras);

  store = merge(EventEmitter.prototype, storeFunctions);
  return store;
};