import Paginator from 'ember-railio-grid/utils/paginator';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('data-grid', 'Unit | Component | data-grid', {
  unit: true
});

test('creates a default paginator with content', function(assert) {
  const dataGrid = this.subject({
    content: [1, 2, 3, 4],
    page: 1
  });

  assert.notEqual(dataGrid.get('paginator'), null);
  assert.ok(dataGrid.get('paginator') instanceof Paginator);
});

test('assigns attributes to paginator', function(assert) {
  const dataGrid = this.subject({
    content:   [1, 2, 3, 4],
    paginator: Paginator.create(),
    page:      2,
    pageSize:  2
  });

  assert.equal(dataGrid.get('paginator.page'), 2);
  assert.equal(dataGrid.get('paginator.pageSize'), 2);
  assert.deepEqual(dataGrid.get('paginator.content'), [1, 2, 3, 4]);
});

test('goToPage', function(assert) {
  const dataGrid = this.subject({ content: [1, 2, 3, 4], pageSize: 2 });

  dataGrid.send('goToPage', 2);
  assert.equal(dataGrid.get('page'), 2);
});

test('nextPage', function(assert) {
  const dataGrid = this.subject({ content: [1, 2, 3, 4], pageSize: 2 });

  dataGrid.send('nextPage');
  assert.equal(dataGrid.get('page'), 2);
});

test('previousPage', function(assert) {
  const dataGrid = this.subject({ content: [1, 2, 3, 4], page: 2, pageSize: 2 });

  dataGrid.send('previousPage');
  assert.equal(dataGrid.get('page'), 1);
});
