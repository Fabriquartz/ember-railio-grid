import Filterer from '../../../utils/filterer';
import FilteringHandler from '../../../utils/filtering-handler';
import { module, test } from 'qunit';

let filterer;

let Alex    = { id: 1, type: 'dog', name: 'Alex' };
let Ben     = { id: 2, type: 'dog', name: 'Ben' };
let Chris   = { id: 3, type: 'cat', name: 'Chris' };
let Dice    = { id: 4, type: 'dog', name: 'Dice' };
let Erben   = { id: 5, type: 'cat', name: 'Erben' };
let Alex2   = { id: 6, type: 'cat', name: 'Alex' };

module('Unit | Utility | filterer', {
  beforeEach() {
    let filteringHandler = FilteringHandler.create();

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
  filterer.get('handler').addFilter('name', 'eq', 'alex');

  assert.deepEqual(filterer.get('filteredContent'), [ Alex, Alex2 ],
                   'content filtered by name');
});

test('filter on one field: contains', function(assert) {
  filterer.get('handler').addFilter('name', 'cont', 'e');

  assert.deepEqual(filterer.get('filteredContent'),
                   [ Alex, Ben, Dice, Erben, Alex2 ],
                   'content filtered by partial name');
});

test('filter on one field: greaterThan', function(assert) {
  filterer.get('handler').addFilter('id', 'gt', 4);

  assert.deepEqual(filterer.get('filteredContent'), [ Erben, Alex2 ],
                   'content filtered by greater than');
});

test('filter on one field: greaterThanEqual', function(assert) {
  filterer.get('handler').addFilter('id', 'gte', 4);

  assert.deepEqual(filterer.get('filteredContent'), [ Dice, Erben, Alex2 ],
                   'content filtered by greater than or equal');
});

test('filter on one field: lowerThan', function(assert) {
  filterer.get('handler').addFilter('id', 'lt', 3);

  assert.deepEqual(filterer.get('filteredContent'), [ Alex, Ben ],
                   'content filtered by lower than');
});

test('filter on one field: lowerThanEqual', function(assert) {
  filterer.get('handler').addFilter('id', 'lte', 3);

  assert.deepEqual(filterer.get('filteredContent'), [ Alex, Ben, Chris ],
                   'content filtered by lower than or equal');
});

test('filter on one field: startsWith', function(assert) {
  filterer.get('handler').addFilter('name', 'start', 'be');

  assert.deepEqual(filterer.get('filteredContent'), [ Ben ],
                   'content filtered by starts with');
});

test('filter on one field: endsWith', function(assert) {
  filterer.get('handler').addFilter('name', 'end', 'e');

  assert.deepEqual(filterer.get('filteredContent'), [ Dice ],
                   'content filtered by ends with');
});

test('multiple filters: equals and greaterThan', function(assert) {
  filterer.get('handler').addFilter('name', 'eq', 'alex');
  filterer.get('handler').addFilter('id', 'gte', 4);

  assert.deepEqual(filterer.get('filteredContent'), [ Alex2 ],
                   'content filtered by equals and greater than');
});

test('filter on a multi-property field: contains', function(assert) {
  filterer.get('handler').addFilter(['name', 'type'], 'cont', 'a');

  assert.deepEqual(filterer.get('filteredContent'), [ Alex, Chris, Erben, Alex2 ],
                   'content filtered by name or type');
});
