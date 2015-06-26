/** @jsx React.DOM */

var React = require('react');
var FieldMixin = require('../../../index').FieldMixin;

var Checkbox = React.createClass({
  mixins: [FieldMixin],
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" name={config.key} checked={model[config.key]} onChange={this.onChange} />
          {config.data.label}
        </label>
      </div>
      );
  }
});

module.exports = Checkbox;