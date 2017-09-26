import EmberObject        from 'ember-object';
import computed, { sort } from 'ember-computed';
import get                from 'ember-metal/get';
import { wrap }           from 'ember-array/utils';

export default EmberObject.extend({
  sortKeys: computed('content.[]', 'handler.sortKeys.@each.{key,descending}',
  function() {
    let sortKeys = [];

    get(this, 'handler.sortKeys').forEach((sorting) => {
      let key        = get(sorting, 'key');
      let descending = get(sorting, 'descending') ? ':desc' : '';

      wrap(key).forEach((key) => {
        sortKeys.push(`${key}${descending}`);
      });
    });

    return sortKeys;
  }),

  sortedContent: sort('content', 'sortKeys')
});
