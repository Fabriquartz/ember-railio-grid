import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('data-col', 'Integration | Component | {{data-col}}', {
  integration: true
});

test('shows the right value from the object', function(assert) {
  this.set('item', { id: 1, name: 'Foo Bar' });
  this.set('property', { key: 'name', label: 'animal name' });

  this.render(hbs`{{data-col item=item property=property}}`);

  assert.equal(this.$('td')[0].innerText, 'Foo Bar');
});

test('formats the value by the format function', function(assert) {
  this.set('item', { id: 1, name: 'Foo Bar' });
  this.set('property', {
    key:   'name',
    label: 'animal name',
    format: function(value) {
      return 'name: ' + value;
    }
  });

  this.render(hbs`{{data-col item=item property=property}}`);

  assert.equal(this.$('td')[0].innerText, 'name: Foo Bar');
});
