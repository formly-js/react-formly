/** @jsx React.DOM */
'use strict';

var expect = require('chai').expect;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestField = require('../../test/TestFields').text;
var Formly = require('./Formly');
var FormlyConfig = require('./../modules/FormlyConfig');

describe('Formly', function FormlySpec() {
  var renderedFieldComponents;
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
        { key: 'catsName', type: 'text', hidden: true },
        { key: 'caterpillersName', type: 'text', hidden: function(model) {
          return model.name === 'George Foreman';
        } }
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
  });

  it('should render the non-hidden fields given in config', function() {
    expect(renderedFieldComponents).to.have.length(4);
  });

  it('should invoke onFormlyUpdate when a field is changed', function() {
    var renderedFieldInputs = TestUtils.scryRenderedDOMComponentsWithTag(app, 'input');
    var nameInput = renderedFieldInputs[0];
    nameInput.getDOMNode().value = 'Bing Crosby';
    TestUtils.Simulate.change(nameInput);
    expect(app.onFormlyUpdateCalled).to.equal(1);

  });

  it('should have a className of formly', function() {
    expect(app.getDOMNode().className).to.include('formly');
  });

  it('should hide fields whose hidden functions return true', function() {
    var renderedFieldInputs = TestUtils.scryRenderedDOMComponentsWithTag(app, 'input');
    var nameInput = renderedFieldInputs[0];
    nameInput.getDOMNode().value = 'George Foreman';
    TestUtils.Simulate.change(nameInput);
    var newRenderedComponents = TestUtils.scryRenderedDOMComponentsWithTag(app, 'input');
    expect(newRenderedComponents).to.have.length(3);
  });
});
