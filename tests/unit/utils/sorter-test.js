import Sorter from '../../../utils/sorter';
import SortingHandler from '../../../utils/sorting-handler';
import { module, test } from 'qunit';

let sorter;
let Ben   = { id: 1, name: 'Ben', type: 'dog' };
let Alex  = { id: 2, name: 'Alex', type: 'dog' };
let Chris = { id: 3, name: 'Chris', type: 'cat' };
let Edwin = { id: 4, name: 'Edwin', type: 'dog' };
let Dirk  = { id: 5, name: 'Dirk', type: 'cat' };

module('Unit | Utility | sorter', {
  beforeEach() {
    let sortingHandler = SortingHandler.create();
    sorter = Sorter.create({
      content: [ Ben, Alex, Chris ],
      handler: sortingHandler
    });
  }
});

test('create a sorter with content array', function(assert) {
  assert.deepEqual(sorter.get('sortedContent'), [ Ben, Alex, Chris ],
                   'by default unsorted');
});

test('sorts on one column', function(assert) {
  sorter.get('handler').toggle('name');
  assert.deepEqual(sorter.get('sortedContent'), [ Alex, Ben, Chris ],
                   'sorting ascending');

  sorter.get('handler').toggle('name');
  assert.deepEqual(sorter.get('sortedContent'), [ Chris, Ben, Alex ],
                   'sorting descending');
});

test('multiple sorting', function(assert) {
  sorter.content = [ Ben, Alex, Chris, Edwin, Dirk ];

  sorter.get('handler').toggle('type');
  assert.deepEqual(sorter.get('sortedContent'), [ Chris, Dirk, Ben, Alex, Edwin ],
                   'sort on one key');

  sorter.get('handler').toggle('name');
  assert.deepEqual(sorter.get('sortedContent'), [ Chris, Dirk, Alex, Ben, Edwin ],
                   'sort on second key');

  sorter.get('handler').toggle('name');
  assert.deepEqual(sorter.get('sortedContent'), [ Dirk, Chris, Edwin, Ben, Alex ],
                   'toggle sort on second key');
});

test('sorting on a multi-property column', function(assert) {
  sorter.content = [ Alex, Ben, Chris, Dirk, Edwin ];

  let properties = ['type', 'name'];

  sorter.get('handler').toggle(properties);
  assert.deepEqual(sorter.get('sortedContent'), [ Chris, Dirk, Alex, Ben, Edwin ],
                   'sorting ascending');

  sorter.get('handler').toggle(properties);
  assert.deepEqual(sorter.get('sortedContent'), [ Edwin, Ben, Alex, Dirk, Chris ],
                   'sorting descending');
});
