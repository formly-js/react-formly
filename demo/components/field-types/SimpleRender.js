/** @jsx React.DOM */

var React = require('react');
var FieldMixin = require('../../../index').FieldMixin;

var SimpleRender = React.createClass({
  render: function() {
    return (<div>{this.props.contents}</div>);
  }
});

module.exports = SimpleRender;