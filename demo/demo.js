/** @jsx React.DOM */

var React = require('react');
var ReactFormly = require('../index');
var Formly = ReactFormly.Formly;
var FormlyConfig = ReactFormly.FormlyConfig;

FormlyConfig.fields.addType([
  { name: 'text', field: require('./field-types/TextField') },
  { name: 'number', field: require('./field-types/NumberField') }
]);

var App = React.createClass({
  getInitialState: function() {
    return {
      model: {}
    };
  },
  onFormlyUpdate: function(model) {
    this.setState({model: model});
  },
  componentWillMount: function() {
    this.formly = {};
    this.formly.config = {
      name: 'myFormly',
      fields: [
        {
          key: 'name',
          type: 'text',
          label: 'Name'
        },
        {
          key: 'age',
          type: 'number',
          label: 'Age',
          isHidden: function(model) {
            return !model.name;
          }
        }
      ]
    };
  },
  render: function() {
    return (
      <div className="container">
        <h1>{this.props.greeting}</h1>
        <h2>Form</h2>

        <Formly config={this.formly.config} model={this.state.model} onFormlyUpdate={this.onFormlyUpdate} />
        <h2>Model:</h2>
        <pre>{JSON.stringify(this.state.model, null, 2)}</pre>
      </div>
    );
  }
});

React.renderComponent(<App greeting="React-Formly" />, document.body);