import Ember from 'ember';
import layout from 'ember-railio-grid/templates/components/data-grid';
import Paginator from 'ember-railio-grid/utils/paginator';
import Sorter from 'ember-railio-grid/utils/sorter';

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

  sorter: computed({
    set(key, value) {
      this.set('_sorter', value);
      return value;
    },
    get() {
      return this.get('_sorter') || Sorter.create();
    }
  }),

  didReceiveAttrs() {
    this.set('sorter.content', this.getAttr('content') || this.get('content'));
    this._bindSortedToPaginator();
    this._super(...arguments);
  },

  _bindSortedToPaginator() {
    let binding = this.get('sorterPaginatorBinding');
    if (binding  != null) { binding.disconnect(this); }
    binding = Ember.bind(this, 'paginator.content', 'sorter.sortedContent');
    this.set('sorterPaginatorBinding', binding);
  },

  page:          alias('paginator.page'),
  pageSize:      alias('paginator.pageSize'),
  sortedContent: alias('sorter.sortedContent'),
  pageContent:   alias('paginator.currentPage'),

  propertiesList: computed('properties', function() {
    const properties = this.get('properties');

    return getPropertiesList(properties);
  }),

  actions: {
    sortBy(key) {
      this.get('sorter').toggle(key);
    }
  }
});
