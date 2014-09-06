/** @jsx React.DOM */

var React = require('react');

var Field = React.createClass({
  onChange: function(event) {
    var value = event.target.value;
    this.props.onValueUpdate(this.props.name, value);
  },
  render: function() {
    var value = this.props.name;
    var model = this.props.model;
    return <input type="text" value={model[value]} onChange={this.onChange} />;
  }
});

module.exports = Field;