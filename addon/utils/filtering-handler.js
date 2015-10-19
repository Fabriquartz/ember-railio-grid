import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({
  filters: computed(function() {
    return Ember.A();
  }),

  filterTypes: computed(function() {
    return Ember.A([
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
      const filter = this.get('filterTypes').findBy('filter', filterName);

      this.get('filters').pushObject({
        propertyPath: propertyPath,
        filter:       filter,
        value:        value
      });
    }
  },

  removeFilter(filter) {
    this.get('filters').removeObject(filter);
  }
});
