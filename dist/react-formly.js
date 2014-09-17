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
	
	
	var Formly = React.createClass({displayName: 'Formly',
	  propTypes: {
	    onFormlyUpdate: React.PropTypes.func.isRequired,
	    config: React.PropTypes.object.isRequired,
	    model: React.PropTypes.object
	  },
	
	  onValueUpdate: function(fieldKey, value) {
	    this.formly.model[fieldKey] = value;
	    this.props.onFormlyUpdate(this.formly.model);
	  },
	
	  componentWillMount: function componentWillMount() {
	    this.formly = {
	      config: this.props.config,
	      model: this.props.model || {}
	    };
	  },
	
	  render: function() {
	    var model = this.formly.model;
	    var onValueUpdate = this.onValueUpdate;
	    var fields = this.formly.config.fields.map(function(field) {
	      return generateFieldTag(field, model, onValueUpdate);
	    });
	    return React.DOM.form({className: "formly", role: "form", name: this.formly.config.name}, fields);
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzYWZjZWJjZDA5YTM0NDc1YzJjNSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9Gb3JtbHlDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybWx5LmpzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvRmllbGRNaXhpbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDRkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDaENBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0EsaUNBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsNEJBQTJCLGlFQUFpRTtBQUM1RjtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUF5QiwwRUFBMEU7QUFDbkc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDOURBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2Qjs7Ozs7O0FDNUJBLGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiUmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiUmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3RGb3JtbHlcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUmVhY3RGb3JtbHlcIl0gPSBmYWN0b3J5KHJvb3RbXCJSZWFjdFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDNhZmNlYmNkMDlhMzQ0NzVjMmM1XG4gKiovIiwibW9kdWxlLmV4cG9ydHMuRm9ybWx5ID0gcmVxdWlyZSgnLi9zcmMvY29tcG9uZW50cy9Gb3JtbHknKTtcbm1vZHVsZS5leHBvcnRzLkZpZWxkTWl4aW4gPSByZXF1aXJlKCcuL3NyYy9taXhpbnMvRmllbGRNaXhpbicpO1xubW9kdWxlLmV4cG9ydHMuRm9ybWx5Q29uZmlnID0gcmVxdWlyZSgnLi9zcmMvbW9kdWxlcy9Gb3JtbHlDb25maWcnKTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmllbGRUeXBlTWFwID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBmaWVsZHM6IHtcbiAgICBhZGRUeXBlOiBhZGRGaWVsZFR5cGUsXG4gICAgZ2V0VHlwZXM6IGdldEZpZWxkVHlwZXMsXG4gICAgY2xlYXJUeXBlczogY2xlYXJUeXBlc1xuICB9XG59O1xuXG5mdW5jdGlvbiBhZGRGaWVsZFR5cGUobmFtZSwgZmllbGQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkobmFtZSkpIHtcbiAgICBuYW1lLmZvckVhY2goZnVuY3Rpb24oZmllbGRUeXBlKSB7XG4gICAgICBhZGRGaWVsZFR5cGUoZmllbGRUeXBlKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICBmaWVsZCA9IG5hbWUuZmllbGQ7XG4gICAgbmFtZSA9IG5hbWUubmFtZTtcbiAgfVxuICBmaWVsZFR5cGVNYXBbbmFtZV0gPSBmaWVsZDtcbn1cblxuZnVuY3Rpb24gZ2V0RmllbGRUeXBlcygpIHtcbiAgcmV0dXJuIGZpZWxkVHlwZU1hcDtcbn1cblxuZnVuY3Rpb24gY2xlYXJUeXBlcygpIHtcbiAgdmFyIG9sZFR5cGVzID0gZmllbGRUeXBlTWFwO1xuICBmaWVsZFR5cGVNYXAgPSB7fTtcbiAgcmV0dXJuIG9sZFR5cGVzO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvbW9kdWxlcy9Gb3JtbHlDb25maWcuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBGb3JtbHlDb25maWcgPSByZXF1aXJlKCcuLy4uL21vZHVsZXMvRm9ybWx5Q29uZmlnJyk7XG5cblxudmFyIEZvcm1seSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0Zvcm1seScsXG4gIHByb3BUeXBlczoge1xuICAgIG9uRm9ybWx5VXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbmZpZzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIG1vZGVsOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG4gIH0sXG5cbiAgb25WYWx1ZVVwZGF0ZTogZnVuY3Rpb24oZmllbGRLZXksIHZhbHVlKSB7XG4gICAgdGhpcy5mb3JtbHkubW9kZWxbZmllbGRLZXldID0gdmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbkZvcm1seVVwZGF0ZSh0aGlzLmZvcm1seS5tb2RlbCk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5mb3JtbHkgPSB7XG4gICAgICBjb25maWc6IHRoaXMucHJvcHMuY29uZmlnLFxuICAgICAgbW9kZWw6IHRoaXMucHJvcHMubW9kZWwgfHwge31cbiAgICB9O1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1vZGVsID0gdGhpcy5mb3JtbHkubW9kZWw7XG4gICAgdmFyIG9uVmFsdWVVcGRhdGUgPSB0aGlzLm9uVmFsdWVVcGRhdGU7XG4gICAgdmFyIGZpZWxkcyA9IHRoaXMuZm9ybWx5LmNvbmZpZy5maWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICByZXR1cm4gZ2VuZXJhdGVGaWVsZFRhZyhmaWVsZCwgbW9kZWwsIG9uVmFsdWVVcGRhdGUpO1xuICAgIH0pO1xuICAgIHJldHVybiBSZWFjdC5ET00uZm9ybSh7Y2xhc3NOYW1lOiBcImZvcm1seVwiLCByb2xlOiBcImZvcm1cIiwgbmFtZTogdGhpcy5mb3JtbHkuY29uZmlnLm5hbWV9LCBmaWVsZHMpO1xuICB9XG59KTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVGaWVsZFRhZyhmaWVsZCwgbW9kZWwsIG9uVmFsdWVVcGRhdGUpIHtcbiAgdmFyIGZpZWxkQ29tcG9uZW50ID0gZmllbGQuY29tcG9uZW50ID8gZmllbGQuY29tcG9uZW50IDogRm9ybWx5Q29uZmlnLmZpZWxkcy5nZXRUeXBlcygpW2ZpZWxkLnR5cGVdO1xuICBpZiAoIWZpZWxkQ29tcG9uZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtbHk6IFwiJyArIGZpZWxkLnR5cGUgKyAnXCIgaGFzIG5vdCBiZWVuIGFkZGVkIHRvIEZvcm1seUNvbmZpZ1xcJ3MgZmllbGQgdHlwZXMuJyk7XG4gIH1cblxuICAvLyBoaWRkZW5cbiAgdmFyIGhpZGUgPSBpc09ySW52b2tlKGZpZWxkLCAnaGlkZGVuJywgbW9kZWwpO1xuICBpZiAoaGlkZSAmJiBoaWRlICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gZmllbGRDb21wb25lbnQoe21vZGVsOiBtb2RlbCwgY29uZmlnOiBmaWVsZCwgb25WYWx1ZVVwZGF0ZTogb25WYWx1ZVVwZGF0ZSwga2V5OiBmaWVsZC5rZXl9KTtcbn1cblxuZnVuY3Rpb24gaXNPckludm9rZShmaWVsZCwgcHJvcGVydHksIG1vZGVsKSB7XG4gIGlmICghZmllbGQuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKHR5cGVvZiBmaWVsZFtwcm9wZXJ0eV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmllbGRbcHJvcGVydHldKG1vZGVsLCBmaWVsZCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICEhZmllbGRbcHJvcGVydHldO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybWx5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9Gb3JtbHkuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBGaWVsZE1peGluID0ge1xuICBvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbi8vICAgIGRlYnVnZ2VyO1xuICAgIHZhciB2YWx1ZSA9IGdldFZhbHVlKGV2ZW50LnRhcmdldCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSh2YWx1ZSk7XG4gIH0sXG4gIHVwZGF0ZVZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICh0aGlzLnRyYW5zZm9ybVVwZGF0ZSkge1xuICAgICAgdmFsdWUgPSB0aGlzLnRyYW5zZm9ybVVwZGF0ZSh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLmNvbmZpZy5rZXksIHZhbHVlKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZ2V0VmFsdWUobm9kZSkge1xuICBzd2l0Y2gobm9kZS50eXBlKSB7XG4gICAgY2FzZSAnY2hlY2tib3gnOlxuICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgIHJldHVybiBub2RlLmNoZWNrZWQ7XG4gICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgIHJldHVybiBub2RlLnNlbGVjdGVkO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbm9kZS52YWx1ZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkTWl4aW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9taXhpbnMvRmllbGRNaXhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIlJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJyZWFjdC1mb3JtbHkuanMifQ==