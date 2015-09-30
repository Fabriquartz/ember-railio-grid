import Ember from 'ember';

const { compare, computed, get, set } = Ember;

function orderBy(list, sortProperties) {
  if (!sortProperties || sortProperties.length === 0) {
    return list;
  }

  // Bug/workaround: Ember.ArrayProxy has no method sort.
  // see: https://github.com/emberjs/ember.js/issues/11936
  if (typeof list.sort !== 'function' && typeof list.toArray === 'function') {
    list = list.toArray();
  }

  // [].concat(list) = clone array
  return [].concat(list).sort((item1, item2) => {
    let result = 0;

    sortProperties.forEach((property) => {
      if (result === 0) {
        result = compare(get(item1, property.key), get(item2, property.key));
        if (result !== 0 && property.descending) {
          result = result * -1;
        }
      }
    });

    return result;
  });
}

export default Ember.Object.extend({
  sortKeys: computed(function() {
    return Ember.A();
  }),

  sortedContent: computed('content.[]', 'sortKeys.@each.{key,descending}', function() {
    return orderBy(this.get('content'), this.get('sortKeys'));
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

  removeSortKey(key) {
    const sortKeys = this.get('sortKeys');
    const keyCurrent = sortKeys.findBy('key', key);

    sortKeys.removeObject(keyCurrent);
  },

  toggle(key) {
    const keyCurrent = this.get('sortKeys').findBy('key', key);

    if (!keyCurrent) {
      this.addSortKey(key, false);
    } else if (!keyCurrent.descending) {
      this.addSortKey(key, true);
    } else {
      this.removeSortKey(key);
    }
  },

  resetSortKeys() {
    this.set('sortKeys', Ember.A());
  }
});
