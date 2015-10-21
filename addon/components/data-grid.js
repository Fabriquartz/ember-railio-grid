import Ember from 'ember';
import $ from 'jquery';
import layout from 'ember-railio-grid/templates/components/data-grid';
import ArrayDataManager from 'ember-railio-grid/utils/array-data-manager';
import APIDataManager from 'ember-railio-grid/utils/api-data-manager';

const { computed } = Ember;
const { alias } = computed;

function getPropertiesList(properties) {
  let list = null;

  if (typeof properties === 'string') {
    const propertyList = properties.split(' ');

    list = propertyList.map(function(property) {
      const label = Ember.String.decamelize(property).replace('_', ' ');
      return { key: property, label: label };
    });

    list = Ember.A(list);
  } else if (properties !== null && Ember.isArray(properties)) {
    list = properties.map(function(property) {
      if (typeof property === 'string') {
        const label = Ember.String.decamelize(property).replace('_', ' ');
        return { key: property, label: label };
      } else if (typeof property === 'object' &&
                 property.hasOwnProperty('key') &&
                 property.hasOwnProperty('label')) {
        return property;
      }
    });

    list = Ember.A(list);
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

  dataManager: computed({
    set(key, value) {
      this.set('_dataManager', value);
      return value;
    },
    get() {
      if (this.get('modelName')) {
        return this.get('_dataManager') || APIDataManager.create();
      }
      return this.get('_dataManager') || ArrayDataManager.create();
    }
  }),

  didReceiveAttrs() {
    this.set('dataManager.content', this.getAttr('content') || this.get('content'));
    if (this.get('modelName')) {
      Ember.bind(this, 'dataManager.modelName', 'modelName');
      Ember.bind(this, 'dataManager.store', 'store');
    }
    this._super(...arguments);
  },

  filteringHandler:  alias('dataManager.filteringHandler'),
  sortingHandler:    alias('dataManager.sortingHandler'),
  paginatingHandler: alias('dataManager.paginatingHandler'),

  page:     alias('paginatingHandler.page'),
  pageSize: alias('paginatingHandler.pageSize'),

  managedContent: alias('dataManager.managedContent'),

  propertiesList: computed('properties', function() {
    const properties = this.get('properties');

    return getPropertiesList(properties);
  }),

  managedPropertiesList: computed(
    'propertiesList.@each{label,key}',
    'sortingHandler.sortKeys.@each.{key,descending}',
  function() {
    const properties = this.get('propertiesList');
    const sortings = this.get('sortingHandler.sortKeys');

    return properties.map(function(property) {
      property = Ember.Object.create(property);
      const sorting = sortings.findBy('key', property.key);
      if (sorting) {
        const dir = sorting.descending ? 'DESC' : 'ASC';
        property.set('sorting', dir);
        property.set('sortingOrder', sortings.indexOf(sorting) + 1);
      }
      return property;
    });
  }),

  selection: computed(function() {
    return Ember.A();
  }),

  actions: {
    sortBy(key) {
      this.get('sortingHandler').toggle(key);
    },

    doubleClickItem(item) {
      const doubleClickFn = this.get('doubleClickAction');

      if (typeof doubleClickFn === 'function') {
        doubleClickFn(item);
      }
    },

    selectItem(item, event) {
      if (!event.ctrlKey && !event.metaKey) {
        this.set('selection', Ember.A());
        $('.data-grid__row--selected').removeClass('data-grid__row--selected');
        return;
      }

      const selection = this.get('selection');
      const $row      = $(event.target).closest('tr.data-grid__row');

        if (selection.indexOf(item) === -1) {
          $row.addClass('data-grid__row--selected');
          selection.pushObject(item);
        } else {
          selection.removeObject(item);
          $row.removeClass('data-grid__row--selected');
        }
    }
  }
});
