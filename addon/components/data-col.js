import Ember from 'ember';
import $ from 'jquery';

const { computed, defineProperty } = Ember;
const { reads } = computed;

const defaultPropertyObject = {
  format: function(value) { return value; }
};

export default Ember.Component.extend({
  tagName: 'td',

  _property: computed('property', function() {
    return $.extend({}, defaultPropertyObject, this.get('property'));
  }),

  value: computed('_value', '_property.{format}', function() {
    const value  = this.get('_value');
    const format = this.get('_property.format');

    return format(value);
  }),

  didReceiveAttrs: function() {
    this._super(...arguments);

    const propertyPath = this.get('property.key');
    defineProperty(this, '_value', reads(`item.${propertyPath}`));
  }
});
