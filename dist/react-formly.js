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
	  var fieldTag = FormlyConfig.fields.getTypes()[field.type];
	  if (!fieldTag) {
	    throw new Error('Formly: "' + field.type + '" has not been added to FormlyConfig\'s field types.');
	  }
	
	  // hidden
	  var hide = isOrInvoke(field, 'hidden', model);
	  if (hide && hide !== null) {
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4ZmYzNDc5MTljOTc3ZTk2ZmM0MiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtbHlDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybWx5LmpzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvRmllbGRNaXhpbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDRkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDaENBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0EsaUNBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsNEJBQTJCLGlFQUFpRTtBQUM1RjtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFtQiwwRUFBMEU7QUFDN0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDOURBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2Qjs7Ozs7O0FDWkEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJSZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdEZvcm1seVwiXSA9IGZhY3RvcnkocmVxdWlyZShcIlJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdEZvcm1seVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOGZmMzQ3OTE5Yzk3N2U5NmZjNDJcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cy5Gb3JtbHkgPSByZXF1aXJlKCcuL3NyYy9jb21wb25lbnRzL0Zvcm1seScpO1xubW9kdWxlLmV4cG9ydHMuRmllbGRNaXhpbiA9IHJlcXVpcmUoJy4vc3JjL21peGlucy9GaWVsZE1peGluJyk7XG5tb2R1bGUuZXhwb3J0cy5Gb3JtbHlDb25maWcgPSByZXF1aXJlKCcuL3NyYy9jb21wb25lbnRzL0Zvcm1seUNvbmZpZycpO1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmaWVsZFR5cGVNYXAgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGZpZWxkczoge1xuICAgIGFkZFR5cGU6IGFkZEZpZWxkVHlwZSxcbiAgICBnZXRUeXBlczogZ2V0RmllbGRUeXBlcyxcbiAgICBjbGVhclR5cGVzOiBjbGVhclR5cGVzXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGFkZEZpZWxkVHlwZShuYW1lLCBmaWVsZCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShuYW1lKSkge1xuICAgIG5hbWUuZm9yRWFjaChmdW5jdGlvbihmaWVsZFR5cGUpIHtcbiAgICAgIGFkZEZpZWxkVHlwZShmaWVsZFR5cGUpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgIGZpZWxkID0gbmFtZS5maWVsZDtcbiAgICBuYW1lID0gbmFtZS5uYW1lO1xuICB9XG4gIGZpZWxkVHlwZU1hcFtuYW1lXSA9IGZpZWxkO1xufVxuXG5mdW5jdGlvbiBnZXRGaWVsZFR5cGVzKCkge1xuICByZXR1cm4gZmllbGRUeXBlTWFwO1xufVxuXG5mdW5jdGlvbiBjbGVhclR5cGVzKCkge1xuICB2YXIgb2xkVHlwZXMgPSBmaWVsZFR5cGVNYXA7XG4gIGZpZWxkVHlwZU1hcCA9IHt9O1xuICByZXR1cm4gb2xkVHlwZXM7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0Zvcm1seUNvbmZpZy5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm1seUNvbmZpZyA9IHJlcXVpcmUoJy4vRm9ybWx5Q29uZmlnJyk7XG5cblxudmFyIEZvcm1seSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0Zvcm1seScsXG4gIHByb3BUeXBlczoge1xuICAgIG9uRm9ybWx5VXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbmZpZzogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIG1vZGVsOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG4gIH0sXG5cbiAgb25WYWx1ZVVwZGF0ZTogZnVuY3Rpb24oZmllbGRLZXksIHZhbHVlKSB7XG4gICAgdGhpcy5mb3JtbHkubW9kZWxbZmllbGRLZXldID0gdmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbkZvcm1seVVwZGF0ZSh0aGlzLmZvcm1seS5tb2RlbCk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5mb3JtbHkgPSB7XG4gICAgICBjb25maWc6IHRoaXMucHJvcHMuY29uZmlnLFxuICAgICAgbW9kZWw6IHRoaXMucHJvcHMubW9kZWwgfHwge31cbiAgICB9O1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1vZGVsID0gdGhpcy5mb3JtbHkubW9kZWw7XG4gICAgdmFyIG9uVmFsdWVVcGRhdGUgPSB0aGlzLm9uVmFsdWVVcGRhdGU7XG4gICAgdmFyIGZpZWxkcyA9IHRoaXMuZm9ybWx5LmNvbmZpZy5maWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICByZXR1cm4gZ2VuZXJhdGVGaWVsZFRhZyhmaWVsZCwgbW9kZWwsIG9uVmFsdWVVcGRhdGUpO1xuICAgIH0pO1xuICAgIHJldHVybiBSZWFjdC5ET00uZm9ybSh7Y2xhc3NOYW1lOiBcImZvcm1seVwiLCByb2xlOiBcImZvcm1cIiwgbmFtZTogdGhpcy5mb3JtbHkuY29uZmlnLm5hbWV9LCBmaWVsZHMpO1xuICB9XG59KTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVGaWVsZFRhZyhmaWVsZCwgbW9kZWwsIG9uVmFsdWVVcGRhdGUpIHtcbiAgdmFyIGZpZWxkVGFnID0gRm9ybWx5Q29uZmlnLmZpZWxkcy5nZXRUeXBlcygpW2ZpZWxkLnR5cGVdO1xuICBpZiAoIWZpZWxkVGFnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtbHk6IFwiJyArIGZpZWxkLnR5cGUgKyAnXCIgaGFzIG5vdCBiZWVuIGFkZGVkIHRvIEZvcm1seUNvbmZpZ1xcJ3MgZmllbGQgdHlwZXMuJyk7XG4gIH1cblxuICAvLyBoaWRkZW5cbiAgdmFyIGhpZGUgPSBpc09ySW52b2tlKGZpZWxkLCAnaGlkZGVuJywgbW9kZWwpO1xuICBpZiAoaGlkZSAmJiBoaWRlICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gZmllbGRUYWcoe21vZGVsOiBtb2RlbCwgY29uZmlnOiBmaWVsZCwgb25WYWx1ZVVwZGF0ZTogb25WYWx1ZVVwZGF0ZSwga2V5OiBmaWVsZC5rZXl9KTtcbn1cblxuZnVuY3Rpb24gaXNPckludm9rZShmaWVsZCwgcHJvcGVydHksIG1vZGVsKSB7XG4gIGlmICghZmllbGQuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKHR5cGVvZiBmaWVsZFtwcm9wZXJ0eV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmllbGRbcHJvcGVydHldKG1vZGVsLCBmaWVsZCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICEhZmllbGRbcHJvcGVydHldO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybWx5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9Gb3JtbHkuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBGaWVsZE1peGluID0ge1xuICBvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgaWYgKHRoaXMudHJhbnNmb3JtVXBkYXRlKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMudHJhbnNmb3JtVXBkYXRlKHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMuY29uZmlnLmtleSwgdmFsdWUpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkTWl4aW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9taXhpbnMvRmllbGRNaXhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIlJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJyZWFjdC1mb3JtbHkuanMifQ==