/** @jsx React.DOM */

var React = require('react');
var ReactFormly = require('../index');
var Formly = ReactFormly.Formly;
var FormlyConfig = ReactFormly.FormlyConfig;

FormlyConfig.fields.addType([
  { name: 'text', field: require('./field-types/TextField') },
  { name: 'number', field: require('./field-types/NumberField') }
]);

var App = React.createClass({displayName: 'App',
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
      React.DOM.div({className: "container"},
        React.DOM.h1(null, this.props.greeting),
        React.DOM.h2(null, "Form"),

        Formly({config: this.formly.config, model: this.state.model, onFormlyUpdate: this.onFormlyUpdate}),
        React.DOM.h2(null, "Model:"),
        React.DOM.pre(null, JSON.stringify(this.state.model, null, 2))
      )
      );
  }
});


React.renderComponent(App({greeting: "React-Formly"}), document.body);