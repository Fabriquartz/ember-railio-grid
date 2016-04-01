import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  classNames: ['paginator'],

  actions: {
    update(object, propertyPath, value) {
      set(object, propertyPath, value);
    },

    goToPage(pageNr) {
      set(this, 'handler.page', pageNr);
    },

    firstPage() {
      get(this, 'handler').firstPage();
    },

    lastPage() {
      get(this, 'handler').lastPage();
    },

    previousPage() {
      get(this, 'handler').previousPage();
    },

    nextPage() {
      get(this, 'handler').nextPage();
    }
  }
});
