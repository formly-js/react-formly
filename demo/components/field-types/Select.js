/** @jsx React.DOM */

var React = require('react');
var FieldMixin = require('../../../index').FieldMixin;

var Select = React.createClass({
  mixins: [FieldMixin],
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    var options = config.data.options.map(function(option) {
      return <option value={option.value} key={option.value}>{option.name}</option>;
    });
    return (
      <div className="form-group">
        <label>
          {config.data.label}
          <select value={model[config.key]} className="form-control" onChange={this.onChange}>
            {options}
          </select>
        </label>
      </div>
    );
  }
});

module.exports = Select;