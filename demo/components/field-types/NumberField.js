/** @jsx React.DOM */

var React = require('react');
var FieldMixin = require('../../../index').FieldMixin;

var NumberField = React.createClass({
  mixins: [FieldMixin],
  transformUpdate: function(value) {
    var newVal = value.replace(/\D/g,'');
    if (newVal.length) {
      return ~~newVal;
    } else {
      return '';
    }
  },
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    return (
      <div>
        <label>
          {config.data.label}
          <input className="form-control" type="text" name={config.key} value={model[config.key]} onChange={this.onChange} />
        </label>
      </div>
      );
  }
});

module.exports = NumberField;