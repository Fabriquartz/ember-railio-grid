import Ember from 'ember';

const { set } = Ember;

export default Ember.Component.extend({
  classNames: ['paginator'],

  actions: {
    update(object, propertyPath, value) {
      set(object, propertyPath, value);
    },

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
