var expect = require('chai').expect;
var utils = require('./utils');

describe('utils', function UtilsSpec() {

  describe('PropTypes', function() {
    var propName = 'myProp';
    var componentName = 'MyComponent';
    var props = {
      empty: {},
      valid: { myProp: {
        foo: 'present',
        baz: 'present',
        other: 'present'
      } },
      invalidMissing: { myProp: {
        missing: 'other props'
      } },
      invalidExtra: { myProp: {
        bar: 'should not be here',
        foobar: 'should not be here either'
      } },
      invalidBoth: { myProp: {
        bar: 'should not be here',
        foobar: 'should not be here either',
        missing: 'other props'
      } }
    };

    var options = {
      foo: true,
      bar: false,
      baz: true,
      foobar: false
    };

    describe('basic', function() {
      var validator = utils.PropTypes.objectWith(options);
      it('should pass when prop not present', function() {
        var error = validator(props.empty, propName, componentName);
        expect(error).to.be.undefined;
      });

      it('should pass when prop is valid', function() {
        var error = validator(props.valid, propName, componentName);
        expect(error).to.be.undefined;
      });

      it('should fail with "missing" message when prop is invalid because of missing properties', function() {
        var error = validator(props.invalidMissing, propName, componentName);
        expectPropName(error.message);
        expectComponentName(error.message);
        expectInvalidMissing(error.message);
      });

      it('should fail with "extra" message when prop is invalid because of extra properties', function() {
        var error = validator(props.invalidExtra, propName, componentName);
        expectPropName(error.message);
        expectComponentName(error.message);
        expectInvalidExtra(error.message);
      });

      it('should fail with "extra" and "missing" message when invalid because of extra and missing properties', function() {
        var error = validator(props.invalidBoth, propName, componentName);
        expectPropName(error.message);
        expectComponentName(error.message);
        expectInvalidExtra(error.message);
        expectInvalidMissing(error.message);
      });
    });

    describe('required', function() {
      var validator = utils.PropTypes.objectWith.isRequired(options);

      it('should fail when prop not present', function() {
        var error = validator(props.empty, propName, componentName);
        expectPropName(error.message);
        expectComponentName(error.message);
        expect(error.message).to.have.string('Required');
      });
    });

    // UTILS FUNCTIONS

    function expectPropName(message) {
      expect(message).to.have.string(propName);
    }

    function expectComponentName(message) {
      expect(message).to.have.string(componentName);
    }

    function expectInvalidMissing(message) {
      expect(message).to.have.string('should have');
      expect(message).to.have.string('foo');
      expect(message).to.have.string('baz');
    }

    function expectInvalidExtra(message) {
      expect(message).to.have.string('should not have');
      expect(message).to.have.string('bar');
      expect(message).to.have.string('foobar');
    }
  });
});