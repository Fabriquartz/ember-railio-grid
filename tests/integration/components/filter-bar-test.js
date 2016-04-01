import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import FilteringHandler from 'ember-railio-grid/utils/filtering-handler';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('filter-bar', 'Integration | Component | {{filter-bar}}', {
  integration: true,

  beforeEach() {
    this.set('filteringHandler', FilteringHandler.create({
      content: [1, 2, 3, 4, 5, 6]
    }));

    this.set('properties', [
      { key: 'id', label: 'id' },
      { key: 'name', label: 'name' },
      { key: 'type', label: 'type' }
    ]);

    this.render(hbs`{{filter-bar handler=filteringHandler properties=properties}}`);
  }
});

test('shows inputs for new filter', function(assert) {
  let $newValue      = this.$('.filter-bar .filter-bar__new');
  let $inputValue    = $newValue.find('input.filter-bar__new--value');
  let $inputProperty = $newValue.find('select.filter-bar__new--property');
  let $inputType     = $newValue.find('select.filter-bar__new--type');
  let $inputSubmit   = $newValue.find('input[type="submit"]');

  assert.equal($newValue.length,      1, 'shows new value bar');
  assert.equal($inputValue.length,    1, 'shows input value');
  assert.equal($inputProperty.length, 1, 'shows select property');
  assert.equal($inputType.length,     1, 'shows select type');
  assert.equal($inputSubmit.length,   1, 'shows submit button');
  assert.equal($inputSubmit.val(), 'Add', 'shows submit button Add');
});

test('new filter shows list of properties', function(assert) {
  let $selectProperty = this.$('.filter-bar__new--property');
  let $properties = $selectProperty.find('option');

  assert.equal($properties.length, 4);
});

test('new filter shows list of filterTypes', function(assert) {
  let $selectProperty = this.$('.filter-bar__new--type');
  let $properties = $selectProperty.find('option');

  assert.equal($properties.length, 9);
});

test('adding new filter', function(assert) {
  let $inputValue    = this.$('input.filter-bar__new--value');
  let $inputProperty = this.$('select.filter-bar__new--property');
  let $inputType     = this.$('select.filter-bar__new--type');

  run(() => {
    $inputProperty.val('name');
    $inputProperty.trigger('change');

    $inputType.val('start');
    $inputType.trigger('change');

    $inputValue.trigger('focusin');
    $inputValue.val('abc');
    $inputValue.trigger('input');
    $inputValue.trigger('submit');
  });

  let $addedFilter = this.$('.filter-bar__filter');
  assert.equal($addedFilter.length, 1, 'shows added filter');

  assert.equal($addedFilter[0].innerText.trim(),
               'name starts with abc',
               'shows filter value');
});

test('removing filter', function(assert) {
  run(() => {
    this.get('filteringHandler').addFilter('cont', 'name', 'abc');
  });

  let $addedFilter = this.$('.filter-bar__filter').eq(0);
  let $removeFilter = $addedFilter.find('.filter-bar__filter__remove');

  $removeFilter.trigger('click');

  let $filters = this.$('.filter-bar__filter');
  assert.equal($filters.length, 0, 'removed the filter visual');
});
