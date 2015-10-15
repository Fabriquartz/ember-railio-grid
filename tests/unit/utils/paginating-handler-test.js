import PaginatingHandler from '../../../utils/paginating-handler';
import { module, test } from 'qunit';

let paginatingHandler;

module('Unit | Utility | paginating-handler', {
  beforeEach: function() {
    paginatingHandler = PaginatingHandler.create({
      contentLength: 12
    });
  }
});

test('page 1 by default', function(assert) {
  assert.equal(paginatingHandler.get('page'), 1);
});

test('pagination-handler knows amount of pages', function(assert) {
  assert.equal(paginatingHandler.get('pageAmount'), 1, 'by default 1 page');

  paginatingHandler.set('pageSize', 4);
  assert.equal(paginatingHandler.get('pageAmount'), 3, 'pages with pageSize');
});

test('cannot set page higher than available pages', function(assert) {
  paginatingHandler.set('pageSize', 8);

  assert.throws(function() { paginatingHandler.set('page', 3); },
                /Cannot set page higher than available pages./);
});

test('cannot set page lower than 1', function(assert) {
  assert.throws(function() { paginatingHandler.set('page', 0); },
                /Cannot set page lower than 1./);
});

test('go to next page', function(assert) {
  paginatingHandler.set('pageSize', 4);

  paginatingHandler.nextPage();
  assert.equal(paginatingHandler.get('page'), 2);
});

test('go to previous page', function(assert) {
  paginatingHandler.set('pageSize', 4);
  paginatingHandler.set('page', 3);

  paginatingHandler.previousPage();
  assert.equal(paginatingHandler.get('page'), 2);
});

test('go to first page', function(assert) {
  paginatingHandler.set('pageSize', 4);
  paginatingHandler.set('page', 3);

  paginatingHandler.firstPage();
  assert.equal(paginatingHandler.get('page'), 1);
});

test('go to last page', function(assert) {
  paginatingHandler.set('pageSize', 3);

  paginatingHandler.lastPage();
  assert.equal(paginatingHandler.get('page'), 4);
});

test('has previous page', function(assert) {
  paginatingHandler.set('pageSize', 3);
  assert.equal(paginatingHandler.get('hasPreviousPage'), false);

  paginatingHandler.set('page', 2);
  assert.equal(paginatingHandler.get('hasPreviousPage'), true);
});

test('has next page', function(assert) {
  paginatingHandler.set('pageSize', 3);

  assert.equal(paginatingHandler.get('hasNextPage'), true);

  paginatingHandler.lastPage();
  assert.equal(paginatingHandler.get('hasNextPage'), false);
});
