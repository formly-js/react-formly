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
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	var React = __webpack_require__(4);
	var FormlyConfig = __webpack_require__(1);
	
	function typeOrComponent(props, propName, componentName) {
	  var errorPrefix = componentName + ' config.fields field with key ' + props.key;
	  if (props.type && props.component) {
	    return new Error(errorPrefix + ' should only have either a type or a component, not both.');
	  } else if (!props.type && !props.component) {
	    return new Error(errorPrefix + ' should have either a type (string) or a component (React component)');
	  }
	}
	
	var Formly = React.createClass({displayName: "Formly",
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
	    return React.createElement("form", {className: "formly", role: "form", name: this.props.config.name}, fields);
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
	
	  var componentProps;
	  if (field.props) {
	    componentProps = typeof field.props === 'function' ? field.props(model, field) : field.props;
	  }
	
	  //assign to variable to allow JSX compiler to pick up as a prop instead of string
	  var FieldComponent = fieldComponent;
	  var component = React.createElement(FieldComponent, React.__spread({},  componentProps, {model: model, config: field, onValueUpdate: onValueUpdate, key: field.key}));
	
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
/* 3 */
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwNmJiYWYyYjg5MjYwNjhkNDRkMSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9Gb3JtbHlDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRm9ybWx5LmpzIiwid2VicGFjazovLy8uL3NyYy9taXhpbnMvRmllbGRNaXhpbi5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDRkEsYUFBWSxDQUFDOztBQUViLEtBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQzs7QUFFdEIsT0FBTSxDQUFDLE9BQU8sR0FBRztHQUNmLE1BQU0sRUFBRTtLQUNOLE9BQU8sRUFBRSxZQUFZO0tBQ3JCLFFBQVEsRUFBRSxhQUFhO0tBQ3ZCLFVBQVUsRUFBRSxVQUFVO0lBQ3ZCO0FBQ0gsRUFBQyxDQUFDOztBQUVGLFVBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7R0FDakMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO0tBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxTQUFTLEVBQUU7T0FDL0IsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO01BQ3pCLENBQUMsQ0FBQztJQUNKLE1BQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7S0FDbkMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDbkIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbEI7R0FDRCxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQzdCLEVBQUM7O0FBRUQsVUFBUyxhQUFhLEdBQUc7R0FDdkIsT0FBTyxZQUFZLENBQUM7QUFDdEIsRUFBQzs7QUFFRCxVQUFTLFVBQVUsR0FBRztHQUNwQixJQUFJLFFBQVEsR0FBRyxZQUFZLENBQUM7R0FDNUIsWUFBWSxHQUFHLEVBQUUsQ0FBQztHQUNsQixPQUFPLFFBQVEsQ0FBQzs7Ozs7OztBQy9CbEIsc0JBQXFCO0FBQ3JCLGFBQVksQ0FBQzs7QUFFYixLQUFJLEtBQUssR0FBRyxtQkFBTyxDQUFDLENBQU8sQ0FBQyxDQUFDO0FBQzdCLEtBQUksWUFBWSxHQUFHLG1CQUFPLENBQUMsQ0FBMkIsQ0FBQyxDQUFDOztBQUV4RCxVQUFTLGVBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTtHQUN2RCxJQUFJLFdBQVcsR0FBRyxhQUFhLEdBQUcsZ0NBQWdDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztHQUMvRSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtLQUNqQyxPQUFPLElBQUksS0FBSyxDQUFDLFdBQVcsR0FBRywyREFBMkQsQ0FBQyxDQUFDO0lBQzdGLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO0tBQzFDLE9BQU8sSUFBSSxLQUFLLENBQUMsV0FBVyxHQUFHLHNFQUFzRSxDQUFDLENBQUM7SUFDeEc7QUFDSCxFQUFDOztBQUVELEtBQUksNEJBQTRCO0dBQzlCLFNBQVMsRUFBRTtLQUNULGNBQWMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVO0tBQy9DLE1BQU0sRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztPQUM1QixJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO09BQzVCLE1BQU0sRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNwRCxHQUFHLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtTQUN0QyxJQUFJLEVBQUUsZUFBZTtTQUNyQixTQUFTLEVBQUUsZUFBZTtTQUMxQixNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7V0FDaEMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJO1dBQ3BCLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSTtVQUNyQixDQUFDO1NBQ0YsS0FBSyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1dBQy9CLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtXQUN0QixLQUFLLENBQUMsU0FBUyxDQUFDLElBQUk7VUFDckIsQ0FBQztTQUNGLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07UUFDN0IsQ0FBQyxDQUFDO01BQ0osQ0FBQztLQUNGLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07QUFDakMsSUFBRzs7R0FFRCxlQUFlLEVBQUUsV0FBVztLQUMxQixPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ3pCLElBQUc7O0dBRUQsYUFBYSxFQUFFLFNBQVMsUUFBUSxFQUFFLEtBQUssRUFBRTtLQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7S0FDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxJQUFHOztHQUVELE1BQU0sRUFBRSxXQUFXO0tBQ2pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQzdCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDdkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEtBQUssRUFBRTtPQUN4RCxPQUFPLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7TUFDdEQsQ0FBQyxDQUFDO0tBQ0gsT0FBTywwQkFBSyxJQUFDLFdBQVMsQ0FBQyxVQUFRLENBQUMsTUFBSSxDQUFDLFFBQU0sQ0FBQyxNQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBTSxHQUFDLEVBQWU7SUFDM0Y7QUFDSCxFQUFDLENBQUMsQ0FBQzs7QUFFSCxVQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO0dBQ3JELElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNwRyxJQUFJLENBQUMsY0FBYyxFQUFFO0tBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsc0RBQXNELENBQUMsQ0FBQztBQUN2RyxJQUFHOztHQUVELElBQUksVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtLQUM1QixPQUFPLElBQUksQ0FBQztBQUNoQixJQUFHOztHQUVELE9BQU8sWUFBWSxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ25FLEVBQUM7O0FBRUQsVUFBUyxZQUFZLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFOztHQUVqRSxJQUFJLGNBQWMsQ0FBQztHQUNuQixJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7S0FDZixjQUFjLEdBQUcsT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0FBQ2pHLElBQUc7QUFDSDs7R0FFRSxJQUFJLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDdEMsR0FBRSxJQUFJLFNBQVMsR0FBRyxvQkFBQyxjQUFjLHNCQUFFLEdBQUcsY0FBYyxFQUFDLENBQUMsUUFBSyxDQUFFLEtBQU0sQ0FBQyxRQUFNLENBQUUsS0FBTSxDQUFDLGVBQWEsQ0FBRSxhQUFjLENBQUMsS0FBRyxDQUFFLEtBQUssQ0FBQyxFQUFROztHQUVsSSxPQUFPLFNBQVMsQ0FBQztBQUNuQixFQUFDOztBQUVELFVBQVMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7R0FDaEMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDOUMsT0FBTyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQztBQUMvQixFQUFDOztBQUVELFVBQVMsVUFBVSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO0dBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0tBQ25DLE9BQU8sSUFBSSxDQUFDO0lBQ2I7R0FDRCxJQUFJLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLFVBQVUsRUFBRTtLQUN6QyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEMsTUFBTTtLQUNMLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQjtBQUNILEVBQUM7O0FBRUQsT0FBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLEM7Ozs7OztBQ3BHdkIsYUFBWSxDQUFDOztBQUViLEtBQUksVUFBVSxHQUFHO0dBQ2YsUUFBUSxFQUFFLFNBQVMsS0FBSyxFQUFFO0tBQ3hCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QjtHQUNELFdBQVcsRUFBRSxTQUFTLEtBQUssRUFBRTtLQUMzQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7T0FDeEIsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7TUFDckM7S0FDRCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEQ7QUFDSCxFQUFDLENBQUM7O0FBRUYsVUFBUyxRQUFRLENBQUMsSUFBSSxFQUFFO0dBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUk7S0FDZCxLQUFLLFVBQVUsQ0FBQztLQUNoQixLQUFLLE9BQU87T0FDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDdEIsS0FBSyxRQUFRO09BQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3ZCO09BQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3JCO0FBQ0gsRUFBQzs7QUFFRCxPQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQzs7Ozs7O0FDM0IzQixnRCIsImZpbGUiOiJyZWFjdC1mb3JtbHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJSZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdEZvcm1seVwiXSA9IGZhY3RvcnkocmVxdWlyZShcIlJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdEZvcm1seVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwNmJiYWYyYjg5MjYwNjhkNDRkMVxuICoqLyIsIm1vZHVsZS5leHBvcnRzLkZvcm1seSA9IHJlcXVpcmUoJy4vc3JjL2NvbXBvbmVudHMvRm9ybWx5Jyk7XG5tb2R1bGUuZXhwb3J0cy5GaWVsZE1peGluID0gcmVxdWlyZSgnLi9zcmMvbWl4aW5zL0ZpZWxkTWl4aW4nKTtcbm1vZHVsZS5leHBvcnRzLkZvcm1seUNvbmZpZyA9IHJlcXVpcmUoJy4vc3JjL21vZHVsZXMvRm9ybWx5Q29uZmlnJyk7XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZpZWxkVHlwZU1hcCA9IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZmllbGRzOiB7XG4gICAgYWRkVHlwZTogYWRkRmllbGRUeXBlLFxuICAgIGdldFR5cGVzOiBnZXRGaWVsZFR5cGVzLFxuICAgIGNsZWFyVHlwZXM6IGNsZWFyVHlwZXNcbiAgfVxufTtcblxuZnVuY3Rpb24gYWRkRmllbGRUeXBlKG5hbWUsIGZpZWxkKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG5hbWUpKSB7XG4gICAgbmFtZS5mb3JFYWNoKGZ1bmN0aW9uKGZpZWxkVHlwZSkge1xuICAgICAgYWRkRmllbGRUeXBlKGZpZWxkVHlwZSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgZmllbGQgPSBuYW1lLmZpZWxkO1xuICAgIG5hbWUgPSBuYW1lLm5hbWU7XG4gIH1cbiAgZmllbGRUeXBlTWFwW25hbWVdID0gZmllbGQ7XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkVHlwZXMoKSB7XG4gIHJldHVybiBmaWVsZFR5cGVNYXA7XG59XG5cbmZ1bmN0aW9uIGNsZWFyVHlwZXMoKSB7XG4gIHZhciBvbGRUeXBlcyA9IGZpZWxkVHlwZU1hcDtcbiAgZmllbGRUeXBlTWFwID0ge307XG4gIHJldHVybiBvbGRUeXBlcztcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tb2R1bGVzL0Zvcm1seUNvbmZpZy5qc1xuICoqLyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEZvcm1seUNvbmZpZyA9IHJlcXVpcmUoJy4vLi4vbW9kdWxlcy9Gb3JtbHlDb25maWcnKTtcblxuZnVuY3Rpb24gdHlwZU9yQ29tcG9uZW50KHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICB2YXIgZXJyb3JQcmVmaXggPSBjb21wb25lbnROYW1lICsgJyBjb25maWcuZmllbGRzIGZpZWxkIHdpdGgga2V5ICcgKyBwcm9wcy5rZXk7XG4gIGlmIChwcm9wcy50eXBlICYmIHByb3BzLmNvbXBvbmVudCkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoZXJyb3JQcmVmaXggKyAnIHNob3VsZCBvbmx5IGhhdmUgZWl0aGVyIGEgdHlwZSBvciBhIGNvbXBvbmVudCwgbm90IGJvdGguJyk7XG4gIH0gZWxzZSBpZiAoIXByb3BzLnR5cGUgJiYgIXByb3BzLmNvbXBvbmVudCkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoZXJyb3JQcmVmaXggKyAnIHNob3VsZCBoYXZlIGVpdGhlciBhIHR5cGUgKHN0cmluZykgb3IgYSBjb21wb25lbnQgKFJlYWN0IGNvbXBvbmVudCknKTtcbiAgfVxufVxuXG52YXIgRm9ybWx5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBwcm9wVHlwZXM6IHtcbiAgICBvbkZvcm1seVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjb25maWc6IFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgZmllbGRzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBrZXk6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgdHlwZTogdHlwZU9yQ29tcG9uZW50LFxuICAgICAgICBjb21wb25lbnQ6IHR5cGVPckNvbXBvbmVudCxcbiAgICAgICAgaGlkZGVuOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgICAgICBdKSxcbiAgICAgICAgcHJvcHM6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbiAgICAgICAgXSksXG4gICAgICAgIGRhdGE6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RcbiAgICAgIH0pKVxuICAgIH0pLFxuICAgIG1vZGVsOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geyBtb2RlbDoge30gfTtcbiAgfSxcblxuICBvblZhbHVlVXBkYXRlOiBmdW5jdGlvbihmaWVsZEtleSwgdmFsdWUpIHtcbiAgICB0aGlzLnByb3BzLm1vZGVsW2ZpZWxkS2V5XSA9IHZhbHVlO1xuICAgIHRoaXMucHJvcHMub25Gb3JtbHlVcGRhdGUodGhpcy5wcm9wcy5tb2RlbCk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbW9kZWwgPSB0aGlzLnByb3BzLm1vZGVsO1xuICAgIHZhciBvblZhbHVlVXBkYXRlID0gdGhpcy5vblZhbHVlVXBkYXRlO1xuICAgIHZhciBmaWVsZHMgPSB0aGlzLnByb3BzLmNvbmZpZy5maWVsZHMubWFwKGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICByZXR1cm4gZ2VuZXJhdGVGaWVsZFRhZyhmaWVsZCwgbW9kZWwsIG9uVmFsdWVVcGRhdGUpO1xuICAgIH0pO1xuICAgIHJldHVybiA8Zm9ybSBjbGFzc05hbWU9XCJmb3JtbHlcIiByb2xlPVwiZm9ybVwiIG5hbWU9e3RoaXMucHJvcHMuY29uZmlnLm5hbWV9PntmaWVsZHN9PC9mb3JtPjtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRmllbGRUYWcoZmllbGQsIG1vZGVsLCBvblZhbHVlVXBkYXRlKSB7XG4gIHZhciBmaWVsZENvbXBvbmVudCA9IGZpZWxkLmNvbXBvbmVudCA/IGZpZWxkLmNvbXBvbmVudCA6IEZvcm1seUNvbmZpZy5maWVsZHMuZ2V0VHlwZXMoKVtmaWVsZC50eXBlXTtcbiAgaWYgKCFmaWVsZENvbXBvbmVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRm9ybWx5OiBcIicgKyBmaWVsZC50eXBlICsgJ1wiIGhhcyBub3QgYmVlbiBhZGRlZCB0byBGb3JtbHlDb25maWdcXCdzIGZpZWxkIHR5cGVzLicpO1xuICB9XG5cbiAgaWYgKHNob3VsZEhpZGUoZmllbGQsIG1vZGVsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGdldENvbXBvbmVudChmaWVsZENvbXBvbmVudCwgZmllbGQsIG1vZGVsLCBvblZhbHVlVXBkYXRlKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50KGZpZWxkQ29tcG9uZW50LCBmaWVsZCwgbW9kZWwsIG9uVmFsdWVVcGRhdGUpIHtcblxuICB2YXIgY29tcG9uZW50UHJvcHM7XG4gIGlmIChmaWVsZC5wcm9wcykge1xuICAgIGNvbXBvbmVudFByb3BzID0gdHlwZW9mIGZpZWxkLnByb3BzID09PSAnZnVuY3Rpb24nID8gZmllbGQucHJvcHMobW9kZWwsIGZpZWxkKSA6IGZpZWxkLnByb3BzO1xuICB9XG5cbiAgLy9hc3NpZ24gdG8gdmFyaWFibGUgdG8gYWxsb3cgSlNYIGNvbXBpbGVyIHRvIHBpY2sgdXAgYXMgYSBwcm9wIGluc3RlYWQgb2Ygc3RyaW5nXG4gIHZhciBGaWVsZENvbXBvbmVudCA9IGZpZWxkQ29tcG9uZW50O1xuICB2YXIgY29tcG9uZW50ID0gPEZpZWxkQ29tcG9uZW50IHsuLi5jb21wb25lbnRQcm9wc30gbW9kZWw9e21vZGVsfSBjb25maWc9e2ZpZWxkfSBvblZhbHVlVXBkYXRlPXtvblZhbHVlVXBkYXRlfSBrZXk9e2ZpZWxkLmtleX0gLz47XG5cbiAgcmV0dXJuIGNvbXBvbmVudDtcbn1cblxuZnVuY3Rpb24gc2hvdWxkSGlkZShmaWVsZCwgbW9kZWwpIHtcbiAgdmFyIGhpZGUgPSBpc09ySW52b2tlKGZpZWxkLCAnaGlkZGVuJywgbW9kZWwpO1xuICByZXR1cm4gaGlkZSAmJiBoaWRlICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc09ySW52b2tlKGZpZWxkLCBwcm9wZXJ0eSwgbW9kZWwpIHtcbiAgaWYgKCFmaWVsZC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAodHlwZW9mIGZpZWxkW3Byb3BlcnR5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmaWVsZFtwcm9wZXJ0eV0obW9kZWwsIGZpZWxkKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gISFmaWVsZFtwcm9wZXJ0eV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb3JtbHk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29tcG9uZW50cy9Gb3JtbHkuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBGaWVsZE1peGluID0ge1xuICBvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShldmVudC50YXJnZXQpO1xuICAgIHRoaXMudXBkYXRlVmFsdWUodmFsdWUpO1xuICB9LFxuICB1cGRhdGVWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodGhpcy50cmFuc2Zvcm1VcGRhdGUpIHtcbiAgICAgIHZhbHVlID0gdGhpcy50cmFuc2Zvcm1VcGRhdGUodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy5jb25maWcua2V5LCB2YWx1ZSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldFZhbHVlKG5vZGUpIHtcbiAgc3dpdGNoKG5vZGUudHlwZSkge1xuICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICBjYXNlICdyYWRpbyc6XG4gICAgICByZXR1cm4gbm9kZS5jaGVja2VkO1xuICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgICByZXR1cm4gbm9kZS5zZWxlY3RlZDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG5vZGUudmFsdWU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWVsZE1peGluO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21peGlucy9GaWVsZE1peGluLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiUmVhY3RcIlxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=