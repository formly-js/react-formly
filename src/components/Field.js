/** @jsx React.DOM */

var React = require('react');
var FieldStore = require('../stores/field-store');
var FieldActions = require('../actions/field-actions');

function fieldValue(formlyIndex, fieldName) {
  return {
    value: FieldStore.getFieldValue(formlyIndex, fieldName)
  };
}

var Field = React.createClass({
  getInitialState: function() {
    return fieldValue(this.props.formlyIndex, this.props.name);
  },
  onChange: function(event) {
    var value = event.target.value;
    FieldActions.valueUpdate({
      formlyIndex: this.props.formlyIndex,
      fieldName: this.props.name,
      value: value
    });
  },
  render: function() {
    var value = this.state.value;
    return <input type="text" value={value} onChange={this.onChange} />;
  }
});

module.exports = Field;