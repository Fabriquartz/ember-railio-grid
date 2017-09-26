import EmberObject        from 'ember-object';
import computed, { sort } from 'ember-computed';
import get                from 'ember-metal/get';

export default EmberObject.extend({
  sortKeys: computed('content.[]', 'handler.sortKeys.@each.{key,descending}',
  function() {
    let list = get(this, 'handler.sortKeys').map((sortKey) => {
      let key        = get(sortKey, 'key');
      let descending = get(sortKey, 'descending') ? ':desc' : '';
      return `${key}${descending}`;
    });

    return list;
  }),

  sortedContent: sort('content', 'sortKeys')
});
