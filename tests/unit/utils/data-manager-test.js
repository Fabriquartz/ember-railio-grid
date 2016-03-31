import DataManager       from 'ember-railio-grid/utils/data-manager';
import PaginatingHandler from 'ember-railio-grid/utils/paginating-handler';
import SortingHandler    from 'ember-railio-grid/utils/sorting-handler';
import FilteringHandler  from 'ember-railio-grid/utils/filtering-handler';

import { module, test } from 'qunit';

let dataManager;

module('Unit | Utility | data-manager', {
  beforeEach() {
    dataManager = DataManager.create({
      content: [1, 2, 3, 4]
    });
  }
});

test('creates a filtering-handler', function(assert) {
  let handler = dataManager.get('filteringHandler');
  assert.notEqual(handler, null);
  assert.ok(handler instanceof FilteringHandler);
});

test('creates a sorting-handler', function(assert) {
  let handler = dataManager.get('sortingHandler');
  assert.notEqual(handler, null);
  assert.ok(handler instanceof SortingHandler);
});

test('creates a paginating-handler', function(assert) {
  let handler = dataManager.get('paginatingHandler');
  assert.notEqual(handler, null);
  assert.ok(handler instanceof PaginatingHandler);
});

