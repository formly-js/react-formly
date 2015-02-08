/** @jsx React.DOM */

var React = require('react');
var ReactFormly = require('../index');
var Formly = ReactFormly.Formly;
var FormlyConfig = ReactFormly.FormlyConfig;

var BuildBadge = require('./components/build-badge');

FormlyConfig.fields.addType([
  { name: 'text', field: require('./components/field-types/TextField') },
  { name: 'number', field: require('./components/field-types/NumberField') },
  { name: 'checkbox', field: require('./components/field-types/Checkbox') },
  { name: 'select', field: require('./components/field-types/Select') },
  { name: 'simplerender', field: require('./components/field-types/SimpleRender') }
]);

var App = React.createClass({
  getInitialState: function() {
    return {
      model: {
        buildingWithReact: true
      }
    };
  },
  onFormlyUpdate: function(model) {
    this.setState({model: model});
  },
  componentWillMount: function() {
    this.formlyConfig = {
      name: 'myFormly',
      fields: [
        {
          key: 'initialInstructions',
          type: 'simplerender',
          props: {
            contents: (
              <div>
                Discover React Formly by going through this form...
                <br />
                <small>Guess what... This text is a non-value "field"</small>
              </div>
            )
          }
        },
        {
          key: 'buildingWithReact',
          type: 'checkbox',
          data: {
            label: 'Are you building something with React?'
          }
        },
        {
          key: 'otherFrameworkOrLibrary',
          type: 'select',
          data: {
            label: 'What are you building with?',
            options: [
              { name: 'VanillaJS', value: 'vanilla' },
              { name: 'jQuery', value: 'jquery' },
              { name: 'Ember', value: 'ember' },
              { name: 'Angular', value: 'angular' },
              { name: 'Backbone', value: 'backbone' },
              { name: 'Other', value: 'other' }
            ]
          },
          hidden: function(model) {
            return !!model.buildingWithReact;
          }
        },
        {
          key: 'buildingWithAnotherFrameworkOrLibrary',
          type: 'simplerender',
          props: getPropsForOtherFramework,
          hidden: function(model) {
            return !!model.buildingWithReact;
          }
        }
      ]
    };
  },
  render: function() {
    return (
      <div className="container">
        <h1>
          <a href="http://github.com/formly-js/react-formly">React-Formly</a>
          <small>JSON powered forms for <a href="http://facebook.github.io/react/">React</a></small>
        </h1>
        <BuildBadge owner="formly-js" repo="react-formly" />

        <h2>Form</h2>
        <Formly config={this.formlyConfig} model={this.state.model} onFormlyUpdate={this.onFormlyUpdate} />
        <h2>Model:</h2>
        <pre>{JSON.stringify(this.state.model, null, 2)}</pre>
      </div>
    );
  }
});

React.renderComponent(<App />, document.body);

// UTILS

function getPropsForOtherFramework(model, field) {
  switch (model.otherFrameworkOrLibrary) {
    case 'angular':
      return {
        contents: (
          <div>
            This project was created by a core contributor to
            the <a href="https://github.com/nimbly/angular-formly">angular-formly</a> project.
            If you're building things with angular, definitely check that one out.
          </div>
        )
      };
    case 'ember':
      return {
        contents: (
          <div>
            I've heard <a href="https://github.com/dockyard/ember-easyForm">ember-easyForm</a>
            is a good project. You could also look
            at <a href="https://github.com/indexiatech/ember-forms">ember-forms</a>
          </div>
        )
      };
    case 'backbone':
      return {
        contents: (
          <div>
            Give a look at <a href="https://github.com/powmedia/backbone-forms">backbone-forms</a>.
          </div>
        )
      };
    case 'other':
      return {
        contents: (
          <div>Best of luck to you...</div>
        )
      };
    case 'jquery':
      return {
        contents: (
          <div>
            Check out <a href="http://www.alpacajs.org/">Alpaca</a>
          </div>
        )
      };
    case 'vanilla':
      return {
        contents: (
          <div>
            Not sure whether there's something quite like this for you,
            but <a href="http://parsleyjs.org/">Parsley</a> looks like a promising
            dependency free form validation library
          </div>
        )
      };
  }
}
