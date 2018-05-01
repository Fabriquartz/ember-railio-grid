import EmberObject, { get, set } from '@ember/object';
import computed, { reads } from 'ember-computed';

export default EmberObject.extend({
  _page: 1,

  contentLength: reads('contentContext.content.length'),

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
    let pageSize      = get(this, 'pageSize');
    let contentLength = get(this, 'contentLength');

    if (!pageSize || isNaN(pageSize) || !contentLength) { return; }
    return Math.ceil(contentLength / pageSize);
  }),

  hasPreviousPage: computed('page', function() {
    return get(this, 'page') > 1;
  }),

  hasNextPage: computed('page', 'pageAmount', function() {
    let pageAmount = get(this, 'pageAmount');
    return !pageAmount || get(this, 'page') < pageAmount;
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
