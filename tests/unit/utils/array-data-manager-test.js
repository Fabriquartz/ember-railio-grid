import Ember from 'ember';
import DataManager      from 'ember-railio-grid/utils/data-manager';
import ArrayDataManager from 'ember-railio-grid/utils/array-data-manager';

import FilteringHandler  from 'ember-railio-grid/utils/filtering-handler';
import SortingHandler    from 'ember-railio-grid/utils/sorting-handler';
import PaginatingHandler from 'ember-railio-grid/utils/paginating-handler';

import Filterer  from 'ember-railio-grid/utils/filterer';
import Sorter    from 'ember-railio-grid/utils/sorter';
import Paginator from 'ember-railio-grid/utils/paginator';

import { module, test } from 'qunit';

const { run } = Ember;

let arrayDataManager;

module('Unit | Utility | array-data-manager', {
  beforeEach: function() {
    arrayDataManager = ArrayDataManager.create({
      content: [1, 2, 3, 4]
    });
  }
});

test('inherits from data-manager', function(assert) {
  assert.ok(arrayDataManager instanceof DataManager);
});

test('has a managed content array', function(assert) {
  assert.deepEqual(arrayDataManager.get('managedContent'), [1, 2, 3, 4]);
});

test('creates a filterer with the filteringHandler', function(assert) {
  const filterer         = arrayDataManager.get('filterer');
  const filteringHandler = arrayDataManager.get('filteringHandler');

  assert.notEqual(filterer, null, 'filterer is defined');
  assert.ok(filterer instanceof Filterer, 'filterer is of type Filterer');

  assert.ok(filterer.get('handler') instanceof FilteringHandler,
            'handler of filterer is of type FilteringHandler');
  assert.equal(filterer.get('handler'), filteringHandler, 'filterer has handler');
});

test('creates a sorter with the sortingHandler', function(assert) {
  const sorter         = arrayDataManager.get('sorter');
  const sortingHandler = arrayDataManager.get('sortingHandler');

  assert.notEqual(sorter, null, 'sorter is defined');
  assert.ok(sorter instanceof Sorter, 'sorter is of type Sorter');

  assert.ok(sorter.get('handler') instanceof SortingHandler,
            'handler of sorter is of type SortingHandler');
  assert.equal(sorter.get('handler'), sortingHandler, 'sorter has handler');
});

test('creates a paginator with the paginatingHandler', function(assert) {
  const paginator         = arrayDataManager.get('paginator');
  const paginatingHandler = arrayDataManager.get('paginatingHandler');

  assert.notEqual(paginator, null, 'paginator is defined');
  assert.ok(paginator instanceof Paginator, 'paginator is of type Paginator');

  assert.ok(paginator.get('handler') instanceof PaginatingHandler,
            'handler of paginator is of type PaginatingHandler');
  assert.equal(paginator.get('handler'), paginatingHandler, 'paginator has handler');
});

test('passes the content to the filterer', function(assert) {
  const filtererContent = arrayDataManager.get('filterer.content');
  assert.deepEqual(filtererContent, [1, 2, 3, 4]);
});

test('passes the filtered content to the sorter', function(assert) {
  const sorterContent = arrayDataManager.get('sorter.content');
  assert.deepEqual(sorterContent, [1, 2, 3, 4]);
});

test('passes the sorted content to the paginator', function(assert) {
  const paginatorContent = arrayDataManager.get('paginator.content');
  assert.deepEqual(paginatorContent, [1, 2, 3, 4]);
});

test('managedContent modified by filter, sorter and paginator', function(assert) {
  const item1 = { id: 1, name: 'Frank' };
  const item2 = { id: 2, name: 'Chris' };
  const item3 = { id: 3, name: 'George' };
  const item4 = { id: 4, name: 'Alex' };
  const item5 = { id: 5, name: 'Dilan' };

  const arrayDataManager = ArrayDataManager.create({
    content: [ item1, item2, item3, item4, item5]
  });

  run(() => {
    arrayDataManager.get('filteringHandler').addFilter('name', 'contains', 'a');
  });

  assert.deepEqual(arrayDataManager.get('managedContent'),
                   [item1, item4, item5], 'content filtered');

  run(() => arrayDataManager.get('sortingHandler').addSortKey('name'));
  assert.deepEqual(arrayDataManager.get('managedContent'),
                   [item4, item5, item1], 'content filtered and sorted');

  run(() => arrayDataManager.set('paginatingHandler.pageSize', 2));
  assert.deepEqual(arrayDataManager.get('managedContent'), [item4, item5],
                   'content filtered, sorted and paginated');

  run(() => arrayDataManager.set('paginatingHandler.page', 2));
  assert.deepEqual(arrayDataManager.get('managedContent'), [item1]);
});
