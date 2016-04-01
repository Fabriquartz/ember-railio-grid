import Component from 'ember-component';
import layout from '../templates/components/filter-bar';

import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  classNames: ['filter-bar'],

  addButtonDisabled: computed('newFilterProperty', 'newFilterType',
                              'newFilterQuery', function() {
    let property = get(this, 'newFilterProperty');
    let type     = get(this, 'newFilterType');
    let query    = get(this, 'newFilterQuery');

    return property == null || property     === '' ||
           type     == null || type         === '' ||
           query    == null || query.trim() === '';
  }),

  actions: {
    changedQuery(value) {
      set(this, 'newFilterQuery', value);
    },
    changedProperty(property) {
      set(this, 'newFilterProperty', property);
    },
    changedType(type) {
      set(this, 'newFilterType', type);
    },
    createNewFilter(event) {
      event.preventDefault();
      let property = get(this, 'newFilterProperty');
      let filter   = get(this, 'newFilterType');
      let query    = get(this, 'newFilterQuery');

      if (property && filter && query) {
        get(this, 'handler').addFilter(property, filter, query);

        set(this, 'newFilterProperty', null);
        set(this, 'newFilterType', null);
        set(this, 'newFilterQuery', null);
      }
      return false;
    },
    removeFilter(filter) {
      get(this, 'handler').removeFilter(filter);
    }
  }
});
