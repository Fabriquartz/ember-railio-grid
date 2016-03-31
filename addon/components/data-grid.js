import Ember from 'ember';
import layout from 'ember-railio-grid/templates/components/data-grid';
import ArrayDataManager from 'ember-railio-grid/utils/array-data-manager';
import APIDataManager from 'ember-railio-grid/utils/api-data-manager';

const { computed, set, get } = Ember;
const { alias } = computed;

export default Ember.Component.extend({
  layout,
  classNames: ['data-grid'],
  attributeBindings: ['widthString:style'],

  showHeader: true,

  widthString: computed('width', function() {
    let width = `${this.get('width')}`;
    if (width.indexOf('%') > 0) {
      return width;
    }

    return Ember.String.htmlSafe(`width: ${width}px`);
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

  propertiesList: computed(
    'properties.@each{label,key}',
    'sortingHandler.sortKeys.@each.{key,descending}',
  function() {
    let properties = this.get('properties');
    let sortings = this.get('sortingHandler.sortKeys');

    return properties.map(function(property) {
      property = Ember.Object.create(property);
      let sorting = sortings.findBy('key', property.key);
      if (sorting) {
        let dir = sorting.descending ? 'DESC' : 'ASC';
        property.set('sorting', dir);
        property.set('sortingOrder', sortings.indexOf(sorting) + 1);
      }
      return property;
    });
  }),

  _selection: computed(function() {
    return Ember.A();
  }),

  selection: computed('_selection.[]', 'managedContent.[]', function() {
    let content   = this.get('managedContent');
    let selection = this.get('_selection');

    return content.filter((item) => {
      return selection.indexOf(item) !== -1;
    });
  }),

  actions: {
    sortBy(key) {
      this.get('sortingHandler').toggle(key);
    },

    doubleClickItem(item) {
      let doubleClickFn = this.get('doubleClickAction');

      if (typeof doubleClickFn === 'function') {
        doubleClickFn(item);
      }
    },

    selectItem(selected, item) {
      let selection = this.get('_selection');

      if (selection.indexOf(item) === -1) {
        selection.pushObject(item);
      } else {
        selection.removeObject(item);
      }
    },

    selectAll() {
      let selectionLength = this.get('selection.length');
      let list            = this.get('managedContent');
      let selection = Ember.A();

      if (selectionLength !== get(list, 'length')) {
        selection = Ember.A([].concat(list));
      }

      set(this, '_selection', Ember.A());

      Ember.run.next(() => set(this, '_selection', selection));
    }
  }
});
