import Ember from 'ember';
import layout from 'ember-railio-grid/templates/components/data-grid';
import Paginator from 'ember-railio-grid/utils/paginator';

const { computed } = Ember;
const { alias } = computed;

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
  classNames: ['data-grid'],
  attributeBindings: ['widthString:style'],

  showHeader: true,

  widthString: computed('width', function() {
    const width = this.get('width') + '';
    if (width.indexOf('%') > 0) { return width; }

    return  'width: ' + width + 'px';
  }),

  paginator: computed({
    set(key, value) {
      this.set('_paginator', value);
      return value;
    },
    get() {
      return this.get('_paginator') || Paginator.create();
    }
  }),

  didReceiveAttrs() {
    this.set('paginator.content', this.getAttr('content') || this.get('content'));
    this._super(...arguments);
  },

  page:        alias('paginator.page'),
  pageSize:    alias('paginator.pageSize'),
  pageContent: alias('paginator.currentPage'),
  pageAmount:  alias('paginator.pageAmount'),

  propertiesList: computed('properties', function() {
    const properties = this.get('properties');

    return getPropertiesList(properties);
  }),

  actions: {
    goToPage(pageNr) {
      this.set('paginator.page', pageNr);
    },

    previousPage() {
      this.get('paginator').previousPage();
    },

    nextPage() {
      this.get('paginator').nextPage();
    }
  }
});
