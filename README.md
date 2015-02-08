# React Formly

[![build](https://travis-ci.org/formly-js/react-formly.svg)](https://travis-ci.org/formly-js/react-formly)

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

#### onFormlyUpdate

Called with the `model` anytime there's an update.

#### model

The model to represent with the form.

#### config

An object to configure formly. It is expected to have a `name` (string, optional) and `fields` (array of `field`). `fields` are expected to have a `key`, `type` / `component`, `hidden` (bool/func), `data`, (object), and `props` (object/func)

## FormlyConfig

### addType

```javascript
FormlyConfig.addType('name', require('./FieldType'));
FormlyConfig.addType({
  name: 'name',
  field: require('./FieldType')
});
FormlyConfig.addType([
  {
    name: 'name',
    field: require('./FieldType')
  },
  {
    name: 'secondName',
    field: require('./FieldType2')
  }
]);
```

### getTypes

```javascript
var FieldType = require('./FieldType');
FormlyConfig.addType('field1', FieldType);
FormlyConfig.getTypes().field1 === FieldType; // <-- true
```

### clearTypes

```javascript
var FieldType = require('./FieldType');
FormlyConfig.addType('field1', FieldType);
var oldTypes = FormlyConfig.clearTypes();
oldTypes.field1 === FieldType; // <-- true
FormlyConfig.getTypes().field1 === undefined; // <-- true
FormlyConfig.getTypes(); // <-- {}
```

## FieldMixin

Gives you 2 methods `onChange` and `updateValue`. `onChange` invokes `updateValue` with the current value. Handles special cases for `checkbox`, `radio`, and `select`. Defaults to `node.value` (input default). If your component has a `transformUpdate`, then it will be called with the value and the value will be reset to whatever is returned before it calls up to its parent (presumably the Formly component) with the new value.

# Contributing

Yes, please...

Just run `npm install` then run `gulp` to see a list of available tasks. 

# Credits

Based on the simple api from [angular-formly](https://github.com/formly-js/angular-formly)
 
# License
 
MIT
