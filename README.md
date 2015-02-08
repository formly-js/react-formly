# React Formly

[![build](https://travis-ci.org/kentcdodds/react-formly.svg)](https://travis-ci.org/kentcdodds/react-formly)

**JSON powered forms for react.**

[Demo](http://formly-js.github.io/react-formly)

## Example Usage

```javascript
// add custom field types
FormlyConfig.fields.addType([
  { name: 'text', field: require('./components/field-types/TextField') },
  { name: 'number', field: require('./components/field-types/NumberField') },
  { name: 'checkbox', field: require('./components/field-types/Checkbox') }
]);

var App = React.createClass({
  getInitialState: function() {
    return { model: {} };
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
        <h2>Form</h2>
        <Formly config={this.formlyConfig} model={this.state.model} onFormlyUpdate={this.onFormlyUpdate} />

        <h2>Model:</h2>
        <pre>{JSON.stringify(this.state.model, null, 2)}</pre>
      </div>
    );
  }
});

React.renderComponent(<App />, document.body);
```

## Formly

### API

#### config

An object to configure formly. It is expected to have

## FormlyConfig


## FieldMixin



# Contributing

Yes, please...

Just run `npm install` then run `gulp` to see a list of available tasks. 

# Credits

Based on the simple api from [angular-formly](https://github.com/nimbly/angular-formly)
 
# License
 
MIT
