(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactFormly"] = factory(require("React"));
	else
		root["ReactFormly"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
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

	module.exports.Formly = __webpack_require__(2);
	module.exports.FieldMixin = __webpack_require__(3);
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

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(5);
	var FormlyConfig = __webpack_require__(1);
	var utils = __webpack_require__(4);
	
	
	var Formly = React.createClass({displayName: 'Formly',
	  propTypes: {
	    onFormlyUpdate: React.PropTypes.func.isRequired,
	    config: utils.PropTypes.objectWith({
	      name: true,
	      fields: true
	    }),
	    model: React.PropTypes.object
	  },
	
	  getDefaultProps: function() {
	    return { model: {} }
	  },
	
	  onValueUpdate: function(fieldKey, value) {
	    this.props.model[fieldKey] = value;
	    this.props.onFormlyUpdate(this.props.model);
	  },
	
	  render: function() {
	    var model = this.props.model;
	    var onValueUpdate = this.onValueUpdate;
	    var fields = this.props.config.fields.map(function(field) {
	      return generateFieldTag(field, model, onValueUpdate);
	    });
	    return React.DOM.form({className: "formly", role: "form", name: this.props.config.name}, fields);
	  }
	});
	
	function generateFieldTag(field, model, onValueUpdate) {
	  var fieldComponent = field.component ? field.component : FormlyConfig.fields.getTypes()[field.type];
	  if (!fieldComponent) {
	    throw new Error('Formly: "' + field.type + '" has not been added to FormlyConfig\'s field types.');
	  }
	
	  // hidden
	  var hide = isOrInvoke(field, 'hidden', model);
	  if (hide && hide !== null) {
	    return null;
	  }
	
	  return fieldComponent({model: model, config: field, onValueUpdate: onValueUpdate, key: field.key});
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var FieldMixin = {
	  onChange: function(event) {
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var utils = {
	  PropTypes: {
	    objectWith: function(options) {
	      return objectWithFn(options, false);
	    }
	  }
	};
	
	utils.PropTypes.objectWith.isRequired = function(options) {
	  return objectWithFn(options, true);
	};
	
	module.exports = utils;
	
	function objectWithFn(options, isRequired) {
	  return function(props, propName, componentName) {
	    var componentProp = props[propName];
	    var errorMessage = '';
	    if (!isRequired && !componentProp) {
	      return;
	    } else if (isRequired && !componentProp) {
	      errorMessage = 'Required prop `' + propName + '` was not specified in `' + componentName + '`.';
	    } else {
	      var errors = {
	        missing: [],
	        extra: []
	      };
	      for (var prop in options) {
	        var shouldBePresent = options[prop];
	        var hasProp = componentProp.hasOwnProperty(prop);
	        if (!shouldBePresent && hasProp) {
	          errors.extra.push(prop);
	        } else if (shouldBePresent && !hasProp) {
	          errors.missing.push(prop);
	        }
	      }
	      var missingSome = !!errors.missing.length;
	      var badExtras = !!errors.extra.length;
	      if (missingSome || badExtras) {
	        errorMessage = 'Prop `' + propName + '` in `' + componentName + '` has some invalid properties: ';
	      }
	      if (errors.missing.length) {
	        errorMessage += 'should have ' + JSON.stringify(errors.missing);
	      }
	      if (missingSome && badExtras) {
	        errorMessage += ' and ';
	      }
	      if (errors.extra.length) {
	        errorMessage += 'should not have ' + JSON.stringify(errors.extra);
	      }
	    }
	    if (errorMessage) {
	      return new Error(errorMessage);
	    }
	  }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlYWNhMzJhMTQwMTkyOTZjMzRlYSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9Gb3JtbHlDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybWx5LmpzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvRmllbGRNaXhpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0ZBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ2hDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0EsaUNBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxJQUFHOztBQUVIO0FBQ0EsYUFBWSxVQUFVO0FBQ3RCLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLDRCQUEyQixnRUFBZ0U7QUFDM0Y7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBeUIsMEVBQTBFO0FBQ25HOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEseUI7Ozs7OztBQy9EQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCOzs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUN2REEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJSZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdEZvcm1seVwiXSA9IGZhY3RvcnkocmVxdWlyZShcIlJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdEZvcm1seVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZWFjYTMyYTE0MDE5Mjk2YzM0ZWFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cy5Gb3JtbHkgPSByZXF1aXJlKCcuL3NyYy9jb21wb25lbnRzL0Zvcm1seScpO1xubW9kdWxlLmV4cG9ydHMuRmllbGRNaXhpbiA9IHJlcXVpcmUoJy4vc3JjL21peGlucy9GaWVsZE1peGluJyk7XG5tb2R1bGUuZXhwb3J0cy5Gb3JtbHlDb25maWcgPSByZXF1aXJlKCcuL3NyYy9tb2R1bGVzL0Zvcm1seUNvbmZpZycpO1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmaWVsZFR5cGVNYXAgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGZpZWxkczoge1xuICAgIGFkZFR5cGU6IGFkZEZpZWxkVHlwZSxcbiAgICBnZXRUeXBlczogZ2V0RmllbGRUeXBlcyxcbiAgICBjbGVhclR5cGVzOiBjbGVhclR5cGVzXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGFkZEZpZWxkVHlwZShuYW1lLCBmaWVsZCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShuYW1lKSkge1xuICAgIG5hbWUuZm9yRWFjaChmdW5jdGlvbihmaWVsZFR5cGUpIHtcbiAgICAgIGFkZEZpZWxkVHlwZShmaWVsZFR5cGUpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgIGZpZWxkID0gbmFtZS5maWVsZDtcbiAgICBuYW1lID0gbmFtZS5uYW1lO1xuICB9XG4gIGZpZWxkVHlwZU1hcFtuYW1lXSA9IGZpZWxkO1xufVxuXG5mdW5jdGlvbiBnZXRGaWVsZFR5cGVzKCkge1xuICByZXR1cm4gZmllbGRUeXBlTWFwO1xufVxuXG5mdW5jdGlvbiBjbGVhclR5cGVzKCkge1xuICB2YXIgb2xkVHlwZXMgPSBmaWVsZFR5cGVNYXA7XG4gIGZpZWxkVHlwZU1hcCA9IHt9O1xuICByZXR1cm4gb2xkVHlwZXM7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9tb2R1bGVzL0Zvcm1seUNvbmZpZy5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm1seUNvbmZpZyA9IHJlcXVpcmUoJy4vLi4vbW9kdWxlcy9Gb3JtbHlDb25maWcnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cblxudmFyIEZvcm1seSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0Zvcm1seScsXG4gIHByb3BUeXBlczoge1xuICAgIG9uRm9ybWx5VXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbmZpZzogdXRpbHMuUHJvcFR5cGVzLm9iamVjdFdpdGgoe1xuICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgIGZpZWxkczogdHJ1ZVxuICAgIH0pLFxuICAgIG1vZGVsOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geyBtb2RlbDoge30gfVxuICB9LFxuXG4gIG9uVmFsdWVVcGRhdGU6IGZ1bmN0aW9uKGZpZWxkS2V5LCB2YWx1ZSkge1xuICAgIHRoaXMucHJvcHMubW9kZWxbZmllbGRLZXldID0gdmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbkZvcm1seVVwZGF0ZSh0aGlzLnByb3BzLm1vZGVsKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtb2RlbCA9IHRoaXMucHJvcHMubW9kZWw7XG4gICAgdmFyIG9uVmFsdWVVcGRhdGUgPSB0aGlzLm9uVmFsdWVVcGRhdGU7XG4gICAgdmFyIGZpZWxkcyA9IHRoaXMucHJvcHMuY29uZmlnLmZpZWxkcy5tYXAoZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIHJldHVybiBnZW5lcmF0ZUZpZWxkVGFnKGZpZWxkLCBtb2RlbCwgb25WYWx1ZVVwZGF0ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFJlYWN0LkRPTS5mb3JtKHtjbGFzc05hbWU6IFwiZm9ybWx5XCIsIHJvbGU6IFwiZm9ybVwiLCBuYW1lOiB0aGlzLnByb3BzLmNvbmZpZy5uYW1lfSwgZmllbGRzKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRmllbGRUYWcoZmllbGQsIG1vZGVsLCBvblZhbHVlVXBkYXRlKSB7XG4gIHZhciBmaWVsZENvbXBvbmVudCA9IGZpZWxkLmNvbXBvbmVudCA/IGZpZWxkLmNvbXBvbmVudCA6IEZvcm1seUNvbmZpZy5maWVsZHMuZ2V0VHlwZXMoKVtmaWVsZC50eXBlXTtcbiAgaWYgKCFmaWVsZENvbXBvbmVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRm9ybWx5OiBcIicgKyBmaWVsZC50eXBlICsgJ1wiIGhhcyBub3QgYmVlbiBhZGRlZCB0byBGb3JtbHlDb25maWdcXCdzIGZpZWxkIHR5cGVzLicpO1xuICB9XG5cbiAgLy8gaGlkZGVuXG4gIHZhciBoaWRlID0gaXNPckludm9rZShmaWVsZCwgJ2hpZGRlbicsIG1vZGVsKTtcbiAgaWYgKGhpZGUgJiYgaGlkZSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkQ29tcG9uZW50KHttb2RlbDogbW9kZWwsIGNvbmZpZzogZmllbGQsIG9uVmFsdWVVcGRhdGU6IG9uVmFsdWVVcGRhdGUsIGtleTogZmllbGQua2V5fSk7XG59XG5cbmZ1bmN0aW9uIGlzT3JJbnZva2UoZmllbGQsIHByb3BlcnR5LCBtb2RlbCkge1xuICBpZiAoIWZpZWxkLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICh0eXBlb2YgZmllbGRbcHJvcGVydHldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZpZWxkW3Byb3BlcnR5XShtb2RlbCwgZmllbGQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhIWZpZWxkW3Byb3BlcnR5XTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1seTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvRm9ybWx5LmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRmllbGRNaXhpbiA9IHtcbiAgb25DaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIHZhbHVlID0gZ2V0VmFsdWUoZXZlbnQudGFyZ2V0KTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKHZhbHVlKTtcbiAgfSxcbiAgdXBkYXRlVmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMudHJhbnNmb3JtVXBkYXRlKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMudHJhbnNmb3JtVXBkYXRlKHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMuY29uZmlnLmtleSwgdmFsdWUpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBnZXRWYWx1ZShub2RlKSB7XG4gIHN3aXRjaChub2RlLnR5cGUpIHtcbiAgICBjYXNlICdjaGVja2JveCc6XG4gICAgY2FzZSAncmFkaW8nOlxuICAgICAgcmV0dXJuIG5vZGUuY2hlY2tlZDtcbiAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgcmV0dXJuIG5vZGUuc2VsZWN0ZWQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBub2RlLnZhbHVlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmllbGRNaXhpbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL21peGlucy9GaWVsZE1peGluLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHV0aWxzID0ge1xuICBQcm9wVHlwZXM6IHtcbiAgICBvYmplY3RXaXRoOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb2JqZWN0V2l0aEZuKG9wdGlvbnMsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn07XG5cbnV0aWxzLlByb3BUeXBlcy5vYmplY3RXaXRoLmlzUmVxdWlyZWQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHJldHVybiBvYmplY3RXaXRoRm4ob3B0aW9ucywgdHJ1ZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzO1xuXG5mdW5jdGlvbiBvYmplY3RXaXRoRm4ob3B0aW9ucywgaXNSZXF1aXJlZCkge1xuICByZXR1cm4gZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAgdmFyIGNvbXBvbmVudFByb3AgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIGVycm9yTWVzc2FnZSA9ICcnO1xuICAgIGlmICghaXNSZXF1aXJlZCAmJiAhY29tcG9uZW50UHJvcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoaXNSZXF1aXJlZCAmJiAhY29tcG9uZW50UHJvcCkge1xuICAgICAgZXJyb3JNZXNzYWdlID0gJ1JlcXVpcmVkIHByb3AgYCcgKyBwcm9wTmFtZSArICdgIHdhcyBub3Qgc3BlY2lmaWVkIGluIGAnICsgY29tcG9uZW50TmFtZSArICdgLic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBlcnJvcnMgPSB7XG4gICAgICAgIG1pc3Npbmc6IFtdLFxuICAgICAgICBleHRyYTogW11cbiAgICAgIH07XG4gICAgICBmb3IgKHZhciBwcm9wIGluIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNob3VsZEJlUHJlc2VudCA9IG9wdGlvbnNbcHJvcF07XG4gICAgICAgIHZhciBoYXNQcm9wID0gY29tcG9uZW50UHJvcC5oYXNPd25Qcm9wZXJ0eShwcm9wKTtcbiAgICAgICAgaWYgKCFzaG91bGRCZVByZXNlbnQgJiYgaGFzUHJvcCkge1xuICAgICAgICAgIGVycm9ycy5leHRyYS5wdXNoKHByb3ApO1xuICAgICAgICB9IGVsc2UgaWYgKHNob3VsZEJlUHJlc2VudCAmJiAhaGFzUHJvcCkge1xuICAgICAgICAgIGVycm9ycy5taXNzaW5nLnB1c2gocHJvcCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBtaXNzaW5nU29tZSA9ICEhZXJyb3JzLm1pc3NpbmcubGVuZ3RoO1xuICAgICAgdmFyIGJhZEV4dHJhcyA9ICEhZXJyb3JzLmV4dHJhLmxlbmd0aDtcbiAgICAgIGlmIChtaXNzaW5nU29tZSB8fCBiYWRFeHRyYXMpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gJ1Byb3AgYCcgKyBwcm9wTmFtZSArICdgIGluIGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBzb21lIGludmFsaWQgcHJvcGVydGllczogJztcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvcnMubWlzc2luZy5sZW5ndGgpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlICs9ICdzaG91bGQgaGF2ZSAnICsgSlNPTi5zdHJpbmdpZnkoZXJyb3JzLm1pc3NpbmcpO1xuICAgICAgfVxuICAgICAgaWYgKG1pc3NpbmdTb21lICYmIGJhZEV4dHJhcykge1xuICAgICAgICBlcnJvck1lc3NhZ2UgKz0gJyBhbmQgJztcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvcnMuZXh0cmEubGVuZ3RoKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSArPSAnc2hvdWxkIG5vdCBoYXZlICcgKyBKU09OLnN0cmluZ2lmeShlcnJvcnMuZXh0cmEpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIlJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJyZWFjdC1mb3JtbHkuanMifQ==