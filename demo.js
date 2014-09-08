/** @jsx React.DOM */

var React = require('react');
var Formly = require('../index').Formly;

var config = {
  name: 'myFormly'
};

var App = React.createClass({
  getInitialState: function() {
    return {
      model: {}
    };
  },
  onFormlyUpdate: function(model) {
    this.setState({model: model});
    console.log(model);
  },
  render: function() {
    return (
      <div className="container">
        <h1>{this.props.greeting}</h1>
        <h2>Form</h2>
        <Formly config={config} model={this.state.model} onFormlyUpdate={this.onFormlyUpdate} />
        <h2>Model:</h2>
        <pre>{JSON.stringify(this.state.model, null, 2)}</pre>
      </div>
      );
  }
});


React.renderComponent(<App greeting="React-Formly" />, document.body);