import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

const { run } = Ember;

function buildSmallList() {
  return [
    Ember.Object.create({ id: 1, name: 'Ben',   type: 'dog' }),
    Ember.Object.create({ id: 2, name: 'Alex',  type: 'dog' }),
    Ember.Object.create({ id: 3, name: 'Chris', type: 'cat' })
  ];
}

moduleForComponent('data-grid', 'Integration | Component | {{data-grid}}', {
  integration: true
});

test('renders the table with given content', function(assert) {
  this.set('list', buildSmallList());

  this.render(hbs`{{data-grid content=list}}`);

  const $table = this.$('.data-grid table');
  const $rows  = $table.find('tbody tr');

  assert.equal($table.length, 1, 'renders table');
  assert.equal($rows.length, 3, 'renders rows for each item');
});

test('renders with display options', function(assert) {
  this.set('list', buildSmallList());
  this.set('showHeader', true);

  this.render(hbs`{{data-grid content=list
                              showHeader=showHeader
                              width=800}}`);

  const $table = this.$('.data-grid table');
  let $header  = $table.find('thead');

  assert.equal($header.length, 1, 'shows header by default');
  assert.equal($table.outerWidth(), 800, 'renders with given width');

  this.set('showHeader', false);

  $header = $table.find('thead');
  assert.equal($header.length, 0, 'hides header on showHeader=false');
});

test('shows label and value for properties string', function(assert) {
  this.set('list', buildSmallList());

  this.render(hbs`{{data-grid content=list
                              properties="id name type"}}`);

  const $table        = this.$('.data-grid table');
  const $headerColls  = $table.find('thead tr').eq(0).find('th');
  const $contentColls = $table.find('tbody tr').eq(0).find('td');

  assert.equal($headerColls[0].innerText.toUpperCase().trim(), 'ID');
  assert.equal($headerColls[1].innerText.toUpperCase().trim(), 'NAME');
  assert.equal($headerColls[2].innerText.toUpperCase().trim(), 'TYPE');

  assert.equal($contentColls[0].innerText, '1');
  assert.equal($contentColls[1].innerText, 'Ben');
  assert.equal($contentColls[2].innerText, 'dog');
});

test('shows label and value for properties array with objects', function(assert) {
  const properties = [
    { key: 'id', label: 'nr' },
    'name',
    { key: 'type', label: 'species' }
  ];

  this.set('list', buildSmallList());
  this.set('properties', properties);
  this.render(hbs`{{data-grid content=list
                              properties=properties}}`);

  const $table       = this.$('.data-grid table');
  const $headerCols  = $table.find('thead tr').eq(0).find('th');
  const $contentCols = $table.find('tbody tr').eq(0).find('td');

  assert.equal($headerCols[0].innerText.toUpperCase().trim(), 'NR');
  assert.equal($headerCols[1].innerText.toUpperCase().trim(), 'NAME');
  assert.equal($headerCols[2].innerText.toUpperCase().trim(), 'SPECIES');

  assert.equal($contentCols[0].innerText, '1');
  assert.equal($contentCols[1].innerText, 'Ben');
  assert.equal($contentCols[2].innerText, 'dog');
});

test('shows given topPaginator', function(assert) {
  const paginator = "page-picker-paginator";
  this.set('list', buildSmallList());
  this.set('topPaginator', null);

  this.render(hbs`{{data-grid content=list
                              topPaginator=topPaginator}}`);

  let $topPaginator = this.$('.paginator--top');
  assert.equal($topPaginator.length, 0, 'no top paginator by default');

  this.set('topPaginator', paginator);

  $topPaginator = this.$('.paginator--top');
  assert.ok($topPaginator.hasClass(paginator),
            'shows given top paginator');
});

test('shows given bottomPaginator', function(assert) {
  const paginator = "page-picker-paginator";
  this.set('list', buildSmallList());
  this.set('bottomPaginator', null);

  this.render(hbs`{{data-grid content=list
                              bottomPaginator=bottomPaginator}}`);

  let $bottomPaginator = this.$('.paginator--bottom');
  assert.equal($bottomPaginator.length, 0, 'no bottom paginator by default');

  this.set('bottomPaginator', paginator);

  $bottomPaginator = this.$('.paginator--bottom');
  assert.ok($bottomPaginator.hasClass(paginator),
            'shows given bottom paginator');
});

test('sort on clicking header', function(assert) {
  this.set('list', [
    { id: 1, name: 'Ben',    type: 'dog' },
    { id: 2, name: 'Alex',   type: 'dog' },
    { id: 3, name: 'Chris',  type: 'cat' },
    { id: 4, name: 'Edward', type: 'dog' },
    { id: 5, name: 'Dwight', type: 'cat' }
  ]);
  this.render(hbs`{{data-grid content=list
                              properties="id name type"}}`);

  const $table       = this.$('.data-grid table');
  const $headerCols  = $table.find('thead tr').eq(0).find('th span');

  run(() => {
    $headerCols.eq(1).trigger('click');
  });

  let $rows = $table.find('tbody tr');
  assert.equal($rows.eq(0).find('td')[1].innerText, 'Alex');
  assert.equal($rows.eq(1).find('td')[1].innerText, 'Ben');
  assert.equal($rows.eq(2).find('td')[1].innerText, 'Chris');
  assert.equal($rows.eq(3).find('td')[1].innerText, 'Dwight');
  assert.equal($rows.eq(4).find('td')[1].innerText, 'Edward');

  run(() => {
    $headerCols.eq(1).trigger('click');
  });

  $rows = $table.find('tbody tr');
  assert.equal($rows.eq(0).find('td')[1].innerText, 'Edward');
  assert.equal($rows.eq(1).find('td')[1].innerText, 'Dwight');
  assert.equal($rows.eq(2).find('td')[1].innerText, 'Chris');
  assert.equal($rows.eq(3).find('td')[1].innerText, 'Ben');
  assert.equal($rows.eq(4).find('td')[1].innerText, 'Alex');
});

test('shows actions on each row', function(assert) {
  this.set('list', [
    { id: 1, name: 'Ben',   type: 'dog' },
    { id: 2, name: 'Alex',  type: 'dog' },
    { id: 3, name: 'Chris', type: 'cat' }
  ]);

  this.set('listActions', [
    { label: "edit",   action() {}},
    { label: "delete", action() {}}
  ]);

  this.render(hbs`{{data-grid content=list
                              actions=listActions
                              properties="id name type"}}`);

  const $actions = this.$('.data-grid table tbody tr .data-grid__actions');
  assert.equal($actions.length, 3, 'shows actions for each row');
});
