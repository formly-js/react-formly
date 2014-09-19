/* jshint -W030 */
'use strict';

var expect = require('chai').expect;
var FormlyConfig = require('./FormlyConfig');

describe('FormlyConfig', function FormlyConfigSpec() {

  describe('fields', function() {

    beforeEach(function() {
      FormlyConfig.fields.clearTypes();
    });

    describe('#clearTypes', function() {
      it('should clear all the types', function() {
        FormlyConfig.fields.addType('text', {});
        FormlyConfig.fields.clearTypes();
        var types = FormlyConfig.fields.getTypes();
        expect(types).to.be.empty;
      });
    });

    describe('#addType', function() {
      var fakeField;
      var fieldName;

      beforeEach(function() {
        fakeField = {};
        fieldName = 'text';
      });

      it('should accept two arguments where the first is name and second is the field', function() {
        FormlyConfig.fields.addType(fieldName, fakeField);
        var types = FormlyConfig.fields.getTypes();
        expect(types).to.have.property(fieldName);
        expect(types[fieldName]).to.equal(fakeField);
      });

      it('should accept a single argument that is an object with a name and a field', function() {
        FormlyConfig.fields.addType({
          name: fieldName,
          field: fakeField
        });
        var types = FormlyConfig.fields.getTypes();
        expect(types).to.have.property(fieldName);
        expect(types[fieldName]).to.equal(fakeField);
      });

      it('should accept a single argument that is an array of objects with a name and a field', function() {
        var fieldName2 = 'number';
        var fakeField2 = {};
        FormlyConfig.fields.addType([
          { name: fieldName, field: fakeField },
          { name: fieldName2, field: fakeField2 }
        ]);
        var types = FormlyConfig.fields.getTypes();
        expect(types).to.have.property(fieldName);
        expect(types).to.have.property(fieldName2);
        expect(types[fieldName]).to.equal(fakeField);
        expect(types[fieldName2]).to.equal(fakeField2);
      });

      it('should allow the overriding of field types with the same name', function() {
        FormlyConfig.fields.addType(fieldName, fakeField);
        FormlyConfig.fields.addType(fieldName, {}); // override
        var types = FormlyConfig.fields.getTypes();
        expect(types).to.have.property(fieldName);
        expect(types[fieldName]).to.not.equal(fakeField);
      });
    });

    describe('#getTypes', function() {
      it('should return an object with all the types keyed by name', function() {
        var fieldName = 'text';
        var fakeField = {};
        FormlyConfig.fields.addType(fieldName, fakeField);
        var types = FormlyConfig.fields.getTypes();
        expect(types).to.have.property(fieldName);
        expect(types[fieldName]).to.equal(fakeField);
      });
    });
  });
});