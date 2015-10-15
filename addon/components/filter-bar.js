import Ember from 'ember';
import layout from '../templates/components/filter-bar';

const { computed } = Ember;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['filter-bar'],

  addButtonDisabled: computed('newFilterProperty', 'newFilterType',
                              'newFilterQuery', function() {
    const property = this.get('newFilterProperty');
    const type     = this.get('newFilterType');
    const query    = this.get('newFilterQuery');

    return property == null || property     === '' ||
           type     == null || type         === '' ||
           query    == null || query.trim() === '';
  }),

  actions: {
    changedQuery(value) {
      this.set('newFilterQuery', value);
    },
    changedProperty(property) {
      this.set('newFilterProperty', property);
    },
    changedType(type) {
      this.set('newFilterType', type);
    },
    createNewFilter() {
      const property = this.get('newFilterProperty');
      const filter   = this.get('newFilterType');
      const query    = this.get('newFilterQuery');

      if (property && filter && query) {
        this.get('handler').addFilter(property, filter, query);

        this.set('newFilterProperty', null);
        this.set('newFilterType', null);
        this.set('newFilterQuery', null);
      }
    },
    removeFilter(filter) {
      this.get('handler').removeFilter(filter);
    }
  }
});
