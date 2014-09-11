(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactFormly"] = factory(require("React"));
	else
		root["ReactFormly"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports.Formly = __webpack_require__(3);
	module.exports.FieldMixin = __webpack_require__(4);
	module.exports.FormlyConfig = __webpack_require__(1);



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';

	var React = __webpack_require__(2);
	var fieldTypes = __webpack_require__(1).fields.getTypes();

	var Formly = React.createClass({displayName: 'Formly',
	  onValueUpdate: function(fieldKey, value) {
	    this.formly.model[fieldKey] = value;
	    this.props.onFormlyUpdate(this.formly.model);
	  },

	  componentWillMount: function componentWillMount() {
	    this.formly = {
	      config: this.props.config,
	      model: this.props.model
	    };
	  },
	  render: function() {
	    var model = this.formly.model;
	    var onValueUpdate = this.onValueUpdate;
	    var fields = this.formly.config.fields.map(function(field) {
	      return generateFieldTag(field, model, onValueUpdate);
	    });
	    return React.DOM.form({name: this.formly.config.name}, fields);
	  }
	});

	function generateFieldTag(field, model, onValueUpdate) {
	  var fieldTag = fieldTypes[field.type];
	  if (!fieldTag) {
	    throw new Error('Formly: "' + field.type + '" has not been added to FormlyConfig\'s field types.');
	  }

	  // hidden
	  var hide = isOrInvoke(field, 'hidden', model);
	  if (!hide && hide !== null) {
	    return null;
	  }

	  return fieldTag({model: model, config: field, onValueUpdate: onValueUpdate, key: field.key});
	}

	function isOrInvoke(field, property, model) {
	  if (!field.hasOwnProperty(property)) {
	    return null;
	  }
	  if (typeof field[property] === 'function') {
	    return field[property](model, field);
	  } else {
	    return !!field[property];
	  }
	}

	module.exports = Formly;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';

	var React = __webpack_require__(2);

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

/***/ }
/******/ ])
});
