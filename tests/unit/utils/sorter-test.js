import Sorter from '../../../utils/sorter';
import { module, test } from 'qunit';

let sorter;
const Ben   = { id: 1, name: 'Ben', type: 'dog' };
const Alex  = { id: 2, name: 'Alex', type: 'dog' };
const Chris = { id: 3, name: 'Chris', type: 'cat' };

module('Unit | Utility | sorter', {
  beforeEach: function() {
    sorter = Sorter.create({
      content: [ Ben, Alex, Chris ]
    });
  }
});

test('create a sorter with content array', function(assert) {
  assert.deepEqual(sorter.get('sortedContent'), [ Ben, Alex, Chris ],
                   'by default unsorted');
});

test('toggle()', function(assert) {
  sorter.toggle('name');
  assert.deepEqual(sorter.get('sortedContent'), [ Alex, Ben, Chris ],
                   'once toggled sort ascending');

  sorter.toggle('name');
  assert.deepEqual(sorter.get('sortedContent'), [ Chris, Ben, Alex ],
                   'twice toggled sort descending');

  sorter.toggle('name');
  assert.deepEqual(sorter.get('sortedContent'), [ Ben, Alex, Chris ],
                   'third time toggled remove sorting');

  sorter.toggle('name');
  assert.deepEqual(sorter.get('sortedContent'), [ Alex, Ben, Chris ],
                   'fourth time toggled sort ascending');
});

test('resetSortKeys()', function(assert) {
  sorter.addSortKey('name');
  sorter.resetSortKeys();
  assert.equal(sorter.get('sortKeys.length'), 0, 'resets sortKeys');
});
