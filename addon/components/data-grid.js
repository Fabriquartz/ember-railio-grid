import Ember from 'ember';
import layout from 'ember-railio-grid/templates/components/data-grid';

const { computed } = Ember;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'table',
  classNames: ['data-grid'],
  attributeBindings: ['width'],

  showHeader: true,

  propertiesList: computed('properties', function() {
    const properties = this.get('properties');

    if (typeof properties === 'string') {
      return properties.split(' ');
    }
    return null;
  })
});
