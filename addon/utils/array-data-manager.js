import DataManager from 'ember-railio-grid/utils/data-manager';

import Filterer  from 'ember-railio-grid/utils/filterer';
import Sorter    from 'ember-railio-grid/utils/sorter';
import Paginator from 'ember-railio-grid/utils/paginator';

import computed from 'ember-computed';
import get      from 'ember-metal/get';
import set      from 'ember-metal/set';

export default DataManager.extend({
  init() {
    this._super(...arguments);
  },

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

  managedContent: computed('content.[]', 'filterer.filteredContent',
                           'sorter.sortedContent', 'sorter.sortedContent.length',
                           'paginatingHandler.pageSize', 'paginatingHandler.page',
  function() {
    set(this, 'filterer.content', get(this, 'content'));
    set(this, 'sorter.content', get(this, 'filterer.filteredContent'));
    set(this, 'paginator.content', get(this, 'sorter.sortedContent'));
    set(this, 'paginatingHandler.contentLength',
        get(this, 'sorter.sortedContent.length'));
    return (get(this, 'paginator.currentPage'));
  })
});
