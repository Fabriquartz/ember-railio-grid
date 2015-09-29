import Ember from 'ember';
import layout from 'ember-railio-grid/templates/components/data-grid';

const { computed } = Ember;

function getPropertiesList(properties) {
  let list = null;

  if (typeof properties === 'string') {
    const propertyList = properties.split(' ');

    list = propertyList.map(function(property) {
      return { key: property, label: property };
    });
  } else if (properties !== null && Ember.isArray(properties)) {
    list = properties.map(function(property) {
      if (typeof property === 'string') {
        return { key: property, label: property };
      } else if (typeof property === 'object' &&
                 property.hasOwnProperty('key') &&
                 property.hasOwnProperty('label')) {
        return property;
      }
    });
  }

  return list;
}

export default Ember.Component.extend({
  layout: layout,
  tagName: 'table',
  classNames: ['data-grid'],
  attributeBindings: ['width'],

  showHeader: true,

  propertiesList: computed('properties', function() {
    const properties = this.get('properties');

    return getPropertiesList(properties);
  })
});
