var FieldConstants = require('../constants/field-constants.js');
var FieldDispatcher = require('../dispatchers/field-dispatcher.js');

function getViewActionHandler(type) {
  return function(arg) {
    var action = { actionType: type };
    action.value = arg;
    return FieldDispatcher.handleViewAction(action);
  }
}

var FieldActions = {
  valueUpdate: getViewActionHandler(FieldConstants.VALUE_UPDATE)
};

module.exports = FieldActions;