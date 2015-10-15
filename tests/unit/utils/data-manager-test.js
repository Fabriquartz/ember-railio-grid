import DataManager       from 'ember-railio-grid/utils/data-manager';
import PaginatingHandler from 'ember-railio-grid/utils/paginating-handler';
import SortingHandler    from 'ember-railio-grid/utils/sorting-handler';
import FilteringHandler  from 'ember-railio-grid/utils/filtering-handler';

import { module, test } from 'qunit';

let dataManager;

module('Unit | Utility | data-manager', {
  beforeEach: function() {
    dataManager = DataManager.create({
      content: [1, 2, 3, 4]
    });
  }
});

test('creates a filtering-handler', function(assert) {
  const handler = dataManager.get('filteringHandler');
  assert.notEqual(handler, null);
  assert.ok(handler instanceof FilteringHandler);
});

test('creates a sorting-handler', function(assert) {
  const handler = dataManager.get('sortingHandler');
  assert.notEqual(handler, null);
  assert.ok(handler instanceof SortingHandler);
});

test('creates a paginating-handler', function(assert) {
  const handler = dataManager.get('paginatingHandler');
  assert.notEqual(handler, null);
  assert.ok(handler instanceof PaginatingHandler);
});

//
// test('creates a default paginator with content', function(assert) {
//   const dataManager = DataManager.create({
//     content: [1, 2, 3, 4]
//   });
//
//   const paginator = dataManager.get('paginator');
//
//   assert.notEqual(paginator, null);
//   assert.ok(paginator instanceof Paginator);
//
//   assert.deepEqual(paginator.get('content'), [1, 2, 3, 4]);
// });
//
// test('creates a default sorter with content', function(assert) {
//   const dataManager = DataManager.create({
//     content: [1, 2, 3, 4]
//   });
//
//   const sorter = dataManager.get('sorter');
//
//   assert.notEqual(sorter, null);
//   assert.ok(sorter instanceof Sorter);
//   assert.deepEqual(sorter.get('content'), [1, 2, 3, 4]);
// });
//
// test('creates a default filter with content', function(assert) {
//   const dataManager = DataManager.create({
//     content: [1, 2, 3, 4]
//   });
//
//   const filterer = dataManager.get('filterer');
//
//   assert.notEqual(filterer, null);
//   assert.ok(filterer instanceof Filterer);
//   assert.deepEqual(filterer.get('content'), [1, 2, 3, 4]);
// });
//
// test('managedContent modified by filter, sorter and paginator', function(assert) {
//   const item1 = { id: 1, name: 'Frank' };
//   const item2 = { id: 2, name: 'Chris' };
//   const item3 = { id: 3, name: 'George' };
//   const item4 = { id: 4, name: 'Alex' };
//   const item5 = { id: 5, name: 'Dilan' };
//
//   const dataManager = DataManager.create({
//     content: [ item1, item2, item3, item4, item5]
//   });
//
//   run(() => {
//     dataManager.get('filterer').addFilter('name', 'contains', 'a');
//     dataManager.get('sorter').addSortKey('name');
//     dataManager.set('paginator.pageSize', 2);
//   });
//
//   assert.deepEqual(dataManager.get('managedContent'), [item4, item5]);
//
//   run(() => {
//     dataManager.set('paginator.page', 2);
//   });
//
//   assert.deepEqual(dataManager.get('managedContent'), [item1]);
// });
