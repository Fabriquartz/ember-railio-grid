/* eslint camelcase: ["error", {properties: "never"}] */
import Ember from 'ember';
import DataManager from 'ember-railio-grid/utils/data-manager';

import service from 'ember-service/inject';
import computed from 'ember-computed';
import { decamelize } from 'ember-string';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { wrap } from 'ember-array/utils';

const { bind } = Ember;

export default DataManager.extend({
  store: service(),

  init() {
    bind(this, 'paginatingHandler.contentLength', 'contentLength');
  },

  _defineContentLength(store, modelName) {
    if (!get(this, 'contentLength')) {
      store.query(modelName, { per_page: 1 }).then((items) => {
        set(this, 'contentLength', items.meta.total || 9999);
      });
    }
  },

  managedContent: computed(
    'modelName',
    'paginatingHandler.page',
    'paginatingHandler.pageSize',
    'filteringHandler.filters.@each.{filter,propertyPath,value}',
    'sortingHandler.sortKeys.@each.{key,descending}',
  function() {
    let store     = get(this, 'store');
    let modelName = get(this, 'modelName');
    let query = {};

    this._defineContentLength(store, modelName);

    let page     = get(this, 'paginatingHandler.page');
    let pageSize = get(this, 'paginatingHandler.pageSize');
    let filters  = get(this, 'filteringHandler.filters');
    let sortings = get(this, 'sortingHandler.sortKeys');

    if (page) { query.page = page; }

    if (pageSize) { query.per_page = pageSize; }

    if (filters.length) {
      query.filter = {};

      filters.forEach(function(filter) {
        let properties = wrap(filter.propertyPath);
        properties = properties.map((property) => {
          return decamelize(property).replace('.', '_');
        });

        let filterName = `${properties.join('_or_')}_${filter.filter.filter}`;

        query.filter[filterName] = filter.value;
      });
    }

    if (sortings.length) {
      if (!query.filter) { query.filter = {}; }

      query.filter.sorts = [];

      sortings.forEach(function(sorting) {
        let sortDir = sorting.descending ? 'DESC' : 'ASC';

        wrap(sorting.key).forEach((key) => {
          let sortKey = decamelize(key).replace('.', '_');
          query.filter.sorts.push({ name: sortKey, dir: sortDir });
        });
      });
    }

    if (Object.keys(query) == null) {
      return store.findAll(modelName);
    } else {
      let result = store.query(modelName, query);
      result.then((items) => {
        set(this, 'contentLength', items.meta.total);
      });
      return result;
    }
  })
});
