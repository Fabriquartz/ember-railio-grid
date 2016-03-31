import PaginatingHandler from 'ember-railio-grid/utils/paginating-handler';
import { moduleForComponent, test } from 'ember-qunit';

let paginator;

moduleForComponent('main-paginator', 'Unit | Component | main-paginator', {
  unit: true,
  beforeEach() {
    paginator = this.subject({
      handler: PaginatingHandler.create({ contentLength: 8, pageSize: 2 })
    });
  }
});

test('action go to page', function(assert) {
  paginator.send('goToPage', 3);

  assert.equal(paginator.get('handler.page'), 3);
});

test('action first page', function(assert) {
  paginator.send('goToPage', 3);
  paginator.send('firstPage');

  assert.equal(paginator.get('handler.page'), 1);
});

test('action last page', function(assert) {
  paginator.send('lastPage');

  assert.equal(paginator.get('handler.page'), 4);
});

test('action previous page', function(assert) {
  paginator.send('goToPage', 3);
  paginator.send('previousPage');

  assert.equal(paginator.get('handler.page'), 2);
});

test('action next page', function(assert) {
  paginator.send('nextPage');

  assert.equal(paginator.get('handler.page'), 2);
});
