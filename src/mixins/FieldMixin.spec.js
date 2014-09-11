/** @jsx React.DOM */
'use strict';

var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var FieldMixin = require('./FieldMixin');
var FormlyConfig = require('../components/FormlyConfig');
var Formly = require('../components/Formly');

describe('FieldMixin', function FormlySpec() {
  var TextField;

  beforeEach(function() {

    TextField = React.createClass({
      mixins: [FieldMixin],
      transformUpdate: function(value) {
        return value.replace(/foo/g, 'bar');
      },
      render: function() {
        var model = this.props.model || {};
        var key = this.props.key || '';
        var value = '';
        if (model && key) {
          value = model[key];
        }
        return (
          <label ref="label">
            <input type="text" ref="input" name={key} value={value} onChange={this.onChange} />
          </label>
          );
      }
    });
  });

  describe('on its own', function() {
    var field;
    var input;
    var calls;

    beforeEach(function() {
      calls = {
        onValueUpdate: 0
      };

      function onValueUpdate() {
        calls.onValueUpdate++;
      }

      var config = {
        key: 'myKey'
      };

      field = TestUtils.renderIntoDocument(<TextField onValueUpdate={onValueUpdate} config={config} />);
      input = field.refs.input.getDOMNode();
    });

    it('should add onChange handler', function() {
      expect(field).to.have.property('onChange');
    });

    it('should call onValueUpdate when the onChange is called', function() {
      TestUtils.Simulate.change(input);
      expect(calls.onValueUpdate).to.equal(1);
    });
  });

  describe('with Formly', function() {
    var input;

    beforeEach(function() {
      FormlyConfig.fields.clearTypes();
      FormlyConfig.fields.addType('text', TextField);
      var config = {
        name: 'myFormly',
        fields: [
          { key: 'name', type: 'text' }
        ]
      };

      var App = React.createClass({
        getInitialState: function() {
          return { model: {} };
        },
        onFormlyUpdate: function(model) {
          this.setState({model: model});
        },
        render: function() {
          return (
            <div>
              <Formly config={config} model={this.state.model} onFormlyUpdate={this.onFormlyUpdate} />
            </div>
          );
        }
      });

      var form = TestUtils.renderIntoDocument(<App />);
      input = TestUtils.findRenderedDOMComponentWithTag(form, 'input').getDOMNode();
    });

    it('should transform the input value based on the components transformUpdate method', function() {
      input.value = 'foobar';
      TestUtils.Simulate.change(input);
      expect(input.value).to.equal('barbar');
    });
  });

});