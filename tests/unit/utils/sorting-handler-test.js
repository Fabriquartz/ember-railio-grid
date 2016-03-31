import SortingHandler from '../../../utils/sorting-handler';
import { module, test } from 'qunit';

let sortingHandler;

module('Unit | Utility | sorting-handler', {
  beforeEach() {
    sortingHandler = SortingHandler.create();
  }
});

test('toggle sort property', function(assert) {
  let sortings = sortingHandler.get('sortKeys');

  assert.equal(sortings.length, 0, 'by default no sortings');

  sortingHandler.toggle('name');
  assert.equal(sortings.length, 1, 'added a sorting');

  let [ addedSorting ] = sortings;

  assert.equal(addedSorting.key, 'name', 'added sorting property');
  assert.equal(addedSorting.descending, false, 'first sort ascending');

  sortingHandler.toggle('name');

  assert.equal(sortings.length, 1, 'keeps same amount of sortings');
  assert.equal(addedSorting.descending, true, 'toggled to descending');

  sortingHandler.toggle('name');
  assert.equal(sortings.length, 0, 'third time toggled removes sorting');

  sortingHandler.toggle('name');

  [ addedSorting ] = sortings;
  assert.equal(sortings.length, 1, 'fourth time toggled added sorting asc');
  assert.equal(addedSorting.descending, false, 'fourth toggle sort ascending');
});

test('resetSortKeys()', function(assert) {
  sortingHandler.addSortKey('name');
  sortingHandler.resetSortKeys();
  assert.equal(sortingHandler.get('sortKeys.length'), 0, 'resets sortKeys');
});
