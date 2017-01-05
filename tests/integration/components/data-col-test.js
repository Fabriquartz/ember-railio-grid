import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import run from 'ember-runloop';
import set from 'ember-metal/set';

moduleForComponent('data-col', 'Integration | Component | {{data-col}}', {
  integration: true
});

test('shows the right value from the object', function(assert) {
  set(this, 'item', { id: 1, name: 'Foo Bar' });
  set(this, 'property', { key: 'name', label: 'animal name' });

  this.render(hbs`{{data-col item=item property=property}}`);

  assert.equal(this.$('td')[0].innerText, 'Foo Bar');
  assert.equal(this.$('td')[0].title, 'Foo Bar');
});

test('shows multiple properties from the object', function(assert) {
  set(this, 'item', { id: 1, firstName: 'Foo', lastName: 'Bar' });
  set(this, 'property', { key: ['firstName','lastName'], label: 'name' });

  this.render(hbs`{{data-col item=item property=property}}`);

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

  this.render(hbs`{{data-col item=item property=property}}`);

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

  this.render(hbs`{{data-col item=item property=property}}`);

  assert.equal(this.$('td')[0].innerText, 'Foo - Bar');
});

test('styles the cell with different width suffix', function(assert) {
  set(this, 'item', { id: 1, name: 'Foo' });
  set(this, 'property', {
    key: 'name',
    label: 'animal name',
    style: {
      width: '30px',
      borderWidth: '2em',
      borderStyle: 'dotted',
      borderColor: 'blue'
    }
  });
  this.render(hbs`{{data-col item=item property=property}}`);

  let $cell = this.$('td').eq(0);

  let em = parseInt($cell.css('font-size').replace('px', ''));
  let borderWidth = 2 * em;

  assert.equal($cell.css('width'),      '30px',             'width in px');
  assert.equal($cell.css('border-width'), `${borderWidth}px`, 'borderWidth in em');
});

test('styles the cell with given styling', function(assert) {
  set(this, 'item', { id: 1, name: 'Foo' });
  set(this, 'property', {
    key:   'name',
    label: 'animal name',
    style:  {
      width:           20,
      horizontalAlign: 'center',
      verticalAlign:   'bottom',
      backgroundColor: 'red',
      fontFamily:      'Sans',
      fontWeight:      300,
      italic:          true,
      fontColor:       'green',
      borderWidth:     4,
      borderColor:     'blue',
      borderStyle:     'dotted'
    }
  });

  this.render(hbs`{{data-col item=item property=property}}`);

  let $cell = this.$('td').eq(0);

  let em    = parseInt($cell.css('font-size').replace('px', ''));
  let width = 20 * em;

  assert.equal($cell.css('width'),            `${width}px`,     'width');
  assert.equal($cell.css('text-align'),       'center',         'horizontalAlign');
  assert.equal($cell.css('vertical-align'),   'bottom',         'verticalAlign');
  assert.equal($cell.css('background-color'), 'rgb(255, 0, 0)', 'backgroundColor');
  assert.equal($cell.css('font-family'),      'Sans',           'fontFamily');
  assert.equal($cell.css('font-weight'),      '300',            'fontWeight');
  assert.equal($cell.css('font-style'),       'italic',         'italic');
  assert.equal($cell.css('color'),            'rgb(0, 128, 0)', 'fontColor');
  assert.equal($cell.css('border-width'),     '4px',            'borderWidth');
  assert.equal($cell.css('border-color'),     'rgb(0, 0, 255)', 'borderColor');
  assert.equal($cell.css('border-style'),     'dotted',         'borderStyle');
});

test('styles the cell depending on value', function(assert) {
  set(this, 'item', { name: 'Foo', age: 5 });
  set(this, 'property', {
    key:   'age',
    label: 'Age',
    style:  {
      backgroundColor(value) {
        if (value > 0) {
          return 'green';
        }
        return 'red';
      }
    }
  });

  this.render(hbs`{{data-col item=item property=property}}`);

  let $cell = this.$('td').eq(0);
  assert.equal($cell.css('background-color'), 'rgb(0, 128, 0)');

  run(() => set(this, 'item.age', -2));
  assert.equal($cell.css('background-color'), 'rgb(255, 0, 0)');
});
