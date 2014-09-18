/** @jsx React.DOM */
'use strict';

var React = require('react');
var FormlyConfig = require('./../modules/FormlyConfig');
var utils = require('../utils');


var Formly = React.createClass({
  propTypes: {
    onFormlyUpdate: React.PropTypes.func.isRequired,
    config: utils.PropTypes.objectWith({
      name: true,
      fields: true
    }),
    model: React.PropTypes.object
  },

  getDefaultProps: function() {
    return { model: {} }
  },

  onValueUpdate: function(fieldKey, value) {
    this.props.model[fieldKey] = value;
    this.props.onFormlyUpdate(this.props.model);
  },

  render: function() {
    var model = this.props.model;
    var onValueUpdate = this.onValueUpdate;
    var fields = this.props.config.fields.map(function(field) {
      return generateFieldTag(field, model, onValueUpdate);
    });
    return <form className="formly" role="form" name={this.props.config.name}>{fields}</form>;
  }
});

function generateFieldTag(field, model, onValueUpdate) {
  var fieldComponent = field.component ? field.component : FormlyConfig.fields.getTypes()[field.type];
  if (!fieldComponent) {
    throw new Error('Formly: "' + field.type + '" has not been added to FormlyConfig\'s field types.');
  }

  // hidden
  var hide = isOrInvoke(field, 'hidden', model);
  if (hide && hide !== null) {
    return null;
  }

  return <fieldComponent model={model} config={field} onValueUpdate={onValueUpdate} key={field.key} />;
}

function isOrInvoke(field, property, model) {
  if (!field.hasOwnProperty(property)) {
    return null;
  }
  if (typeof field[property] === 'function') {
    return field[property](model, field);
  } else {
    return !!field[property];
  }
}

module.exports = Formly;