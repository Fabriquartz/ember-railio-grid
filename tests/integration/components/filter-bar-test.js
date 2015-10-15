import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import Filterer from 'ember-railio-grid/utils/filterer';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('filter-bar', 'Integration | Component | {{filter-bar}}', {
  integration: true,

  beforeEach: function() {
    this.set('filterer', Filterer.create({
      content: [1, 2, 3, 4, 5, 6]
    }));

    this.set('properties', [
      {key: "id", label: "id"},
      {key: "name", label: "name"},
      {key: "type", label: "type"}
    ]);

    this.render(hbs`{{filter-bar filterer=filterer properties=properties}}`);
  }
});

test('shows inputs for new filter', function(assert) {
  const $newValue      = this.$('.filter-bar .filter-bar__new');
  const $inputValue    = $newValue.find('input.filter-bar__new--value');
  const $inputProperty = $newValue.find('select.filter-bar__new--property');
  const $inputType     = $newValue.find('select.filter-bar__new--type');
  const $inputSubmit   = $newValue.find('button');

  assert.equal($newValue.length,      1, 'shows new value bar');
  assert.equal($inputValue.length,    1, 'shows input value');
  assert.equal($inputProperty.length, 1, 'shows select property');
  assert.equal($inputType.length,     1, 'shows select type');
  assert.equal($inputSubmit.length,   1, 'shows submit button');
  assert.equal($inputSubmit.text(), 'Add', 'shows submit button Add');
});

test('new filter shows list of properties', function(assert) {
  const $selectProperty = this.$('.filter-bar__new--property');
  const $properties = $selectProperty.find('option');

  assert.equal($properties.length, 4);
});

test('new filter shows list of filterTypes', function(assert) {
  const $selectProperty = this.$('.filter-bar__new--type');
  const $properties = $selectProperty.find('option');

  assert.equal($properties.length, 9);
});

test('adding new filter', function(assert) {
  const $inputValue    = this.$('input.filter-bar__new--value');
  const $inputProperty = this.$('select.filter-bar__new--property');
  const $inputType     = this.$('select.filter-bar__new--type');
  const $inputSubmit   = this.$('.filter-bar button');

  run(() => {
    $inputProperty.val('name');
    $inputProperty.trigger('change');

    $inputType.val('startsWith');
    $inputType.trigger('change');

    $inputValue.trigger('focusin');
    $inputValue.val('abc');
    $inputValue.trigger('input');

  });

  $inputSubmit.trigger('click');

  const $addedFilter = this.$('.filter-bar__filter');
  assert.equal($addedFilter.length, 1, 'shows added filter');

  assert.equal($addedFilter[0].innerText.trim(),
               'name starts with abc',
               'shows filter value');
});

test('removing filter', function(assert) {
  run(() => {
    this.get('filterer').addFilter('contains', 'name', 'abc');
  });

  const $addedFilter = this.$('.filter-bar__filter').eq(0);
  const $removeFilter = $addedFilter.find('.filter-bar__filter__remove');

  $removeFilter.trigger('click');

  const $filters = this.$('.filter-bar__filter');
  assert.equal($filters.length, 0, 'removed the filter visual');
});
