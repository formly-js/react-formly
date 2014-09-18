var utils = {
  PropTypes: {
    objectWith: function(options) {
      return objectWithFn(options, false);
    }
  }
};

utils.PropTypes.objectWith.isRequired = function(options) {
  return objectWithFn(options, true);
};

module.exports = utils;

function objectWithFn(options, isRequired) {
  return function(props, propName, componentName) {
    var componentProp = props[propName];
    var errorMessage = '';
    if (!isRequired && !componentProp) {
      return;
    } else if (isRequired && !componentProp) {
      errorMessage = 'Required prop `' + propName + '` was not specified in `' + componentName + '`.';
    } else {
      var errors = {
        missing: [],
        extra: []
      };
      for (var prop in options) {
        var shouldBePresent = options[prop];
        var hasProp = componentProp.hasOwnProperty(prop);
        if (!shouldBePresent && hasProp) {
          errors.extra.push(prop);
        } else if (shouldBePresent && !hasProp) {
          errors.missing.push(prop);
        }
      }
      var missingSome = !!errors.missing.length;
      var badExtras = !!errors.extra.length;
      if (missingSome || badExtras) {
        errorMessage = 'Prop `' + propName + '` in `' + componentName + '` has some invalid properties: ';
      }
      if (errors.missing.length) {
        errorMessage += 'should have ' + JSON.stringify(errors.missing);
      }
      if (missingSome && badExtras) {
        errorMessage += ' and ';
      }
      if (errors.extra.length) {
        errorMessage += 'should not have ' + JSON.stringify(errors.extra);
      }
    }
    if (errorMessage) {
      return new Error(errorMessage);
    }
  }
}