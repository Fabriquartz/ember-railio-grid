import Ember from 'ember';
import EmberObject from 'ember-object';

import computed from 'ember-computed';
import get from 'ember-metal/get';

const { compare } = Ember;

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

export default EmberObject.extend({
  sortedContent: computed('content.[]', 'handler.sortKeys.@each.{key,descending}', function() {
    return orderBy(get(this, 'content'), get(this, 'handler.sortKeys'));
  })
});
