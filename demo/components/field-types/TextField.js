/** @jsx React.DOM */

var React = require('react');
var FieldMixin = require('../../../index').FieldMixin;

var TextField = React.createClass({
  mixins: [FieldMixin],
  render: function() {
    var model = this.props.model;
    var config = this.props.config;
    return (
      <div>
        <label>
          {config.data.label}
          <input className="form-control" type="text" name={config.key} value={model[config.key]} placeholder={config.placeholder} onChange={this.onChange} />
        </label>
      </div>
    );
  }
});

module.exports = TextField;