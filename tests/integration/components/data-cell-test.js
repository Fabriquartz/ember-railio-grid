import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import run from 'ember-runloop';
import set from 'ember-metal/set';

moduleForComponent('data-cell', 'Integration | Component | {{data-cell}}', {
  integration: true
});

test('shows the right value from the object', function(assert) {
  set(this, 'item', { id: 1, name: 'Foo Bar' });
  set(this, 'property', { key: 'name', label: 'animal name' });

  this.render(hbs`{{data-cell item=item property=property}}`);
  assert.equal(this.$('td')[0].innerText, 'Foo Bar');
  assert.equal(this.$('td')[0].title, 'Foo Bar');
});

test('shows multiple properties from the object', function(assert) {
  set(this, 'item', { id: 1, firstName: 'Foo', lastName: 'Bar' });
  set(this, 'property', { key: ['firstName','lastName'], label: 'name' });

  this.render(hbs`{{data-cell item=item property=property}}`);

  assert.equal(this.$('td')[0].innerText, 'Foo, Bar');
});

test('formats the value by the format function', function(assert) {
  set(this, 'item', { id: 1, name: 'Foo Bar' });
  set(this, 'property', {
    key:   'name',
    label: 'animal name',
    format(value) {
      return `name: ${value}`;
    }
  });

  this.render(hbs`{{data-cell item=item property=property}}`);

  assert.equal(this.$('td')[0].innerText, 'name: Foo Bar');
});

test('formats for multiple values', function(assert) {
  set(this, 'item', { id: 1, firstName: 'Foo', lastName: 'Bar' });
  set(this, 'property', {
    key:   ['firstName', 'lastName'],
    label: 'name',
    format(firstName, lastName) {
      return `${firstName} - ${lastName}`;
    }
  });

  this.render(hbs`{{data-cell item=item property=property}}`);

  assert.equal(this.$('td')[0].innerText, 'Foo - Bar');
});

test('styles the cell depending on value', function(assert) {
  set(this, 'item', { name: 'Foo', age: 5 });
  set(this, 'property', {
    key:   'age',
    label: 'Age',
    style: {
      backgroundColor(value) {
        if (value > 0) {
          return 'green';
        }
        return 'red';
      }
    }
  });

  this.render(hbs`{{data-cell item=item property=property}}`);

  let $cell = this.$('td').eq(0);
  assert.equal($cell.css('background-color'), 'rgb(0, 128, 0)');

  run(() => set(this, 'item.age', -2));
  assert.equal($cell.css('background-color'), 'rgb(255, 0, 0)');
});
