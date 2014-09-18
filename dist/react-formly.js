(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactFormly"] = factory(require("React"));
	else
		root["ReactFormly"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
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
	
	var React = __webpack_require__(4);
	var FormlyConfig = __webpack_require__(1);
	var utils = __webpack_require__(5);
	
	
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
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

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjYjBjZGZiYTUxNjNlNDc4NmEyMyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9Gb3JtbHlDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybWx5LmpzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvRmllbGRNaXhpbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdFwiIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0ZBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ2hDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0EsaUNBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxJQUFHOztBQUVIO0FBQ0EsYUFBWSxVQUFVO0FBQ3RCLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLDRCQUEyQixnRUFBZ0U7QUFDM0Y7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBeUIsMEVBQTBFO0FBQ25HOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEseUI7Ozs7OztBQy9EQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCOzs7Ozs7QUMzQkEsZ0Q7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIlJlYWN0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIlJlYWN0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlJlYWN0Rm9ybWx5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiUmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlJlYWN0Rm9ybWx5XCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjYjBjZGZiYTUxNjNlNDc4NmEyM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzLkZvcm1seSA9IHJlcXVpcmUoJy4vc3JjL2NvbXBvbmVudHMvRm9ybWx5Jyk7XG5tb2R1bGUuZXhwb3J0cy5GaWVsZE1peGluID0gcmVxdWlyZSgnLi9zcmMvbWl4aW5zL0ZpZWxkTWl4aW4nKTtcbm1vZHVsZS5leHBvcnRzLkZvcm1seUNvbmZpZyA9IHJlcXVpcmUoJy4vc3JjL21vZHVsZXMvRm9ybWx5Q29uZmlnJyk7XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZpZWxkVHlwZU1hcCA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZmllbGRzOiB7XG4gICAgYWRkVHlwZTogYWRkRmllbGRUeXBlLFxuICAgIGdldFR5cGVzOiBnZXRGaWVsZFR5cGVzLFxuICAgIGNsZWFyVHlwZXM6IGNsZWFyVHlwZXNcbiAgfVxufTtcblxuZnVuY3Rpb24gYWRkRmllbGRUeXBlKG5hbWUsIGZpZWxkKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG5hbWUpKSB7XG4gICAgbmFtZS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkVHlwZSkge1xuICAgICAgYWRkRmllbGRUeXBlKGZpZWxkVHlwZSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgZmllbGQgPSBuYW1lLmZpZWxkO1xuICAgIG5hbWUgPSBuYW1lLm5hbWU7XG4gIH1cbiAgZmllbGRUeXBlTWFwW25hbWVdID0gZmllbGQ7XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkVHlwZXMoKSB7XG4gIHJldHVybiBmaWVsZFR5cGVNYXA7XG59XG5cbmZ1bmN0aW9uIGNsZWFyVHlwZXMoKSB7XG4gIHZhciBvbGRUeXBlcyA9IGZpZWxkVHlwZU1hcDtcbiAgZmllbGRUeXBlTWFwID0ge307XG4gIHJldHVybiBvbGRUeXBlcztcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL21vZHVsZXMvRm9ybWx5Q29uZmlnLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRm9ybWx5Q29uZmlnID0gcmVxdWlyZSgnLi8uLi9tb2R1bGVzL0Zvcm1seUNvbmZpZycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuXG52YXIgRm9ybWx5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnRm9ybWx5JyxcbiAgcHJvcFR5cGVzOiB7XG4gICAgb25Gb3JtbHlVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgY29uZmlnOiB1dGlscy5Qcm9wVHlwZXMub2JqZWN0V2l0aCh7XG4gICAgICBuYW1lOiB0cnVlLFxuICAgICAgZmllbGRzOiB0cnVlXG4gICAgfSksXG4gICAgbW9kZWw6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7IG1vZGVsOiB7fSB9XG4gIH0sXG5cbiAgb25WYWx1ZVVwZGF0ZTogZnVuY3Rpb24oZmllbGRLZXksIHZhbHVlKSB7XG4gICAgdGhpcy5wcm9wcy5tb2RlbFtmaWVsZEtleV0gPSB2YWx1ZTtcbiAgICB0aGlzLnByb3BzLm9uRm9ybWx5VXBkYXRlKHRoaXMucHJvcHMubW9kZWwpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1vZGVsID0gdGhpcy5wcm9wcy5tb2RlbDtcbiAgICB2YXIgb25WYWx1ZVVwZGF0ZSA9IHRoaXMub25WYWx1ZVVwZGF0ZTtcbiAgICB2YXIgZmllbGRzID0gdGhpcy5wcm9wcy5jb25maWcuZmllbGRzLm1hcChmdW5jdGlvbihmaWVsZCkge1xuICAgICAgcmV0dXJuIGdlbmVyYXRlRmllbGRUYWcoZmllbGQsIG1vZGVsLCBvblZhbHVlVXBkYXRlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gUmVhY3QuRE9NLmZvcm0oe2NsYXNzTmFtZTogXCJmb3JtbHlcIiwgcm9sZTogXCJmb3JtXCIsIG5hbWU6IHRoaXMucHJvcHMuY29uZmlnLm5hbWV9LCBmaWVsZHMpO1xuICB9XG59KTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVGaWVsZFRhZyhmaWVsZCwgbW9kZWwsIG9uVmFsdWVVcGRhdGUpIHtcbiAgdmFyIGZpZWxkQ29tcG9uZW50ID0gZmllbGQuY29tcG9uZW50ID8gZmllbGQuY29tcG9uZW50IDogRm9ybWx5Q29uZmlnLmZpZWxkcy5nZXRUeXBlcygpW2ZpZWxkLnR5cGVdO1xuICBpZiAoIWZpZWxkQ29tcG9uZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtbHk6IFwiJyArIGZpZWxkLnR5cGUgKyAnXCIgaGFzIG5vdCBiZWVuIGFkZGVkIHRvIEZvcm1seUNvbmZpZ1xcJ3MgZmllbGQgdHlwZXMuJyk7XG4gIH1cblxuICAvLyBoaWRkZW5cbiAgdmFyIGhpZGUgPSBpc09ySW52b2tlKGZpZWxkLCAnaGlkZGVuJywgbW9kZWwpO1xuICBpZiAoaGlkZSAmJiBoaWRlICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gZmllbGRDb21wb25lbnQoe21vZGVsOiBtb2RlbCwgY29uZmlnOiBmaWVsZCwgb25WYWx1ZVVwZGF0ZTogb25WYWx1ZVVwZGF0ZSwga2V5OiBmaWVsZC5rZXl9KTtcbn1cblxuZnVuY3Rpb24gaXNPckludm9rZShmaWVsZCwgcHJvcGVydHksIG1vZGVsKSB7XG4gIGlmICghZmllbGQuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKHR5cGVvZiBmaWVsZFtwcm9wZXJ0eV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmllbGRbcHJvcGVydHldKG1vZGVsLCBmaWVsZCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICEhZmllbGRbcHJvcGVydHldO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybWx5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9Gb3JtbHkuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBGaWVsZE1peGluID0ge1xuICBvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShldmVudC50YXJnZXQpO1xuICAgIHRoaXMudXBkYXRlVmFsdWUodmFsdWUpO1xuICB9LFxuICB1cGRhdGVWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodGhpcy50cmFuc2Zvcm1VcGRhdGUpIHtcbiAgICAgIHZhbHVlID0gdGhpcy50cmFuc2Zvcm1VcGRhdGUodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy5jb25maWcua2V5LCB2YWx1ZSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldFZhbHVlKG5vZGUpIHtcbiAgc3dpdGNoKG5vZGUudHlwZSkge1xuICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICBjYXNlICdyYWRpbyc6XG4gICAgICByZXR1cm4gbm9kZS5jaGVja2VkO1xuICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICByZXR1cm4gbm9kZS5zZWxlY3RlZDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG5vZGUudmFsdWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZE1peGluO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvbWl4aW5zL0ZpZWxkTWl4aW4uanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHV0aWxzID0ge1xuICBQcm9wVHlwZXM6IHtcbiAgICBvYmplY3RXaXRoOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb2JqZWN0V2l0aEZuKG9wdGlvbnMsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn07XG5cbnV0aWxzLlByb3BUeXBlcy5vYmplY3RXaXRoLmlzUmVxdWlyZWQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHJldHVybiBvYmplY3RXaXRoRm4ob3B0aW9ucywgdHJ1ZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzO1xuXG5mdW5jdGlvbiBvYmplY3RXaXRoRm4ob3B0aW9ucywgaXNSZXF1aXJlZCkge1xuICByZXR1cm4gZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAgdmFyIGNvbXBvbmVudFByb3AgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIGVycm9yTWVzc2FnZSA9ICcnO1xuICAgIGlmICghaXNSZXF1aXJlZCAmJiAhY29tcG9uZW50UHJvcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoaXNSZXF1aXJlZCAmJiAhY29tcG9uZW50UHJvcCkge1xuICAgICAgZXJyb3JNZXNzYWdlID0gJ1JlcXVpcmVkIHByb3AgYCcgKyBwcm9wTmFtZSArICdgIHdhcyBub3Qgc3BlY2lmaWVkIGluIGAnICsgY29tcG9uZW50TmFtZSArICdgLic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBlcnJvcnMgPSB7XG4gICAgICAgIG1pc3Npbmc6IFtdLFxuICAgICAgICBleHRyYTogW11cbiAgICAgIH07XG4gICAgICBmb3IgKHZhciBwcm9wIGluIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNob3VsZEJlUHJlc2VudCA9IG9wdGlvbnNbcHJvcF07XG4gICAgICAgIHZhciBoYXNQcm9wID0gY29tcG9uZW50UHJvcC5oYXNPd25Qcm9wZXJ0eShwcm9wKTtcbiAgICAgICAgaWYgKCFzaG91bGRCZVByZXNlbnQgJiYgaGFzUHJvcCkge1xuICAgICAgICAgIGVycm9ycy5leHRyYS5wdXNoKHByb3ApO1xuICAgICAgICB9IGVsc2UgaWYgKHNob3VsZEJlUHJlc2VudCAmJiAhaGFzUHJvcCkge1xuICAgICAgICAgIGVycm9ycy5taXNzaW5nLnB1c2gocHJvcCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBtaXNzaW5nU29tZSA9ICEhZXJyb3JzLm1pc3NpbmcubGVuZ3RoO1xuICAgICAgdmFyIGJhZEV4dHJhcyA9ICEhZXJyb3JzLmV4dHJhLmxlbmd0aDtcbiAgICAgIGlmIChtaXNzaW5nU29tZSB8fCBiYWRFeHRyYXMpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gJ1Byb3AgYCcgKyBwcm9wTmFtZSArICdgIGluIGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBzb21lIGludmFsaWQgcHJvcGVydGllczogJztcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvcnMubWlzc2luZy5sZW5ndGgpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlICs9ICdzaG91bGQgaGF2ZSAnICsgSlNPTi5zdHJpbmdpZnkoZXJyb3JzLm1pc3NpbmcpO1xuICAgICAgfVxuICAgICAgaWYgKG1pc3NpbmdTb21lICYmIGJhZEV4dHJhcykge1xuICAgICAgICBlcnJvck1lc3NhZ2UgKz0gJyBhbmQgJztcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvcnMuZXh0cmEubGVuZ3RoKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSArPSAnc2hvdWxkIG5vdCBoYXZlICcgKyBKU09OLnN0cmluZ2lmeShlcnJvcnMuZXh0cmEpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InJlYWN0LWZvcm1seS5qcyJ9