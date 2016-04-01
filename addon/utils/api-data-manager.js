import Ember from 'ember';
import DataManager from 'ember-railio-grid/utils/data-manager';

import service from 'ember-service/inject';
import computed from 'ember-computed';
import { decamelize } from 'ember-string';
import get from 'ember-metal/get';

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
    let store = get(this, 'store');
    let modelName = get(this, 'modelName');
    let query = {};

    let page = get(this, 'paginatingHandler.page');
    let pageSize = get(this, 'paginatingHandler.pageSize');
    let filters = get(this, 'filteringHandler.filters');
    let sortings = get(this, 'sortingHandler.sortKeys');

    if (page) { query.page = page; }

    if (pageSize) { query.per_page = pageSize; }

    if (filters.length) {
      query.filter = {};

      filters.forEach(function(filter) {
        let decamalizedName = decamelize(filter.propertyPath);
        decamalizedName = decamalizedName.replace('.', '_');
        let filterName = `${decamalizedName}_${filter.filter.filter}`;

        query.filter[filterName] = filter.value;
      });
    }

    if (sortings.length) {
      if (!query.filter) { query.filter = {}; }

      query.filter.sorts = [];

      sortings.forEach(function(sorting) {
        let sortKey = decamelize(sorting.key);
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
