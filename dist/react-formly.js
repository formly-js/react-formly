(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactFormly"] = factory(require("React"));
	else
		root["ReactFormly"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	
	var React = __webpack_require__(1);
	
	var Field = React.createClass({displayName: 'Field',
	  onChange: function(event) {
	    var value = event.target.value;
	    this.props.onValueUpdate(this.props.name, value);
	  },
	  render: function() {
	    var value = this.props.name;
	    var model = this.props.model;
	    return React.DOM.input({type: "text", value: model[value], onChange: this.onChange});
	  }
	});
	
	module.exports = Field;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	
	var React = __webpack_require__(1);
	var Field = __webpack_require__(2);
	
	var Formly = React.createClass({displayName: 'Formly',
	  onValueUpdate: function(fieldName, value) {
	    this.formly.model[fieldName] = value;
	    this.props.onFormlyUpdate(this.formly.model);
	  },
	
	  componentWillMount: function componentWillMount() {
	    this.formly = {
	      config: this.props.config,
	      model: this.props.model
	    };
	  },
	  render: function() {
	    var fieldName = 'myField';
	    return (
	      React.DOM.form({name: "{this.formly.config.name}"}, 
	        Field({name: fieldName, model: this.formly.model, onValueUpdate: this.onValueUpdate})
	      )
	      );
	  }
	});
	
	module.exports = Formly;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmMTQwYzJiNWRhZDBlMWYyMTJmYiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdFwiIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0ZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0Zvcm1seS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7Ozs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUE7O0FBRUE7O0FBRUEsZ0NBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsMkRBQTJEO0FBQ3ZGO0FBQ0EsRUFBQzs7QUFFRCx3Qjs7Ozs7O0FDaEJBOztBQUVBO0FBQ0E7O0FBRUEsaUNBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSx1QkFBc0IsUUFBUSx3QkFBd0IsRUFBRTtBQUN4RCxnQkFBZSw2RUFBNkU7QUFDNUY7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRCx5QiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIlJlYWN0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIlJlYWN0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlJlYWN0Rm9ybWx5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiUmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlJlYWN0Rm9ybWx5XCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmMTQwYzJiNWRhZDBlMWYyMTJmYlxuICoqLyIsIm1vZHVsZS5leHBvcnRzLkZvcm1seSA9IHJlcXVpcmUoJy4vc3JjL2NvbXBvbmVudHMvRm9ybWx5Jyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0ZpZWxkJyxcbiAgb25DaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLm5hbWUsIHZhbHVlKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnByb3BzLm5hbWU7XG4gICAgdmFyIG1vZGVsID0gdGhpcy5wcm9wcy5tb2RlbDtcbiAgICByZXR1cm4gUmVhY3QuRE9NLmlucHV0KHt0eXBlOiBcInRleHRcIiwgdmFsdWU6IG1vZGVsW3ZhbHVlXSwgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2V9KTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmllbGQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0ZpZWxkLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRmllbGQgPSByZXF1aXJlKCcuL0ZpZWxkJyk7XG5cbnZhciBGb3JtbHkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdGb3JtbHknLFxuICBvblZhbHVlVXBkYXRlOiBmdW5jdGlvbihmaWVsZE5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5mb3JtbHkubW9kZWxbZmllbGROYW1lXSA9IHZhbHVlO1xuICAgIHRoaXMucHJvcHMub25Gb3JtbHlVcGRhdGUodGhpcy5mb3JtbHkubW9kZWwpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuZm9ybWx5ID0ge1xuICAgICAgY29uZmlnOiB0aGlzLnByb3BzLmNvbmZpZyxcbiAgICAgIG1vZGVsOiB0aGlzLnByb3BzLm1vZGVsXG4gICAgfTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZmllbGROYW1lID0gJ215RmllbGQnO1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZm9ybSh7bmFtZTogXCJ7dGhpcy5mb3JtbHkuY29uZmlnLm5hbWV9XCJ9LCBcbiAgICAgICAgRmllbGQoe25hbWU6IGZpZWxkTmFtZSwgbW9kZWw6IHRoaXMuZm9ybWx5Lm1vZGVsLCBvblZhbHVlVXBkYXRlOiB0aGlzLm9uVmFsdWVVcGRhdGV9KVxuICAgICAgKVxuICAgICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybWx5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9Gb3JtbHkuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJyZWFjdC1mb3JtbHkuanMifQ==