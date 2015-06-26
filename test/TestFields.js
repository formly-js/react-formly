/** @jsx React.DOM */
'use strict';

var React = require('react');
var FieldMixin = require('../src/mixins/FieldMixin');

var TextField = React.createClass({
  mixins: [FieldMixin],
  transformUpdate: function(value) {
    return value.replace(/foo/g, 'bar');
  },
  render: function() {
    var model = this.props.model || {};
    var key = this.props.config.key || '';
    var value = '';
    if (key) {
      value = model[key];
    }
    return (
      <label ref="label">
        <input type="text" ref="input" name={key} value={value} onChange={this.onChange} />
      </label>
    );
  }
});

var NumberField = React.createClass({
  mixins: [FieldMixin],
  transformUpdate: function(value) {
    return value.replace(/\D/g,'');
  },
  render: function() {
    var model = this.props.model || {};
    var config = this.props.config;
    var key = this.props.config.key || '';
    var value = '';
    if (key) {
      value = model[key];
    }
    return (
      <div>
        <label>
          {config.label}
          <input type="number" ref="input" name={key} value={value} onChange={this.onChange} />
        </label>
      </div>
      );
  }
});

module.exports = {
  text: TextField,
  number: NumberField
};