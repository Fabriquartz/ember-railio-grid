import Ember from 'ember';
import layout from '../templates/components/filter-bar';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['filter-bar'],

  addButtonDisabled: computed('newFilterProperty', 'newFilterType',
                              'newFilterQuery', function() {
    let property = this.get('newFilterProperty');
    let type     = this.get('newFilterType');
    let query    = this.get('newFilterQuery');

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
    createNewFilter(event) {
      event.preventDefault();
      let property = this.get('newFilterProperty');
      let filter   = this.get('newFilterType');
      let query    = this.get('newFilterQuery');

      if (property && filter && query) {
        this.get('handler').addFilter(property, filter, query);

        this.set('newFilterProperty', null);
        this.set('newFilterType', null);
        this.set('newFilterQuery', null);
      }
      return false;
    },
    removeFilter(filter) {
      this.get('handler').removeFilter(filter);
    }
  }
});
