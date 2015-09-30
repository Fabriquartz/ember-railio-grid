import Ember from 'ember';
import layout from '../templates/components/page-picker-paginator';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['paginator', 'page-picker-paginator'],

  actions: {
    goToPage(pageNr) {
      this.set('paginator.page', pageNr);
    },

    firstPage() {
      this.get('paginator').firstPage();
    },

    lastPage() {
      this.get('paginator').lastPage();
    },

    previousPage() {
      this.get('paginator').previousPage();
    },

    nextPage() {
      this.get('paginator').nextPage();
    }
  }
});
