import Ember from 'ember';

import PaginatingHandler from 'ember-railio-grid/utils/paginating-handler';
import SortingHandler    from 'ember-railio-grid/utils/sorting-handler';
import FilteringHandler  from 'ember-railio-grid/utils/filtering-handler';

const { computed } = Ember;

export default Ember.Object.extend({
  filteringHandler: computed({
    set(key, value) {
      this.set('_filteringHandler', value);
      return value;
    },
    get() {
      return this.get('_filteringHandler') || FilteringHandler.create();
    }
  }),

  sortingHandler: computed({
    set(key, value) {
      this.set('_sortingHandler', value);
      return value;
    },
    get() {
      return this.get('_sortingHandler') || SortingHandler.create();
    }
  }),

  paginatingHandler: computed({
    set(key, value) {
      this.set('_paginatingHandler', value);
      return value;
    },
    get() {
      return this.get('_paginatingHandler') || PaginatingHandler.create();
    }
  })
});
