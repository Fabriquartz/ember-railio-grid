import DataManager from 'ember-railio-grid/utils/data-manager';

import { get, set, defineProperty, computed } from '@ember/object';
import { reads }                              from '@ember/object/computed';
import { inject as service }                  from '@ember/service';
import { decamelize }                         from '@ember/string';
import { wrap }                               from 'ember-array/utils';

export default DataManager.extend({
  store: service(),

  init() {
    this._super(...arguments);
    this._bindThings();
  },

  _bindThings() {
    let paginatingHandler = get(this, 'paginatingHandler');

    set(paginatingHandler, 'contentContext', this);
    defineProperty(paginatingHandler, 'contentLength',
                   reads('contentContext.contentLength'));
  },

  _defineContentLength(store, modelName) {
    if (!get(this, 'contentLength')) {
      store.query(modelName, { per_page: 1 }).then((items) => { // eslint-disable-line camelcase, max-len
        set(this, 'contentLength', items.meta.total || 9999);
      });
    }
  },

  _predefinedFilters: computed('predefinedFilters.@each.{filter,propertyPath,value}',
  function() {
    let predefinedFilters = get(this, 'predefinedFilters') || [];
    return predefinedFilters.map((predefinedFilter) => {
      let { filter, propertyPath, value } = predefinedFilter;
      return { filter: { filter }, propertyPath, value };
    });
  }),

  managedContent: computed(
    'modelName',
    '_predefinedFilters',
    'paginatingHandler.page',
    'paginatingHandler.pageSize',
    'filteringHandler.filters.@each.{filter,propertyPath,value}',
    'sortingHandler.sortKeys.@each.{key,descending}',
  function() {
    let store     = get(this, 'store');
    let modelName = get(this, 'modelName');
    let query = {};

    this._defineContentLength(store, modelName);

    let page              = get(this, 'paginatingHandler.page');
    let pageSize          = get(this, 'paginatingHandler.pageSize');
    let filters           = get(this, 'filteringHandler.filters');
    let predefinedFilters = get(this, '_predefinedFilters') || [];
    let sortings          = get(this, 'sortingHandler.sortKeys');

    filters = predefinedFilters.concat(filters);

    if (page)     { query.page = page; }
    if (pageSize) { query.per_page = pageSize; } // eslint-disable-line camelcase

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
