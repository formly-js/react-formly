'use strict';

var FieldMixin = {
  onChange: function(event) {
    var value = event.target.value;
    if (this.transformUpdate) {
      value = this.transformUpdate(value);
    }
    this.props.onValueUpdate(this.props.config.key, value);
  }
};

module.exports = FieldMixin;