/** @jsx React.DOM */

var React = require('react');
var FieldMixin = require('../../../index').FieldMixin;

var Checkbox = React.createClass({
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    var key = this.props.key;
    return (
      <div>
        These are some instructions
      </div>
      );
  }
});

module.exports = Checkbox;