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

	module.exports.Formly = __webpack_require__(4);
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
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

/***/ },
/* 4 */
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
	    return React.DOM.form({name: "{this.formly.config.name}"}, fields);
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

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1YjkyZDIwMDJiMDBmYzNhZTlkOSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtbHlDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9GaWVsZE1peGluLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm1seS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0ZBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ2hDQSxnRDs7Ozs7O0FDQUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkI7Ozs7OztBQ2ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsNEJBQTJCLFFBQVEsd0JBQXdCLEVBQUU7QUFDN0Q7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBbUIsMEVBQTBFO0FBQzdGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEseUIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJSZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdEZvcm1seVwiXSA9IGZhY3RvcnkocmVxdWlyZShcIlJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdEZvcm1seVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNWI5MmQyMDAyYjAwZmMzYWU5ZDlcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cy5Gb3JtbHkgPSByZXF1aXJlKCcuL3NyYy9jb21wb25lbnRzL0Zvcm1seScpO1xubW9kdWxlLmV4cG9ydHMuRmllbGRNaXhpbiA9IHJlcXVpcmUoJy4vc3JjL2NvbXBvbmVudHMvRmllbGRNaXhpbicpO1xubW9kdWxlLmV4cG9ydHMuRm9ybWx5Q29uZmlnID0gcmVxdWlyZSgnLi9zcmMvY29tcG9uZW50cy9Gb3JtbHlDb25maWcnKTtcblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmllbGRUeXBlTWFwID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBmaWVsZHM6IHtcbiAgICBhZGRUeXBlOiBhZGRGaWVsZFR5cGUsXG4gICAgZ2V0VHlwZXM6IGdldEZpZWxkVHlwZXMsXG4gICAgY2xlYXJUeXBlczogY2xlYXJUeXBlc1xuICB9XG59O1xuXG5mdW5jdGlvbiBhZGRGaWVsZFR5cGUobmFtZSwgZmllbGQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkobmFtZSkpIHtcbiAgICBuYW1lLmZvckVhY2goZnVuY3Rpb24oZmllbGRUeXBlKSB7XG4gICAgICBhZGRGaWVsZFR5cGUoZmllbGRUeXBlKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICBmaWVsZCA9IG5hbWUuZmllbGQ7XG4gICAgbmFtZSA9IG5hbWUubmFtZTtcbiAgfVxuICBmaWVsZFR5cGVNYXBbbmFtZV0gPSBmaWVsZDtcbn1cblxuZnVuY3Rpb24gZ2V0RmllbGRUeXBlcygpIHtcbiAgcmV0dXJuIGZpZWxkVHlwZU1hcDtcbn1cblxuZnVuY3Rpb24gY2xlYXJUeXBlcygpIHtcbiAgdmFyIG9sZFR5cGVzID0gZmllbGRUeXBlTWFwO1xuICBmaWVsZFR5cGVNYXAgPSB7fTtcbiAgcmV0dXJuIG9sZFR5cGVzO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9Gb3JtbHlDb25maWcuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBGaWVsZE1peGluID0ge1xuICBvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgaWYgKHRoaXMudHJhbnNmb3JtVXBkYXRlKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMudHJhbnNmb3JtVXBkYXRlKHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMuY29uZmlnLmtleSwgdmFsdWUpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkTWl4aW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0ZpZWxkTWl4aW4uanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBmaWVsZFR5cGVzID0gcmVxdWlyZSgnLi9Gb3JtbHlDb25maWcnKS5maWVsZHMuZ2V0VHlwZXMoKTtcblxudmFyIEZvcm1seSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0Zvcm1seScsXG4gIG9uVmFsdWVVcGRhdGU6IGZ1bmN0aW9uKGZpZWxkS2V5LCB2YWx1ZSkge1xuICAgIHRoaXMuZm9ybWx5Lm1vZGVsW2ZpZWxkS2V5XSA9IHZhbHVlO1xuICAgIHRoaXMucHJvcHMub25Gb3JtbHlVcGRhdGUodGhpcy5mb3JtbHkubW9kZWwpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuZm9ybWx5ID0ge1xuICAgICAgY29uZmlnOiB0aGlzLnByb3BzLmNvbmZpZyxcbiAgICAgIG1vZGVsOiB0aGlzLnByb3BzLm1vZGVsXG4gICAgfTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbW9kZWwgPSB0aGlzLmZvcm1seS5tb2RlbDtcbiAgICB2YXIgb25WYWx1ZVVwZGF0ZSA9IHRoaXMub25WYWx1ZVVwZGF0ZTtcbiAgICB2YXIgZmllbGRzID0gdGhpcy5mb3JtbHkuY29uZmlnLmZpZWxkcy5tYXAoZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIHJldHVybiBnZW5lcmF0ZUZpZWxkVGFnKGZpZWxkLCBtb2RlbCwgb25WYWx1ZVVwZGF0ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFJlYWN0LkRPTS5mb3JtKHtuYW1lOiBcInt0aGlzLmZvcm1seS5jb25maWcubmFtZX1cIn0sIGZpZWxkcyk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUZpZWxkVGFnKGZpZWxkLCBtb2RlbCwgb25WYWx1ZVVwZGF0ZSkge1xuICB2YXIgZmllbGRUYWcgPSBmaWVsZFR5cGVzW2ZpZWxkLnR5cGVdO1xuICBpZiAoIWZpZWxkVGFnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtbHk6IFwiJyArIGZpZWxkLnR5cGUgKyAnXCIgaGFzIG5vdCBiZWVuIGFkZGVkIHRvIEZvcm1seUNvbmZpZ1xcJ3MgZmllbGQgdHlwZXMuJyk7XG4gIH1cblxuICAvLyBoaWRkZW5cbiAgdmFyIGhpZGUgPSBpc09ySW52b2tlKGZpZWxkLCAnaGlkZGVuJywgbW9kZWwpO1xuICBpZiAoIWhpZGUgJiYgaGlkZSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkVGFnKHttb2RlbDogbW9kZWwsIGNvbmZpZzogZmllbGQsIG9uVmFsdWVVcGRhdGU6IG9uVmFsdWVVcGRhdGUsIGtleTogZmllbGQua2V5fSk7XG59XG5cbmZ1bmN0aW9uIGlzT3JJbnZva2UoZmllbGQsIHByb3BlcnR5LCBtb2RlbCkge1xuICBpZiAoIWZpZWxkLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICh0eXBlb2YgZmllbGRbcHJvcGVydHldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZpZWxkW3Byb3BlcnR5XShtb2RlbCwgZmllbGQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAhIWZpZWxkW3Byb3BlcnR5XTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1seTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvRm9ybWx5LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicmVhY3QtZm9ybWx5LmpzIn0=