/** @jsx React.DOM */

var React = require('react');
var ReactFormly = require('../index');
var Formly = ReactFormly.Formly;
var FormlyConfig = ReactFormly.FormlyConfig;

var BuildBadge = require('./components/build-badge');

FormlyConfig.fields.addType([
  { name: 'text', field: require('./components/field-types/TextField') },
  { name: 'number', field: require('./components/field-types/NumberField') },
  { name: 'checkbox', field: require('./components/field-types/Checkbox') }
]);

var App = React.createClass({
  getInitialState: function() {
    return {
      model: {
        age: 26
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
          key: 'name',
          type: 'text',
          label: 'Name',
          placeholder: 'If you would be so kind...',
          hidden: function(model) {
            return !!model.secretName;
          }
        },
        {
          key: 'age',
          type: 'number',
          label: 'Age'
        },
        {
          key: 'secretName',
          type: 'text',
          label: 'Secret name...?',
          placeholder: 'If you have no name...',
          hidden: function(model) {
            return !!model.name;
          }
        },
        {
          key: 'awesome',
          type: 'checkbox',
          label: 'Are you awesome?'
        }
      ]
    };
  },
  render: function() {
    return (
      <div className="container">
        <h1>
          <a href="http://github.com/kentcdodds/react-formly">React-Formly</a>
          <small>JSON powered forms for <a href="http://facebook.github.io/react/">React</a></small>
        </h1>
        <BuildBadge owner="kentcdodds" repo="react-formly" />

        <h2>Form</h2>
        <Formly config={this.formlyConfig} model={this.state.model} onFormlyUpdate={this.onFormlyUpdate} />
        <h2>Model:</h2>
        <pre>{JSON.stringify(this.state.model, null, 2)}</pre>
      </div>
    );
  }
});

React.renderComponent(<App />, document.body);