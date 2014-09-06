var _ = require('lodash');
var FieldConstants = require('../constants/field-constants');
var createStore = require('./create-store');

// a formly is an object with a config and a model
var formlies = [];

var _actionResponders = {};
_actionResponders[FieldConstants.VALUE_UPDATE] = function valueUpdateResponder(value) {
  var formly = formlies[value.formlyIndex];
  formly.model[value.fieldName] = value.value;
};

var FiledStore = createStore(_actionResponders, {
  addFormly: function(config, model) {
    var index = formlies.length;
    formlies.push({
      config: config,
      model: model
    });
    return index;
  },
  getFormly: function(index) {
    return formlies[index];
  },
  getFieldValue: function(index, fieldName) {
    return formlies[index].model[fieldName];
  }
});

module.exports = FiledStore;