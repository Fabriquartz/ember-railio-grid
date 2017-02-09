import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import set from 'ember-metal/set';

moduleForComponent('data-column', 'Integration | Component | {{data-column}}', {
  integration: true
});

test('styles the column with different width suffix', function(assert) {
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
  this.render(hbs`{{data-column item=item property=property}}`);

  let $cell = this.$('col').eq(0);

  let em = parseInt($cell.css('font-size').replace('px', ''));
  let borderWidth = 2 * em;

  assert.equal($cell.css('width'),      '30px',             'width in px');
  assert.equal($cell.css('border-width'), `${borderWidth}px`, 'borderWidth in em');
});

test('styles the column with given styling', function(assert) {
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

  this.render(hbs`{{data-column item=item property=property}}`);

  let $cell = this.$('col').eq(0);

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
