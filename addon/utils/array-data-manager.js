import Ember from 'ember';

import DataManager from 'ember-railio-grid/utils/data-manager';

import Filterer  from 'ember-railio-grid/utils/filterer';
import Sorter    from 'ember-railio-grid/utils/sorter';
import Paginator from 'ember-railio-grid/utils/paginator';

import computed, { alias } from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

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
    this._bindContent('content', 'filterer.content', 'contentFiltererBinding');
    this._bindContent('filterer.filteredContent', 'sorter.content', 'filteredSorterBinding');
    this._bindContent('sorter.sortedContent', 'paginator.content', 'sortedPaginatorBinding');
    this._bindContent('sorter.sortedContent.length', 'paginatingHandler.contentLength', 'sizePaginatorBinding');
  },

  _bindContent(from, to, bindingName) {
    let binding = get(this, bindingName);

    if (binding != null) { binding.disconnect(this); }
    binding = Ember.bind(this, to, from);
    set(this, bindingName, binding);
  }
});
