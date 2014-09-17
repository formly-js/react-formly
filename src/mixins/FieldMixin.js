'use strict';

var FieldMixin = {
  onChange: function(event) {
//    debugger;
    var value = getValue(event.target);
    this.updateValue(value);
  },
  updateValue: function(value) {
    if (this.transformUpdate) {
      value = this.transformUpdate(value);
    }
    this.props.onValueUpdate(this.props.config.key, value);
  }
};

function getValue(node) {
  switch(node.type) {
    case 'checkbox':
    case 'radio':
      return node.checked;
    case 'select':
      return node.selected;
    default:
      return node.value;
  }
}

module.exports = FieldMixin;