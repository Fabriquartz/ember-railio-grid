import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({
  _page: 1,

  page: computed('_page', {
    set(key, value) {
      if (value > this.get('pageAmount')) {
        throw 'Cannot set page higher than available pages.';
      }

      if (value < 1) {
        throw 'Cannot set page lower than 1.';
      }

      this.set('_page', value);
      return value;
    },
    get() {
      return this.get('_page');
    }
  }),

  pageAmount: computed('pageSize', 'contentLength', function() {
    let pageSize = this.get('pageSize');

    if (!pageSize || isNaN(pageSize)) { return 1; }
    return Math.ceil(this.get('contentLength') / pageSize);
  }),

  hasPreviousPage: computed('page', function() {
    return this.get('page') > 1;
  }),

  hasNextPage: computed('page', 'pageAmount', function() {
    return this.get('page') < this.get('pageAmount');
  }),

  previousPage() {
    if (this.get('hasPreviousPage')) {
      this.set('page', this.get('page') - 1);
    }
  },

  nextPage() {
    if (this.get('hasNextPage')) {
      this.set('page', this.get('page') + 1);
    }
  },

  firstPage() {
    this.set('page', 1);
  },

  lastPage() {
    this.set('page', this.get('pageAmount'));
  }
});
