/** @jsx React.DOM */

var React = require('react');
var FieldMixin = require('../../../index').FieldMixin;

var Checkbox = React.createClass({
  mixins: [FieldMixin],
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    var key = this.props.key;
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" name={key} checked={model[key]} onChange={this.onChange} />
          {config.data.label}
        </label>
      </div>
      );
  }
});

module.exports = Checkbox;