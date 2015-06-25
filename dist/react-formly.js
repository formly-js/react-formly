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
/***/ function(module, exports) {

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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(2);
	var merge = __webpack_require__(2);
	var FormlyConfig = __webpack_require__(1);
	
	function typeOrComponent(props, propName, componentName) {
	  var errorPrefix = componentName + ' config.fields field with key ' + props.key;
	  if (props.type && props.component) {
	    return new Error(errorPrefix + ' should only have either a type or a component, not both.');
	  } else if (!props.type && !props.component) {
	    return new Error(errorPrefix + ' should have either a type (string) or a component (React component)');
	  }
	}
	
	var Formly = React.createClass({displayName: 'Formly',
	  propTypes: {
	    onFormlyUpdate: React.PropTypes.func.isRequired,
	    config: React.PropTypes.shape({
	      name: React.PropTypes.string,
	      fields: React.PropTypes.arrayOf(React.PropTypes.shape({
	        key: React.PropTypes.string.isRequired,
	        type: typeOrComponent,
	        component: typeOrComponent,
	        hidden: React.PropTypes.oneOfType([
	          React.PropTypes.bool,
	          React.PropTypes.func
	        ]),
	        props: React.PropTypes.oneOfType([
	          React.PropTypes.object,
	          React.PropTypes.func
	        ]),
	        data: React.PropTypes.object
	      }))
	    }),
	    model: React.PropTypes.object
	  },
	
	  getDefaultProps: function() {
	    return { model: {} };
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
	
	  if (shouldHide(field, model)) {
	    return null;
	  }
	
	  return getComponent(fieldComponent, field, model, onValueUpdate);
	}
	
	function getComponent(fieldComponent, field, model, onValueUpdate) {
	  var component = fieldComponent({model: model, config: field, onValueUpdate: onValueUpdate, key: field.key});
	  if (field.props) {
	    var props = typeof field.props === 'function' ? field.props(model, field) : field.props;
	    component = React.addons.cloneWithProps(component, merge(props, {
	      key: component.props.key
	    }));
	  }
	  return component;
	}
	
	function shouldHide(field, model) {
	  var hide = isOrInvoke(field, 'hidden', model);
	  return hide && hide !== null;
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
/***/ function(module, exports) {

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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwMWI4YjczNjhiY2E5ZmZmNjQwOCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9Gb3JtbHlDb25maWcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiUmVhY3RcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Gb3JtbHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21peGlucy9GaWVsZE1peGluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDRkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDaENBLGdEOzs7Ozs7QUNBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEsaUNBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0EsSUFBRzs7QUFFSDtBQUNBLGFBQVksVUFBVTtBQUN0QixJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCw0QkFBMkIsZ0VBQWdFO0FBQzNGO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUNBQWtDLDBFQUEwRTtBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDbEdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkIiLCJmaWxlIjoicmVhY3QtZm9ybWx5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiUmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiUmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3RGb3JtbHlcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUmVhY3RGb3JtbHlcIl0gPSBmYWN0b3J5KHJvb3RbXCJSZWFjdFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDFiOGI3MzY4YmNhOWZmZjY0MDhcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cy5Gb3JtbHkgPSByZXF1aXJlKCcuL3NyYy9jb21wb25lbnRzL0Zvcm1seScpO1xubW9kdWxlLmV4cG9ydHMuRmllbGRNaXhpbiA9IHJlcXVpcmUoJy4vc3JjL21peGlucy9GaWVsZE1peGluJyk7XG5tb2R1bGUuZXhwb3J0cy5Gb3JtbHlDb25maWcgPSByZXF1aXJlKCcuL3NyYy9tb2R1bGVzL0Zvcm1seUNvbmZpZycpO1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmaWVsZFR5cGVNYXAgPSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGZpZWxkczoge1xuICAgIGFkZFR5cGU6IGFkZEZpZWxkVHlwZSxcbiAgICBnZXRUeXBlczogZ2V0RmllbGRUeXBlcyxcbiAgICBjbGVhclR5cGVzOiBjbGVhclR5cGVzXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGFkZEZpZWxkVHlwZShuYW1lLCBmaWVsZCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShuYW1lKSkge1xuICAgIG5hbWUuZm9yRWFjaChmdW5jdGlvbihmaWVsZFR5cGUpIHtcbiAgICAgIGFkZEZpZWxkVHlwZShmaWVsZFR5cGUpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgIGZpZWxkID0gbmFtZS5maWVsZDtcbiAgICBuYW1lID0gbmFtZS5uYW1lO1xuICB9XG4gIGZpZWxkVHlwZU1hcFtuYW1lXSA9IGZpZWxkO1xufVxuXG5mdW5jdGlvbiBnZXRGaWVsZFR5cGVzKCkge1xuICByZXR1cm4gZmllbGRUeXBlTWFwO1xufVxuXG5mdW5jdGlvbiBjbGVhclR5cGVzKCkge1xuICB2YXIgb2xkVHlwZXMgPSBmaWVsZFR5cGVNYXA7XG4gIGZpZWxkVHlwZU1hcCA9IHt9O1xuICByZXR1cm4gb2xkVHlwZXM7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9tb2R1bGVzL0Zvcm1seUNvbmZpZy5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIlJlYWN0XCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XG52YXIgbWVyZ2UgPSByZXF1aXJlKCdyZWFjdC9saWIvbWVyZ2UnKTtcbnZhciBGb3JtbHlDb25maWcgPSByZXF1aXJlKCcuLy4uL21vZHVsZXMvRm9ybWx5Q29uZmlnJyk7XG5cbmZ1bmN0aW9uIHR5cGVPckNvbXBvbmVudChwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgdmFyIGVycm9yUHJlZml4ID0gY29tcG9uZW50TmFtZSArICcgY29uZmlnLmZpZWxkcyBmaWVsZCB3aXRoIGtleSAnICsgcHJvcHMua2V5O1xuICBpZiAocHJvcHMudHlwZSAmJiBwcm9wcy5jb21wb25lbnQpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yUHJlZml4ICsgJyBzaG91bGQgb25seSBoYXZlIGVpdGhlciBhIHR5cGUgb3IgYSBjb21wb25lbnQsIG5vdCBib3RoLicpO1xuICB9IGVsc2UgaWYgKCFwcm9wcy50eXBlICYmICFwcm9wcy5jb21wb25lbnQpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yUHJlZml4ICsgJyBzaG91bGQgaGF2ZSBlaXRoZXIgYSB0eXBlIChzdHJpbmcpIG9yIGEgY29tcG9uZW50IChSZWFjdCBjb21wb25lbnQpJyk7XG4gIH1cbn1cblxudmFyIEZvcm1seSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0Zvcm1seScsXG4gIHByb3BUeXBlczoge1xuICAgIG9uRm9ybWx5VXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNvbmZpZzogUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIG5hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBmaWVsZHM6IFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIGtleTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICB0eXBlOiB0eXBlT3JDb21wb25lbnQsXG4gICAgICAgIGNvbXBvbmVudDogdHlwZU9yQ29tcG9uZW50LFxuICAgICAgICBoaWRkZW46IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jXG4gICAgICAgIF0pLFxuICAgICAgICBwcm9wczogUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgICAgICBdKSxcbiAgICAgICAgZGF0YTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuICAgICAgfSkpXG4gICAgfSksXG4gICAgbW9kZWw6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7IG1vZGVsOiB7fSB9O1xuICB9LFxuXG4gIG9uVmFsdWVVcGRhdGU6IGZ1bmN0aW9uKGZpZWxkS2V5LCB2YWx1ZSkge1xuICAgIHRoaXMucHJvcHMubW9kZWxbZmllbGRLZXldID0gdmFsdWU7XG4gICAgdGhpcy5wcm9wcy5vbkZvcm1seVVwZGF0ZSh0aGlzLnByb3BzLm1vZGVsKTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtb2RlbCA9IHRoaXMucHJvcHMubW9kZWw7XG4gICAgdmFyIG9uVmFsdWVVcGRhdGUgPSB0aGlzLm9uVmFsdWVVcGRhdGU7XG4gICAgdmFyIGZpZWxkcyA9IHRoaXMucHJvcHMuY29uZmlnLmZpZWxkcy5tYXAoZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIHJldHVybiBnZW5lcmF0ZUZpZWxkVGFnKGZpZWxkLCBtb2RlbCwgb25WYWx1ZVVwZGF0ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFJlYWN0LkRPTS5mb3JtKHtjbGFzc05hbWU6IFwiZm9ybWx5XCIsIHJvbGU6IFwiZm9ybVwiLCBuYW1lOiB0aGlzLnByb3BzLmNvbmZpZy5uYW1lfSwgZmllbGRzKTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRmllbGRUYWcoZmllbGQsIG1vZGVsLCBvblZhbHVlVXBkYXRlKSB7XG4gIHZhciBmaWVsZENvbXBvbmVudCA9IGZpZWxkLmNvbXBvbmVudCA/IGZpZWxkLmNvbXBvbmVudCA6IEZvcm1seUNvbmZpZy5maWVsZHMuZ2V0VHlwZXMoKVtmaWVsZC50eXBlXTtcbiAgaWYgKCFmaWVsZENvbXBvbmVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRm9ybWx5OiBcIicgKyBmaWVsZC50eXBlICsgJ1wiIGhhcyBub3QgYmVlbiBhZGRlZCB0byBGb3JtbHlDb25maWdcXCdzIGZpZWxkIHR5cGVzLicpO1xuICB9XG5cbiAgaWYgKHNob3VsZEhpZGUoZmllbGQsIG1vZGVsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGdldENvbXBvbmVudChmaWVsZENvbXBvbmVudCwgZmllbGQsIG1vZGVsLCBvblZhbHVlVXBkYXRlKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50KGZpZWxkQ29tcG9uZW50LCBmaWVsZCwgbW9kZWwsIG9uVmFsdWVVcGRhdGUpIHtcbiAgdmFyIGNvbXBvbmVudCA9IGZpZWxkQ29tcG9uZW50KHttb2RlbDogbW9kZWwsIGNvbmZpZzogZmllbGQsIG9uVmFsdWVVcGRhdGU6IG9uVmFsdWVVcGRhdGUsIGtleTogZmllbGQua2V5fSk7XG4gIGlmIChmaWVsZC5wcm9wcykge1xuICAgIHZhciBwcm9wcyA9IHR5cGVvZiBmaWVsZC5wcm9wcyA9PT0gJ2Z1bmN0aW9uJyA/IGZpZWxkLnByb3BzKG1vZGVsLCBmaWVsZCkgOiBmaWVsZC5wcm9wcztcbiAgICBjb21wb25lbnQgPSBSZWFjdC5hZGRvbnMuY2xvbmVXaXRoUHJvcHMoY29tcG9uZW50LCBtZXJnZShwcm9wcywge1xuICAgICAga2V5OiBjb21wb25lbnQucHJvcHMua2V5XG4gICAgfSkpO1xuICB9XG4gIHJldHVybiBjb21wb25lbnQ7XG59XG5cbmZ1bmN0aW9uIHNob3VsZEhpZGUoZmllbGQsIG1vZGVsKSB7XG4gIHZhciBoaWRlID0gaXNPckludm9rZShmaWVsZCwgJ2hpZGRlbicsIG1vZGVsKTtcbiAgcmV0dXJuIGhpZGUgJiYgaGlkZSAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNPckludm9rZShmaWVsZCwgcHJvcGVydHksIG1vZGVsKSB7XG4gIGlmICghZmllbGQuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKHR5cGVvZiBmaWVsZFtwcm9wZXJ0eV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmllbGRbcHJvcGVydHldKG1vZGVsLCBmaWVsZCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICEhZmllbGRbcHJvcGVydHldO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybWx5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9Gb3JtbHkuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBGaWVsZE1peGluID0ge1xuICBvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShldmVudC50YXJnZXQpO1xuICAgIHRoaXMudXBkYXRlVmFsdWUodmFsdWUpO1xuICB9LFxuICB1cGRhdGVWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodGhpcy50cmFuc2Zvcm1VcGRhdGUpIHtcbiAgICAgIHZhbHVlID0gdGhpcy50cmFuc2Zvcm1VcGRhdGUodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy5jb25maWcua2V5LCB2YWx1ZSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldFZhbHVlKG5vZGUpIHtcbiAgc3dpdGNoKG5vZGUudHlwZSkge1xuICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICBjYXNlICdyYWRpbyc6XG4gICAgICByZXR1cm4gbm9kZS5jaGVja2VkO1xuICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICByZXR1cm4gbm9kZS5zZWxlY3RlZDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG5vZGUudmFsdWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZE1peGluO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvbWl4aW5zL0ZpZWxkTWl4aW4uanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9