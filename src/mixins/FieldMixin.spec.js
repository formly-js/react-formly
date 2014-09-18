/** @jsx React.DOM */
'use strict';

var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestFields = require('../../test/TestFields');
var TextField = TestFields.text;
var NumberField = TestFields.number;
var FormlyConfig = require('../modules/FormlyConfig');
var Formly = require('../components/Formly');

describe('FieldMixin', function FieldMixinSpec() {
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
          return <Formly config={config} model={this.state.model} onFormlyUpdate={this.onFormlyUpdate} />;
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

  describe('special cases', function() {
    var field;
    var input;
    beforeEach(function() {
      var config = {
        key: 'myKey'
      };

      function noop() {}

      field = TestUtils.renderIntoDocument(<NumberField onValueUpdate={noop} config={config} />);
      input = field.refs.input.getDOMNode();
    });

    it('should always set the value to the post-transformUpdate value', function() {
      input.value = 'hello world';
      TestUtils.Simulate.change(input);
      expect(input.value).to.equal('');
    });
  });

});