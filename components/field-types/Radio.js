/** @jsx React.DOM */

var React = require('react');
var FieldMixin = require('../../../index').FieldMixin;

var Radio = React.createClass({
  mixins: [FieldMixin],
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    var key = this.props.key;
    var options = config.options.map(function(option) {
      return (
        <div className="radio">
          <label>
            <input type="radio" name={key} id={key + option.value} value={option.value}>
            {option.label}
          </label>
        </div>
      );
    });
    return (
      <div>
        {config.label}
        {options}
      </div>
    );
  }
});

module.exports = Radio;