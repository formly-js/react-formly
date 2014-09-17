'use strict';

var fieldTypeMap = {};

module.exports = {
  fields: {
    addType: addFieldType,
    getTypes: getFieldTypes,
    clearTypes: clearTypes
  }
};

function addFieldType(name, field) {
  if (Array.isArray(name)) {
    name.forEach(function(fieldType) {
      addFieldType(fieldType);
    });
  } else if (typeof name === 'object') {
    field = name.field;
    name = name.name;
  }
  fieldTypeMap[name] = field;
}

function getFieldTypes() {
  return fieldTypeMap;
}

function clearTypes() {
  var oldTypes = fieldTypeMap;
  fieldTypeMap = {};
  return oldTypes;
}