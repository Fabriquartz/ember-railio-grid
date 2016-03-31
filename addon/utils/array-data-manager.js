import Ember from 'ember';

import DataManager from 'ember-railio-grid/utils/data-manager';

import Filterer  from 'ember-railio-grid/utils/filterer';
import Sorter    from 'ember-railio-grid/utils/sorter';
import Paginator from 'ember-railio-grid/utils/paginator';

const { computed } = Ember;
const { alias } = computed;

export default DataManager.extend({
  managedContent: alias('paginator.currentPage'),

  filterer: computed({
    set(key, value) {
      this.set('_filterer', value);
      return value;
    },
    get() {
      return this.get('_filterer') || Filterer.create({
        handler: this.get('filteringHandler')
      });
    }
  }),

  sorter: computed({
    set(key, value) {
      this.set('_sorter', value);
      return value;
    },
    get() {
      return this.get('_sorter') || Sorter.create({
        handler: this.get('sortingHandler')
      });
    }
  }),

  paginator: computed({
    set(key, value) {
      this.set('_paginator', value);
      return value;
    },
    get() {
      return this.get('_paginator') || Paginator.create({
        handler: this.get('paginatingHandler')
      });
    }
  }),

  init() {
    this._super(...arguments);
    this._bindThings();
  },

  _bindThings() {
    this._bindContent('content', 'filterer.content', 'contentFiltererBinding');
    this._bindContent('filterer.filteredContent', 'sorter.content', 'filteredSorterBinding');
    this._bindContent('sorter.sortedContent', 'paginator.content', 'sortedPaginatorBinding');
    this._bindContent('sorter.sortedContent.length', 'paginatingHandler.contentLength', 'sizePaginatorBinding');
  },

  _bindContent(from, to, bindingName) {
    let binding = this.get(bindingName);

    if (binding  != null) { binding.disconnect(this); }
    binding = Ember.bind(this, to, from);
    this.set(bindingName, binding);
  }
});
