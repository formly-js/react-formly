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

  beforeEach(function() {
    FormlyConfig.fields.clearTypes();
    FormlyConfig.fields.addType('text', TestField);
    var config = {
      name: 'myFormly',
      fields: [
        { key: 'name', type: 'text' },
        { key: 'favoriteCandy', type: 'text' }
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
    renderedFieldComponents = TestUtils.scryRenderedComponentsWithType(form, TestField);
  });

  it('should render the fields given in config', function() {
    expect(renderedFieldComponents).to.have.length(2);
  });
});
