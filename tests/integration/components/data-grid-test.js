import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

function buildSmallList() {
  return [
    Ember.Object.create({ id: 1, name: 'Ben', type: 'dog' }),
    Ember.Object.create({ id: 2, name: 'Alex', type: 'dog' }),
    Ember.Object.create({ id: 3, name: 'Chris', type: 'cat' })
  ];
}

function buildList(length) {
  const list = [];

  for (let i = 1; i <= length;i++) {
    const object = Ember.Object.create({
      id:   i,
      name: 'Name' + i,
      type: 'type' + i
    });

    list.push(object);
  }

  return list;
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

  assert.equal($headerColls[0].innerText.toUpperCase(), 'ID');
  assert.equal($headerColls[1].innerText.toUpperCase(), 'NAME');
  assert.equal($headerColls[2].innerText.toUpperCase(), 'TYPE');

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

  const $table        = this.$('.data-grid table');
  const $headerColls  = $table.find('thead tr').eq(0).find('th');
  const $contentColls = $table.find('tbody tr').eq(0).find('td');

  assert.equal($headerColls[0].innerText.toUpperCase(), 'NR');
  assert.equal($headerColls[1].innerText.toUpperCase(), 'NAME');
  assert.equal($headerColls[2].innerText.toUpperCase(), 'SPECIES');

  assert.equal($contentColls[0].innerText, '1');
  assert.equal($contentColls[1].innerText, 'Ben');
  assert.equal($contentColls[2].innerText, 'dog');
});

test('pagination', function(assert) {
  this.set('list', buildList(12));

  this.render(hbs`{{data-grid content=list
                              properties="id name type"
                              pageSize=5}}`);

  const $table  = this.$('.data-grid table');
  let $rows     = $table.find('tbody tr');
  let $firstRow = $rows.eq(0).find('td');

  assert.equal($rows.length, 5, 'shows pageSize limited content');
  assert.equal($firstRow[0].innerText, '1',
              'first page starts with first element');

  const $currentPage = this.$('.data-grid__paging__current');
  assert.equal($currentPage.val(), '1', 'first page selected by default');

  $currentPage.focusin();
  $currentPage.val('3');
  $currentPage.focusout();

  $rows     = $table.find('tbody tr');
  $firstRow = $rows.eq(0).find('td');

  assert.equal($rows.length, 2, 'shows end content');
  assert.equal($firstRow[0].innerText, '11',
              'third page starts with right element');
});

test('pagination input arrow up/down', function(assert) {
  this.set('list', buildList(4));

  this.render(hbs`{{data-grid content=list
                              properties="id name type"
                              pageSize=1}}`);

  const $table  = this.$('.data-grid table');
  let $rows     = $table.find('tbody tr');
  let $firstRow = $rows.eq(0).find('td');

  const $currentPage = this.$('.data-grid__paging__current');
  assert.equal($currentPage.val(), '1', 'first page selected by default');

  $currentPage.trigger('focusin');
  $currentPage.trigger($.Event('keydown', { keyCode: 38 }));
  $currentPage.trigger($.Event('keydown', { keyCode: 38 }));

  assert.equal($currentPage.val(), '3', 'arrow up increases page');

  $rows     = $table.find('tbody tr');
  $firstRow = $rows.eq(0).find('td');

  assert.equal($firstRow[0].innerText, '3',
              'third page starts with right element');

  $currentPage.trigger('focusin');
  $currentPage.trigger($.Event('keydown', { keyCode: 40 }));

  assert.equal($currentPage.val(), '2', 'arrow down decreases page');
});

test('pagination previous / next', function(assert) {
  this.set('list', buildList(6));

  this.render(hbs`{{data-grid content=list
                              properties="id name type"
                              pageSize=1}}`);

  const $first    = this.$('.data-grid__paging__first:eq(0)');
  const $previous = this.$('.data-grid__paging__previous:eq(0)');
  const $next     = this.$('.data-grid__paging__next:eq(0)');
  const $last     = this.$('.data-grid__paging__last:eq(0)');

  const $currentPage = this.$('.data-grid__paging__current');

  assert.equal($currentPage.val(), '1', 'first page selected by default');

  $next.trigger('click');
  assert.equal($currentPage.val(), '2', 'next page selected');

  $last.trigger('click');
  assert.equal($currentPage.val(), '6', 'last page selected');

  $previous.trigger('click');
  assert.equal($currentPage.val(), '5', 'previous page selected');

  $first.trigger('click');
  assert.equal($currentPage.val(), '1', 'first page selected');
});
