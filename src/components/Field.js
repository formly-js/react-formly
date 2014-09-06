/** @jsx React.DOM */

var React = require('react');

var Field = React.createClass({
  onChange: function(event) {
    var value = event.target.value;
    this.props.onValueUpdate(this.props.name, value);
  },
  render: function() {
    var value = this.props.value;
    return <input type="text" value={value} onChange={this.onChange} />;
  }
});

module.exports = Field;