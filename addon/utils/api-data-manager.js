import Ember from 'ember';
import DataManager from 'ember-railio-grid/utils/data-manager';

const { service } = Ember.inject;
const { computed } = Ember;

export default DataManager.extend({
  store: service(),

  contentLength: 9999,

  init: function() {
    Ember.bind(this, 'paginatingHandler.contentLength', 'contentLength');
  },

  managedContent: computed(
    'modelName',
    'paginatingHandler.page',
    'paginatingHandler.pageSize',
    'filteringHandler.filters.@each.{filter}',
    'sortingHandler.sortKeys.@each.{key,descending}',
  function() {
    const store = this.get('store');
    const modelName = this.get('modelName');
    const query = {};

    const page = this.get('paginatingHandler.page');
    const pageSize = this.get('paginatingHandler.pageSize');
    const filters = this.get('filteringHandler.filters');
    const sortings = this.get('sortingHandler.sortKeys');

    if (page) { query.page = page; }

    if (pageSize) { query.per_page = pageSize; }

    if (filters.length) {
      query.filter = {};

      filters.forEach(function(filter) {
        let decamalizedName = Ember.String.decamelize(filter.propertyPath);
        decamalizedName = decamalizedName.replace('.', '_');
        const filterName = decamalizedName + '_' + filter.filter.filter;

        query.filter[filterName] = filter.value;
      });
    }

    if (sortings.length) {
      if (!query.filter) { query.filter = {}; }

      query.filter.sorts = [];

      sortings.forEach(function(sorting) {
        const sortKey = Ember.String.decamelize(sorting.key);
        const sortDir = sorting.descending ? 'DESC' : 'ASC';

        query.filter.sorts.push({ name: sortKey, dir: sortDir });
      });
    }

    if (Object.keys(query) == null) {
      return store.findAll(modelName);
    } else {
      return store.query(modelName, query);
    }
  })
});
