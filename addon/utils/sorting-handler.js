import Ember from 'ember';

const { computed, set } = Ember;

export default Ember.Object.extend({
  sortKeys: computed(function() {
    return Ember.A();
  }),

  addSortKey(key, descending = false) {

    const sortKeys = this.get('sortKeys');
    const keyCurrent = sortKeys.findBy('key', key);
    const index = sortKeys.indexOf(keyCurrent);

    if (!keyCurrent) {
      sortKeys.pushObject({ key: key, descending: descending });
    } else {
      set(keyCurrent, 'descending', descending);
      sortKeys.replace(index, 1, [keyCurrent]);
    }
  },

  toggle(key) {
    const keyCurrent = this.get('sortKeys').findBy('key', key);

    if (!keyCurrent) {
      this.addSortKey(key, false);
      return 'ASC';
    } else if (!keyCurrent.descending) {
      this.addSortKey(key, true);
      return 'DESC';
    } else {
      this.removeSortKey(key);
      return false;
    }
  },

  removeSortKey(key) {
    const sortKeys = this.get('sortKeys');
    const keyCurrent = sortKeys.findBy('key', key);

    sortKeys.removeObject(keyCurrent);
  },

  resetSortKeys() {
    this.set('sortKeys', Ember.A());
  }
});
