import Ember from 'ember';

import Filterer  from 'ember-railio-grid/utils/filterer';
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

  filterer: computed({
    set(key, value) {
      this.set('_filterer', value);
      return value;
    },
    get() {
      return this.get('_filterer') || Filterer.create();
    }
  }),

  init: function() {
    this._bindContentToFilterer();
    this._bindFilteredToSorter();
    this._bindSortedToPaginator();
    this._super(...arguments);
  },

  _bindContentToFilterer() {
    let binding = this.get('contentFiltererBinding');
    if (binding  != null) { binding.disconnect(this); }
    binding = Ember.bind(this, 'filterer.content', 'content');
    this.set('contentFiltererBinding', binding);
  },

  _bindFilteredToSorter() {
    let binding = this.get('filtererSorterBinding');
    if (binding  != null) { binding.disconnect(this); }
    binding = Ember.bind(this, 'sorter.content', 'filterer.filteredContent');
    this.set('filtererSorterBinding', binding);
  },

  _bindSortedToPaginator() {
    let binding = this.get('sorterPaginatorBinding');
    if (binding  != null) { binding.disconnect(this); }
    binding = Ember.bind(this, 'paginator.content', 'sorter.sortedContent');
    this.set('sorterPaginatorBinding', binding);
  },

  managedContent: alias('paginator.currentPage')
});
