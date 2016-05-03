import Ember from 'ember';
import Component from 'ember-component';
import layout from 'ember-railio-grid/templates/components/data-grid';
import ArrayDataManager from 'ember-railio-grid/utils/array-data-manager';
import APIDataManager from 'ember-railio-grid/utils/api-data-manager';
import { strictInvokeAction } from 'ember-invoke-action';

import computed, { alias } from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { htmlSafe } from 'ember-string';
import { A } from 'ember-array/utils';

export default Component.extend({
  layout,
  classNames: ['data-grid'],
  attributeBindings: ['widthString:style'],

  showHeader: true,

  widthString: computed('width', function() {
    let width = `${get(this, 'width')}`;
    if (width.indexOf('%') > 0) {
      return width;
    }

    return htmlSafe(`width: ${width}px`);
  }),

  dataManager: computed({
    set(key, value) {
      set(this, '_dataManager', value);
      return value;
    },
    get() {
      if (get(this, 'modelName')) {
        return get(this, '_dataManager') || APIDataManager.create();
      }
      return get(this, '_dataManager') || ArrayDataManager.create();
    }
  }),

  didReceiveAttrs() {
    set(this, 'dataManager.content', this.getAttr('content') || get(this, 'content'));
    if (get(this, 'modelName')) {
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
    let properties = get(this, 'properties');
    let sortings = get(this, 'sortingHandler.sortKeys');

    return properties.map(function(property) {
      property = Ember.Object.create(property);
      let sorting = sortings.findBy('key', property.key);
      if (sorting) {
        let dir = sorting.descending ? 'DESC' : 'ASC';
        set(property, 'sorting', dir);
        set(property, 'sortingOrder', sortings.indexOf(sorting) + 1);
      }
      return property;
    });
  }),

  _selection: computed(function() {
    return A();
  }),

  selection: computed('_selection.[]', 'managedContent.[]', function() {
    let content   = get(this, 'managedContent');
    let selection = get(this, '_selection');

    return content.filter((item) => {
      return selection.indexOf(item) !== -1;
    });
  }),

  actions: {
    sortBy(key) {
      get(this, 'sortingHandler').toggle(key);
    },

    selectItem(selected, item) {
      let toggleItem = get(this, 'toggleItem');

      if (toggleItem) {
        strictInvokeAction(this, 'toggleItem', item);
        return;
      }

      let selection = get(this, '_selection');

      if (selection.indexOf(item) === -1) {
        selection.pushObject(item);
      } else {
        selection.removeObject(item);
      }
    },

    selectPage() {
      let selectionLength = get(this, 'selection.length');
      let managedContent  = get(this, 'managedContent');

      if (selectionLength === get(managedContent, 'length')) {
        this.send('clearSelection');
        return;
      }

      let selectPage = get(this, 'selectPage');

      if (selectPage) {
        strictInvokeAction(this, 'selectPage', managedContent);
        return;
      }

      set(this, '_selection', managedContent);
    },

    clearSelection() {
      let clearSelection = get(this, 'clearSelection');

      if (clearSelection) {
        strictInvokeAction(this, 'clearSelection');
        return;
      }

      set(this, '_selection', A());
    }
  }
});
