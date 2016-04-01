import EmberObject from 'ember-object';

import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default EmberObject.extend({
  _page: 1,

  page: computed('_page', {
    set(key, value) {
      if (value > get(this, 'pageAmount')) {
        throw 'Cannot set page higher than available pages.';
      }

      if (value < 1) {
        throw 'Cannot set page lower than 1.';
      }

      set(this, '_page', value);
      return value;
    },
    get() {
      return get(this, '_page');
    }
  }),

  pageAmount: computed('pageSize', 'contentLength', function() {
    let pageSize = get(this, 'pageSize');

    if (!pageSize || isNaN(pageSize)) { return 1; }
    return Math.ceil(get(this, 'contentLength') / pageSize);
  }),

  hasPreviousPage: computed('page', function() {
    return get(this, 'page') > 1;
  }),

  hasNextPage: computed('page', 'pageAmount', function() {
    return get(this, 'page') < get(this, 'pageAmount');
  }),

  previousPage() {
    if (get(this, 'hasPreviousPage')) {
      set(this, 'page', get(this, 'page') - 1);
    }
  },

  nextPage() {
    if (get(this, 'hasNextPage')) {
      set(this, 'page', get(this, 'page') + 1);
    }
  },

  firstPage() {
    set(this, 'page', 1);
  },

  lastPage() {
    set(this, 'page', get(this, 'pageAmount'));
  }
});
