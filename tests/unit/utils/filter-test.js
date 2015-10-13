import Filter from '../../../utils/filter';
import { module, test } from 'qunit';

let filter;

const Alex    = { id: 1, type: 'dog', name: 'Alex' };
const Ben     = { id: 2, type: 'dog', name: 'Ben' };
const Chris   = { id: 3, type: 'cat', name: 'Chris' };
const Dice    = { id: 4, type: 'dog', name: 'Dice' };
const Erben   = { id: 5, type: 'cat', name: 'Erben' };
const Alex2   = { id: 6, type: 'cat', name: 'Alex' };

module('Unit | Utility | filter', {
  beforeEach: function() {
    filter = Filter.create({
      content: [ Alex, Ben, Chris, Dice, Erben, Alex2 ]
    });
  }
});

test('create a filter with content array', function(assert) {
  assert.deepEqual(filter.get('filteredContent'),
                   [ Alex, Ben, Chris, Dice, Erben, Alex2 ],
                   'by default unfiltered');
});

test('filter on one field: equals', function(assert) {
  filter.addFilter('equals', 'name', 'alex');

  assert.deepEqual(filter.get('filters.length'), 1, 'added filter');
  assert.deepEqual(filter.get('filteredContent'), [ Alex, Alex2 ],
                   'content filtered by name');
});

test('filter on one field: contains', function(assert) {
  filter.addFilter('contains', 'name', 'e');

  assert.deepEqual(filter.get('filteredContent'), [ Alex, Ben, Dice, Erben, Alex2 ],
                   'content filtered by partial name');
});

test('filter on one field: greaterThan', function(assert) {
  filter.addFilter('greaterThan', 'id', 4);

  assert.deepEqual(filter.get('filteredContent'), [ Erben, Alex2 ],
                   'content filtered by greater than');
});

test('filter on one field: greaterThanEqual', function(assert) {
  filter.addFilter('greaterThanEqual', 'id', 4);

  assert.deepEqual(filter.get('filteredContent'), [ Dice, Erben, Alex2 ],
                   'content filtered by greater than or equal');
});

test('filter on one field: lowerThan', function(assert) {
  filter.addFilter('lowerThan', 'id', 3);

  assert.deepEqual(filter.get('filteredContent'), [ Alex, Ben ],
                   'content filtered by lower than');
});

test('filter on one field: lowerThanEqual', function(assert) {
  filter.addFilter('lowerThanEqual', 'id', 3);

  assert.deepEqual(filter.get('filteredContent'), [ Alex, Ben, Chris ],
                   'content filtered by lower than or equal');
});

test('filter on one field: startsWith', function(assert) {
  filter.addFilter('startsWith', 'name', 'be');

  assert.deepEqual(filter.get('filteredContent'), [ Ben ],
                   'content filtered by starts with');
});

test('filter on one field: endsWith', function(assert) {
  filter.addFilter('endsWith', 'name', 'e');

  assert.deepEqual(filter.get('filteredContent'), [ Dice ],
                   'content filtered by ends with');
});

test('multiple filters: equals and greaterThan', function(assert) {
  filter.addFilter('equals', 'name', 'alex');
  filter.addFilter('greaterThan', 'id', 4);

  assert.deepEqual(filter.get('filteredContent'), [ Alex2 ],
                   'content filtered by equals and greater than');
});
