import Paginator from 'ember-railio-grid/utils/paginator';
import PaginatingHandler from 'ember-railio-grid/utils/paginating-handler';
import { module, test } from 'qunit';

let paginator;

module('Unit | Utility | paginator', {
  beforeEach() {
    let paginatingHandler = PaginatingHandler.create({
      contentLength: 4
    });
    paginator = Paginator.create({
      content: [1, 2, 3, 4],
      handler: paginatingHandler
    });
  }
});

test('generates current page', function(assert) {
  paginator.set('handler.pageSize', 2);
  paginator.set('handler.page', 2);

  assert.deepEqual(paginator.get('currentPage'), [3, 4]);
});

test('last lage length depending on pageSize and contentLength', function(assert) {
  paginator.set('handler.pageSize', 3);
  paginator.get('handler').lastPage();

  assert.deepEqual(paginator.get('currentPage'), [4]);
});

