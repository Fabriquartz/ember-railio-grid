import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['paginator'],

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
