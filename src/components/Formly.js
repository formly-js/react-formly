/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var merge = require('react/lib/merge');
var FormlyConfig = require('./../modules/FormlyConfig');

function typeOrComponent(props, propName, componentName) {
  var errorPrefix = componentName + ' config.fields field with key ' + props.key;
  if (props.type && props.component) {
    return new Error(errorPrefix + ' should only have either a type or a component, not both.');
  } else if (!props.type && !props.component) {
    return new Error(errorPrefix + ' should have either a type (string) or a component (React component)');
  }
}

var Formly = React.createClass({
  propTypes: {
    onFormlyUpdate: React.PropTypes.func.isRequired,
    config: React.PropTypes.shape({
      name: React.PropTypes.string,
      fields: React.PropTypes.arrayOf(React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        type: typeOrComponent,
        component: typeOrComponent,
        hidden: React.PropTypes.oneOfType([
          React.PropTypes.bool,
          React.PropTypes.func
        ]),
        props: React.PropTypes.oneOfType([
          React.PropTypes.object,
          React.PropTypes.func
        ]),
        data: React.PropTypes.object
      }))
    }),
    model: React.PropTypes.object
  },

  getDefaultProps: function() {
    return { model: {} };
  },

  onValueUpdate: function(fieldKey, value) {
    this.props.model[fieldKey] = value;
    this.props.onFormlyUpdate(this.props.model);
  },

  render: function() {
    var model = this.props.model;
    var onValueUpdate = this.onValueUpdate;
    var fields = this.props.config.fields.map(function(field) {
      return generateFieldTag(field, model, onValueUpdate);
    });
    return <form className="formly" role="form" name={this.props.config.name}>{fields}</form>;
  }
});

function generateFieldTag(field, model, onValueUpdate) {
  var fieldComponent = field.component ? field.component : FormlyConfig.fields.getTypes()[field.type];
  if (!fieldComponent) {
    throw new Error('Formly: "' + field.type + '" has not been added to FormlyConfig\'s field types.');
  }

  if (shouldHide(field, model)) {
    return null;
  }

  return getComponent(fieldComponent, field, model, onValueUpdate);
}

function getComponent(fieldComponent, field, model, onValueUpdate) {
  var component = <fieldComponent model={model} config={field} onValueUpdate={onValueUpdate} key={field.key} />;
  if (field.props) {
    var props = typeof field.props === 'function' ? field.props(model, field) : field.props;
    component = React.addons.cloneWithProps(component, merge(props, {
      key: component.props.key
    }));
  }
  return component;
}

function shouldHide(field, model) {
  var hide = isOrInvoke(field, 'hidden', model);
  return hide && hide !== null;
}

function isOrInvoke(field, property, model) {
  if (!field.hasOwnProperty(property)) {
    return null;
  }
  if (typeof field[property] === 'function') {
    return field[property](model, field);
  } else {
    return !!field[property];
  }
}

module.exports = Formly;