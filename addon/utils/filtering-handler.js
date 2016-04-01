import EmberObject from 'ember-object';
import { A } from 'ember-array/utils';

import computed from 'ember-computed';
import get from 'ember-metal/get';

export default EmberObject.extend({
  filters: computed(function() {
    return A();
  }),

  filterTypes: computed(function() {
    return A([
      { label: 'equals',                      filter: 'eq' },
      { label: 'contains',                    filter: 'cont' },
      { label: 'is greater than',             filter: 'gt' },
      { label: 'is greater than or equal to', filter: 'gte' },
      { label: 'is lower than',               filter: 'lt' },
      { label: 'is lower than or equal to',   filter: 'lte' },
      { label: 'starts with',                 filter: 'start' },
      { label: 'ends with',                   filter: 'end' }
    ]);
  }),

  addFilter(propertyPath, filterName, value) {
    if (propertyPath && filterName && value) {
      let filter = get(this, 'filterTypes').findBy('filter', filterName);

      get(this, 'filters').pushObject({ propertyPath, filter, value });
    }
  },

  removeFilter(filter) {
    get(this, 'filters').removeObject(filter);
  }
});
