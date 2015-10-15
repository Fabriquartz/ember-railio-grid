import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({
  filters: computed(function() {
    return Ember.A();
  }),

  filterTypes: computed(function() {
    return Ember.A([
      { label: 'equals',                      filter: 'equals' },
      { label: 'contains',                    filter: 'contains' },
      { label: 'is greater than',             filter: 'greaterThan' },
      { label: 'is greater than or equal to', filter: 'greaterThanEqual' },
      { label: 'is lower than',               filter: 'lowerThan' },
      { label: 'is lower than or equal to',   filter: 'lowerThanEqual' },
      { label: 'starts with',                 filter: 'startsWith' },
      { label: 'ends with',                   filter: 'endsWith' }
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
