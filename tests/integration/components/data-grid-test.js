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
