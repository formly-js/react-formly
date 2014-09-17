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
    var key = this.props.key;
    return (
      <div>
        <label>
          {config.label}
          <input className="form-control" type="text" name={key} value={model[key]} onChange={this.onChange} />
        </label>
      </div>
      );
  }
});

module.exports = NumberField;