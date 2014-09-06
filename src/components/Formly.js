/** @jsx React.DOM */

var React = require('react');
var Field = require('./Field');

var Formly = React.createClass({
  onValueUpdate: function(fieldName, value) {
    this.formly.model[fieldName] = value;
    this.props.onFormlyUpdate(this.formly.model);
  },

  componentWillMount: function componentWillMount() {
    this.formly = {
      config: this.props.config,
      model: this.props.model
    };
  },
  render: function() {
    var fieldName = 'myField';
    return (
      <form name="{this.formly.config.name}">
        <Field name={fieldName} model={this.formly.model} onValueUpdate={this.onValueUpdate} />
      </form>
      );
  }
});

module.exports = Formly;