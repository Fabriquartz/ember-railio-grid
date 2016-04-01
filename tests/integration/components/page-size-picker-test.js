import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import run from 'ember-runloop';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

moduleForComponent('page-size-picker',
                   'Integration | Component | {{page-size-picker}}', {
  integration: true
});

test('shows pageSize options', function(assert) {
  this.render(hbs`{{page-size-picker value=10 maxValue=100}}`);

  let $sizes = this.$('.page-size-picker__size');

  assert.equal($sizes[0].innerText, '10', 'first size = 10');
  assert.equal($sizes[1].innerText, '50', 'second size = 50');
  assert.equal($sizes[2].innerText, '100', 'third size = 100');
  assert.equal($sizes[3].innerText, 'all', 'fourth size = all');
});

test('do not show input when currentValue in sizes list', function(assert) {
  this.render(hbs`{{page-size-picker value=10 maxValue=100}}`);

  let $sizes = this.$('.page-size-picker__size');
  let $input = this.$('.page-size-picker__input');

  assert.equal($sizes[$sizes.length - 1].innerText, 'other', 'show other');
  assert.equal($input.length, 0, 'do not show input');
});

test('show inputfield when currentValue not in sizes list', function(assert) {
  this.render(hbs`{{page-size-picker value=5 maxValue=100}}`);

  let $sizes = this.$('.page-size-picker__size');
  let $input = this.$('.page-size-picker__input');

  assert.equal($sizes[$sizes.length - 1].innerText, 'all', 'do not show other');
  assert.equal($input.length, 1, 'show input');
  assert.equal($input.val(), '5', 'input has current pageSize');
});

test(`clicking on 'other' shows inputfield`, function(assert) {
  this.render(hbs`{{page-size-picker value=10 maxValue=100}}`);

  let $sizes = this.$('.page-size-picker__size');
  let $other = $sizes[$sizes.length - 1];

  run(() => {
    assert.equal($other.innerText, 'other', 'show other');
    $($other).eq(0).trigger('click');
  });

  let $input = this.$('.page-size-picker__input');
  assert.equal($input.length, 1, 'show input');
});

test(`clicking on a size sets pageSize`, function(assert) {
  set(this, 'value', 1);
  this.render(hbs`{{page-size-picker value=value maxValue=100}}`);

  let $sizes = this.$('.page-size-picker__size');

  run(() => {
    $sizes.eq(1).trigger('click');
  });

  assert.equal(get(this, 'value'), 50, 'pageSize is set to clicked size');
});

test('changing input changes pageSize', function(assert) {
  set(this, 'value', 1);
  this.render(hbs`{{page-size-picker value=value maxValue=100}}`);

  let $input = this.$('.page-size-picker__input');
  $input.trigger('focusin');
  $input.val(30);
  $input.trigger('focusout');

  assert.equal(get(this, 'value'), 30);
});
