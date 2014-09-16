/** @jsx React.DOM */
'use strict';

var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestField = require('../../test/TestField');
var Formly = require('./Formly');
var FormlyConfig = require('./FormlyConfig');

describe('Formly', function FormlySpec() {
  var renderedFieldComponents;
  var renderedFieldInputs;
  var nameInput;
  var app;


  beforeEach(function() {
    FormlyConfig.fields.clearTypes();
    FormlyConfig.fields.addType('text', TestField);
    var config = {
      name: 'myFormly',
      fields: [
        { key: 'name', type: 'text' },
        { key: 'favoriteCandy', type: 'text' },
        { key: 'dogsName', type: 'text' },
        { key: 'catsName', type: 'text', hidden: true }
      ]
    };

    var App = React.createClass({
      getInitialState: function() {
        return { model: {} };
      },
      onFormlyUpdateCalled: 0,
      onFormlyUpdate: function(model) {
        this.setState({model: model});
        this.onFormlyUpdateCalled++;
      },
      render: function() {
        return <Formly config={config} model={this.state.model} onFormlyUpdate={this.onFormlyUpdate} />;
      }
    });

    app = TestUtils.renderIntoDocument(<App />);
    renderedFieldComponents = TestUtils.scryRenderedComponentsWithType(app, TestField);
    renderedFieldInputs = TestUtils.scryRenderedDOMComponentsWithTag(app, 'input');
    nameInput = renderedFieldInputs[0];
  });

  it('should render the non-hidden fields given in config', function() {
    expect(renderedFieldComponents).to.have.length(3);
  });

  it('should invoke onFormlyUpdate when a field is changed', function() {
    nameInput.value = 'Bing Crosby';
    TestUtils.Simulate.change(nameInput);
    expect(app.onFormlyUpdateCalled).to.equal(1);
  });

  it('should have a className of formly', function() {
    expect(app.getDOMNode().className).to.include('formly');
  });
});
