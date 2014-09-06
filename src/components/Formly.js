/** @jsx React.DOM */

var React = require('react');
var FieldStore = require('../stores/field-store');
var Field = require('./Field');

function getFormly(index) {
  return FieldStore.getFormly(index);
}

var Formly = React.createClass({
  getInitialState: function() {
    return { formly: getFormly(this._formlyIndex) };
  },
  _onStoreChange: function() {
    var formly = getFormly(this._formlyIndex);
    this.props.onFormlyUpdate(formly.model);
  },

  componentWillMount: function componentWillMount() {
    this._formlyIndex = FieldStore.addFormly(this.props.config, this.props.model);
    FieldStore.addChangeListener(this._onStoreChange);
  },
  render: function() {
    var fieldName = 'myField';
    return (
      <form name="{this.state.formly.config.name}">
        <Field name={fieldName} formlyIndex={this._formlyIndex} />
      </form>
      );
  }
});

module.exports = Formly;