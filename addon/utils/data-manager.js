import EmberObject from 'ember-object';

import PaginatingHandler from 'ember-railio-grid/utils/paginating-handler';
import SortingHandler    from 'ember-railio-grid/utils/sorting-handler';
import FilteringHandler  from 'ember-railio-grid/utils/filtering-handler';

import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default EmberObject.extend({
  filteringHandler: computed({
    set(key, value) {
      set(this, '_filteringHandler', value);
      return value;
    },
    get() {
      return get(this, '_filteringHandler') || FilteringHandler.create();
    }
  }),

  sortingHandler: computed({
    set(key, value) {
      set(this, '_sortingHandler', value);
      return value;
    },
    get() {
      return get(this, '_sortingHandler') || SortingHandler.create();
    }
  }),

  paginatingHandler: computed({
    set(key, value) {
      set(this, '_paginatingHandler', value);
      return value;
    },
    get() {
      return get(this, '_paginatingHandler') || PaginatingHandler.create();
    }
  })
});
