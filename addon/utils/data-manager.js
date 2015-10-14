import Ember from 'ember';

import Filter    from 'ember-railio-grid/utils/filter';
import Sorter    from 'ember-railio-grid/utils/sorter';
import Paginator from 'ember-railio-grid/utils/paginator';

const { computed } = Ember;
const { alias } = computed;

export default Ember.Object.extend({
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

  filter: computed({
    set(key, value) {
      this.set('_filter', value);
      return value;
    },
    get() {
      return this.get('_filter') || Filter.create();
    }
  }),

  init: function() {
    this._bindContentToFilter();
    this._bindFilteredToSorter();
    this._bindSortedToPaginator();
    this._super(...arguments);
  },

  _bindContentToFilter() {
    let binding = this.get('contentFilterBinding');
    if (binding  != null) { binding.disconnect(this); }
    binding = Ember.bind(this, 'filter.content', 'content');
    this.set('contentFilterBinding', binding);
  },

  _bindFilteredToSorter() {
    let binding = this.get('filterSorterBinding');
    if (binding  != null) { binding.disconnect(this); }
    binding = Ember.bind(this, 'sorter.content', 'filter.filteredContent');
    this.set('filterSorterBinding', binding);
  },

  _bindSortedToPaginator() {
    let binding = this.get('sorterPaginatorBinding');
    if (binding  != null) { binding.disconnect(this); }
    binding = Ember.bind(this, 'paginator.content', 'sorter.sortedContent');
    this.set('sorterPaginatorBinding', binding);
  },

  managedContent: alias('paginator.currentPage')
});
