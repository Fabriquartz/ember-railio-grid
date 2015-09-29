import Ember from 'ember';

const { computed, defineProperty } = Ember;
const { reads } = computed;

export default Ember.Component.extend({
  tagName: 'td',

  didReceiveAttrs: function() {
    this._super(...arguments);

    const propertyPath = this.get('property');

    defineProperty(this, 'value', reads(`item.${propertyPath}`));
  }
});
