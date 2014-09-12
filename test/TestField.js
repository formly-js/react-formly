/** @jsx React.DOM */
'use strict';

var React = require('react');
var FieldMixin = require('../src/mixins/FieldMixin');

var TestField = React.createClass({
  mixins: [FieldMixin],
  transformUpdate: function(value) {
    return value.replace(/foo/g, 'bar');
  },
  render: function() {
    var model = this.props.model || {};
    var key = this.props.key || '';
    var value = '';
    if (model && key) {
      value = model[key];
    }
    return (
      <label ref="label">
        <input type="text" ref="input" name={key} value={value} onChange={this.onChange} />
      </label>
    );
  }
});

module.exports = TestField;