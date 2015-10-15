import Ember from 'ember';
import FilteringHandler from '../../../utils/filtering-handler';
import { module, test } from 'qunit';

let filteringHandler;

module('Unit | Utility | filtering-handler', {
  beforeEach: function() {
    filteringHandler = FilteringHandler.create();
  }
});

test('creates a filtering-handler with a list of filterTypes', function(assert) {
  const filterTypes = filteringHandler.get('filterTypes');

  assert.ok(Ember.isArray(filterTypes), 'has a filterTypes array');

  assert.equal(typeof filterTypes[0].label, 'string', 'filterType has label');
  assert.equal(typeof filterTypes[0].filter, 'string', 'filterType has filterName');
});

test('can add filters', function(assert) {
  const filters = filteringHandler.get('filters');

  assert.equal(filters.length, 0, 'by default no filters');

  filteringHandler.addFilter('name', 'contains', 'e');
  assert.equal(filters.length, 1, 'added a filter');

  const addedFilter = filters[0];

  assert.equal(addedFilter.propertyPath, 'name', 'added filter property');
  assert.equal(addedFilter.filter.label, 'contains', 'added filter');
  assert.equal(addedFilter.value, 'e', 'added filter value');
});

test('can add multiple filters', function(assert) {
  const filters = filteringHandler.get('filters');

  filteringHandler.addFilter('name', 'contains', 'e');
  filteringHandler.addFilter('id', 'startsWith', 's');
  filteringHandler.addFilter('type', 'equals', 'dog');

  assert.equal(filters.length, 3, 'added multiple filters');
});

test('can remove filters', function(assert) {
  const filters = filteringHandler.get('filters');

  filteringHandler.addFilter('name', 'contains', 'e');
  filteringHandler.addFilter('id', 'startsWith', 's');
  filteringHandler.addFilter('type', 'equals', 'dog');

  assert.equal(filters.length, 3, 'added 3 filters');

  filteringHandler.removeFilter(filters[1]);

  assert.equal(filters.length, 2, 'removed a filter');
});
