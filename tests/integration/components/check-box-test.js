import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import run from 'ember-runloop';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

moduleForComponent('check-box', 'Integration | Component | {{check-box}}', {
  integration: true,
  beforeEach() {
    this.on('update', function(object, propertyPath, value) {
      set(object, propertyPath, value);
    });
  }
});

test(`renders a checkbox with class check-box`, function(assert) {
  this.render(hbs`{{check-box}}`);

  let $checkbox = this.$('input.check-box[type="checkbox"]');
  assert.equal($checkbox.length, 1);
});

test(`has given value`, function(assert) {
  set(this, 'selected', true);
  this.render(hbs`{{check-box value=selected}}`);

  let $checkbox = this.$('.check-box')[0];
  assert.equal($checkbox.checked, true, 'is checked');
});

test(`changing changes value and calls update function`, function(assert) {
  assert.expect(3);
  set(this, 'selected', true);
  this.on('update', function(value) {
    assert.equal(value, false, 'calls update function with new value');
    set(this, 'selected', value);
  });

  this.render(hbs`{{check-box value=selected updated=(action "update")}}`);

  let $checkbox = this.$('.check-box');

  run(() => {
    $checkbox.trigger('click');
  });
  assert.equal($checkbox[0].checked, false, 'got unchecked');
  assert.equal(get(this, 'selected'), false, 'value changed');
});
