/** @jsx React.DOM */

var React = require('react');
var FieldMixin = require('../../index').FieldMixin;

var NumberField = React.createClass({
  mixins: [FieldMixin],
  transformUpdate: function(value) {
    return value.replace(/\D/g,'');
  },
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    var key = this.props.key;
    return (
      <div>
        <label>
          {config.label}
          <input type="text" name={key} value={model[key]} onChange={this.onChange} />
        </label>
      </div>
      );
  }
});

module.exports = NumberField;