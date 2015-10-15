import Filterer from '../../../utils/filterer';
import FilteringHandler from '../../../utils/filtering-handler';
import { module, test } from 'qunit';

let filterer;

const Alex    = { id: 1, type: 'dog', name: 'Alex' };
const Ben     = { id: 2, type: 'dog', name: 'Ben' };
const Chris   = { id: 3, type: 'cat', name: 'Chris' };
const Dice    = { id: 4, type: 'dog', name: 'Dice' };
const Erben   = { id: 5, type: 'cat', name: 'Erben' };
const Alex2   = { id: 6, type: 'cat', name: 'Alex' };

module('Unit | Utility | filterer', {
  beforeEach: function() {
    const filteringHandler = FilteringHandler.create();

    filterer = Filterer.create({
      content: [ Alex, Ben, Chris, Dice, Erben, Alex2 ],
      handler: filteringHandler
    });
  }
});

test('create a filterer with content array', function(assert) {
  assert.deepEqual(filterer.get('filteredContent'),
                   [ Alex, Ben, Chris, Dice, Erben, Alex2 ],
                   'by default unfiltered');
});

test('filter on one field: equals', function(assert) {
  filterer.get('handler').addFilter('name', 'equals', 'alex');

  assert.deepEqual(filterer.get('filteredContent'), [ Alex, Alex2 ],
                   'content filtered by name');
});

test('filter on one field: contains', function(assert) {
  filterer.get('handler').addFilter('name', 'contains', 'e');

  assert.deepEqual(filterer.get('filteredContent'), [ Alex, Ben, Dice, Erben, Alex2 ],
                   'content filtered by partial name');
});

test('filter on one field: greaterThan', function(assert) {
  filterer.get('handler').addFilter('id', 'greaterThan', 4);

  assert.deepEqual(filterer.get('filteredContent'), [ Erben, Alex2 ],
                   'content filtered by greater than');
});

test('filter on one field: greaterThanEqual', function(assert) {
  filterer.get('handler').addFilter('id', 'greaterThanEqual', 4);

  assert.deepEqual(filterer.get('filteredContent'), [ Dice, Erben, Alex2 ],
                   'content filtered by greater than or equal');
});

test('filter on one field: lowerThan', function(assert) {
  filterer.get('handler').addFilter('id', 'lowerThan', 3);

  assert.deepEqual(filterer.get('filteredContent'), [ Alex, Ben ],
                   'content filtered by lower than');
});

test('filter on one field: lowerThanEqual', function(assert) {
  filterer.get('handler').addFilter('id', 'lowerThanEqual', 3);

  assert.deepEqual(filterer.get('filteredContent'), [ Alex, Ben, Chris ],
                   'content filtered by lower than or equal');
});

test('filter on one field: startsWith', function(assert) {
  filterer.get('handler').addFilter('name', 'startsWith', 'be');

  assert.deepEqual(filterer.get('filteredContent'), [ Ben ],
                   'content filtered by starts with');
});

test('filter on one field: endsWith', function(assert) {
  filterer.get('handler').addFilter('name', 'endsWith', 'e');

  assert.deepEqual(filterer.get('filteredContent'), [ Dice ],
                   'content filtered by ends with');
});

test('multiple filters: equals and greaterThan', function(assert) {
  filterer.get('handler').addFilter('name', 'equals', 'alex');
  filterer.get('handler').addFilter('id', 'greaterThan', 4);

  assert.deepEqual(filterer.get('filteredContent'), [ Alex2 ],
                   'content filtered by equals and greater than');
});
