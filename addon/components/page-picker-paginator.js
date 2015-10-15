import Ember from 'ember';
import layout from '../templates/components/page-picker-paginator';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['paginator', 'page-picker-paginator'],

  actions: {
    goToPage(pageNr) {
      this.set('handler.page', pageNr);
    },

    firstPage() {
      this.get('handler').firstPage();
    },

    lastPage() {
      this.get('handler').lastPage();
    },

    previousPage() {
      this.get('handler').previousPage();
    },

    nextPage() {
      this.get('handler').nextPage();
    }
  }
});
