import EmberObject from 'ember-object';
import { A } from 'ember-array/utils';

import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default EmberObject.extend({
  sortKeys: computed(function() {
    return A();
  }),

  addSortKey(key, descending = false) {

    let sortKeys = get(this, 'sortKeys');
    let keyCurrent = sortKeys.findBy('key', key);
    let index = sortKeys.indexOf(keyCurrent);

    if (!keyCurrent) {
      sortKeys.pushObject({ key, descending });
    } else {
      set(keyCurrent, 'descending', descending);
      sortKeys.replace(index, 1, [keyCurrent]);
    }
  },

  toggle(key) {
    let keyCurrent = get(this, 'sortKeys').findBy('key', key);

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
    let sortKeys = get(this, 'sortKeys');
    let keyCurrent = sortKeys.findBy('key', key);

    sortKeys.removeObject(keyCurrent);
  },

  resetSortKeys() {
    set(this, 'sortKeys', A());
  }
});
