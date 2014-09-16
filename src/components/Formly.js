/** @jsx React.DOM */
'use strict';

var React = require('react');
var FormlyConfig = require('./FormlyConfig');


var Formly = React.createClass({
  propTypes: {
    onFormlyUpdate: React.PropTypes.func.isRequired,
    config: React.PropTypes.object.isRequired,
    model: React.PropTypes.object
  },

  onValueUpdate: function(fieldKey, value) {
    this.formly.model[fieldKey] = value;
    this.props.onFormlyUpdate(this.formly.model);
  },

  componentWillMount: function componentWillMount() {
    this.formly = {
      config: this.props.config,
      model: this.props.model || {}
    };
  },

  render: function() {
    var model = this.formly.model;
    var onValueUpdate = this.onValueUpdate;
    var fields = this.formly.config.fields.map(function(field) {
      return generateFieldTag(field, model, onValueUpdate);
    });
    return <form className="formly" role="form" name={this.formly.config.name}>{fields}</form>;
  }
});

function generateFieldTag(field, model, onValueUpdate) {
  var fieldTag = FormlyConfig.fields.getTypes()[field.type];
  if (!fieldTag) {
    throw new Error('Formly: "' + field.type + '" has not been added to FormlyConfig\'s field types.');
  }

  // hidden
  var hide = isOrInvoke(field, 'hidden', model);
  if (hide && hide !== null) {
    return null;
  }

  return <fieldTag model={model} config={field} onValueUpdate={onValueUpdate} key={field.key} />;
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