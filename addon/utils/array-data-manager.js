import Ember from 'ember';

import DataManager from 'ember-railio-grid/utils/data-manager';

import Filterer  from 'ember-railio-grid/utils/filterer';
import Sorter    from 'ember-railio-grid/utils/sorter';
import Paginator from 'ember-railio-grid/utils/paginator';

import computed, { alias, reads } from 'ember-computed';
import { get, set, getProperties } from '@ember/object';

const { defineProperty } = Ember;

export default DataManager.extend({
  managedContent: alias('paginator.currentPage'),

  filterer: computed({
    set(key, value) {
      set(this, '_filterer', value);
      return value;
    },
    get() {
      return get(this, '_filterer') || Filterer.create({
        handler: get(this, 'filteringHandler')
      });
    }
  }),

  sorter: computed({
    set(key, value) {
      set(this, '_sorter', value);
      return value;
    },
    get() {
      return get(this, '_sorter') || Sorter.create({
        handler: get(this, 'sortingHandler')
      });
    }
  }),

  paginator: computed({
    set(key, value) {
      set(this, '_paginator', value);
      return value;
    },
    get() {
      return get(this, '_paginator') || Paginator.create({
        handler: get(this, 'paginatingHandler')
      });
    }
  }),

  init() {
    this._super(...arguments);
    this._bindThings();
  },

  _bindThings() {
    let { filterer, sorter, paginator, paginatingHandler } =
      getProperties(this, 'filterer', 'sorter', 'paginator', 'paginatingHandler');

    filterer .defineContent(this);
    sorter   .defineContent(filterer, 'filteredContent');
    paginator.defineContent(sorter,   'sortedContent');

    set(paginatingHandler, 'contentContext', sorter);
    defineProperty(paginatingHandler, 'contentLength',
                   reads('contentContext.sortedContent.length'));
  }
});
