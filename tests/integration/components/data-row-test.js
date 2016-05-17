import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import run from 'ember-runloop';
import set from 'ember-metal/set';

moduleForComponent('data-row', 'Integration | Component | {{data-row}}', {
  integration: true
});

test('data-row is a tr with class data-grid__row', function(assert) {
  this.render(hbs`{{data-row}}`);

  assert.equal(this.$('tr').length, 1, 'is a table row');
  assert.ok(this.$('tr').hasClass('data-grid__row'), 'has class data-grid__row');
});

test('renders row with given properties values', function(assert) {
  set(this, 'item', {
    id:      2,
    name:    'Alex',
    species: 'dog'
  });

  set(this, 'propertiesList', [
    { key: 'id' },
    { key: 'name' },
    { key: 'species' }
  ]);

  this.render(hbs`{{data-row item=item
                             properties=propertiesList}}`);

  let $cols = this.$('td');

  assert.equal($cols[0].innerText, '2');
  assert.equal($cols[1].innerText, 'Alex');
  assert.equal($cols[2].innerText, 'dog');
});

test('checkbox for passed actions', function(assert) {
  set(this, 'hasActions', false);

  this.render(hbs`{{data-row hasActions=hasActions}}`);

  let $checkbox = this.$('input[type="checkbox"]');
  assert.equal($checkbox.length, 0, 'No checkbox when hasActions is false');

  run(() => set(this, 'hasActions', true));

  $checkbox = this.$('input[type="checkbox"]');
  assert.equal($checkbox.length, 1, 'No checkbox when hasActions is false');
});

test('clicking checkbox calls selectItem action', function(assert) {
  assert.expect(2);

  let Alex = { id: 3, name: 'Alex' };
  set(this, 'item', Alex);

  this.on('selectItem', function(value, item) {
    assert.deepEqual(item, Alex, 'calls selectItem with the clicked item');
    assert.deepEqual(value, true, 'calls selectItem with the selection value');
  });

  this.render(hbs`{{data-row item=item
                             hasActions=true
                             selectItem=(action "selectItem")}}`);

  let $checkbox = this.$('input[type="checkbox"]').eq(0);
  $checkbox.trigger('click');
});

test('when isSelected, gets a selected class', function(assert) {
  set(this, 'isSelected', false);

  this.render(hbs`{{data-row isSelected=isSelected}}`);

  assert.notOk(this.$('tr').hasClass('data-grid__row--selected'),
               'do not have selected class by default');

  run(() => set(this, 'isSelected', true));

  assert.ok(this.$('tr').hasClass('data-grid__row--selected'),
               'has selected class when row is selected');
});

test('when passed doubleClickAction, gets a clickable class', function(assert) {
  set(this, 'doubleClickAction', null);

  this.render(hbs`{{data-row doubleClickAction=doubleClickAction}}`);

  assert.notOk(this.$('tr').hasClass('data-grid__row--clickable'),
               'do not have clickable class by default');

  run(() => set(this, 'doubleClickAction', function() { }));

  assert.ok(this.$('tr').hasClass('data-grid__row--clickable'),
               'has clickable class when gets a doubleClickAction');
});

test('double clicking row calls doubleClickAction with item', function(assert) {
  assert.expect(1);

  let Alex = { id: 1, name: 'Alex' };

  set(this, 'item', Alex);

  set(this, 'doubleClickAction', function(item) {
    assert.deepEqual(item, Alex, 'calls with clicked item');
  });

  this.render(hbs`{{data-row item=item
                             doubleClickAction=doubleClickAction}}`);

  this.$('tr').trigger('dblclick');
});

test('double clicking checkbox does not trigger doubleclick action', function(assert) {
  assert.expect(0);

  set(this, 'item', { id: 1, name: 'Alex' });

  set(this, 'doubleClickAction', function() {
    assert.notOk(true, 'does not call doubleclick action on checkbox');
  });

  this.render(hbs`{{data-row item=item
                             hasActions=true
                             doubleClickAction=doubleClickAction}}`);

  let $checkbox = this.$('input[type="checkbox"]').eq(0);
  $checkbox.trigger('dblclick');
});
