import Ember from 'ember';
import DataManager from 'ember-railio-grid/utils/data-manager';

const { service } = Ember.inject;
const { computed } = Ember;

export default DataManager.extend({
  store: service(),

  contentLength: 9999,

  init() {
    Ember.bind(this, 'paginatingHandler.contentLength', 'contentLength');
  },

  managedContent: computed(
    'modelName',
    'paginatingHandler.page',
    'paginatingHandler.pageSize',
    'filteringHandler.filters.@each.{filter}',
    'sortingHandler.sortKeys.@each.{key,descending}',
  function() {
    let store = this.get('store');
    let modelName = this.get('modelName');
    let query = {};

    let page = this.get('paginatingHandler.page');
    let pageSize = this.get('paginatingHandler.pageSize');
    let filters = this.get('filteringHandler.filters');
    let sortings = this.get('sortingHandler.sortKeys');

    if (page) { query.page = page; }

    if (pageSize) { query.per_page = pageSize; }

    if (filters.length) {
      query.filter = {};

      filters.forEach(function(filter) {
        let decamalizedName = Ember.String.decamelize(filter.propertyPath);
        decamalizedName = decamalizedName.replace('.', '_');
        let filterName = `${decamalizedName}_${filter.filter.filter}`;

        query.filter[filterName] = filter.value;
      });
    }

    if (sortings.length) {
      if (!query.filter) { query.filter = {}; }

      query.filter.sorts = [];

      sortings.forEach(function(sorting) {
        let sortKey = Ember.String.decamelize(sorting.key);
        let sortDir = sorting.descending ? 'DESC' : 'ASC';

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
