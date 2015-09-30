import Paginator from 'ember-railio-grid/utils/paginator';
import { module, test } from 'qunit';

module('Unit | Utility | paginator');

test('create a pagination with array', function(assert) {
  const paginator = Paginator.create({
    content: [1, 2, 3, 4],
    pageSize: 2,
    page:     2
  });

  assert.deepEqual(paginator.get('currentPage'), [3, 4]);
});

test('paginator knows amount of pages', function(assert) {
  const paginator = Paginator.create({
    content: [1, 2, 3, 4],
    pageSize: 2
  });

  assert.equal(paginator.get('pageAmount'), 2);
});

test('cannot set page higher than available pages', function(assert) {
  const paginator = Paginator.create({
    content: [1, 2, 3, 4],
    pageSize: 2
  });

  assert.throws(function() {
    paginator.set('page', 3);
  }, /Cannot set page higher than available pages./);
});

test('cannot set page lower than 1', function(assert) {
  const paginator = Paginator.create({
    content: [1, 2, 3, 4],
    pageSize: 2
  });

  assert.throws(function() {
    paginator.set('page', 0);
  }, /Cannot set page lower than 1./);
});

test('go to next page', function(assert) {
  const paginator = Paginator.create({
    content: [1, 2, 3, 4],
    pageSize: 2
  });

  paginator.nextPage();
  assert.equal(paginator.get('page'), 2);
});

test('go to previous page', function(assert) {
  const paginator = Paginator.create({
    content: [1, 2, 3, 4],
    pageSize: 2,
    page: 2
  });

  paginator.previousPage();
  assert.equal(paginator.get('page'), 1);
});

test('go to first page', function(assert) {
  const paginator = Paginator.create({
    content: [1, 2, 3, 4, 5],
    pageSize: 1,
    page: 4
  });

  paginator.firstPage();
  assert.equal(paginator.get('page'), 1);
});

test('go to last page', function(assert) {
  const paginator = Paginator.create({
    content: [1, 2, 3, 4, 5],
    pageSize: 1,
    page: 4
  });

  paginator.lastPage();
  assert.equal(paginator.get('page'), 5);
});

test('has previous page', function(assert) {
  const paginator = Paginator.create({
    content: [1, 2, 3, 4],
    pageSize: 2
  });

  assert.equal(paginator.get('hasPreviousPage'), false);

  paginator.set('page', 2);
  assert.equal(paginator.get('hasPreviousPage'), true);
});

test('has next page', function(assert) {
  const paginator = Paginator.create({
    content: [1, 2, 3, 4],
    pageSize: 2
  });

  assert.equal(paginator.get('hasNextPage'), true);

  paginator.set('page', 2);
  assert.equal(paginator.get('hasNextPage'), false);
});
