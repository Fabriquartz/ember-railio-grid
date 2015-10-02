import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('data-actions', 'Integration | Component | {{data-actions}}', {
  integration: true
});

test('by default actions are hidden', function(assert) {
  this.set('listActions', [
    { label: "edit",   action() {}},
    { label: "delete", action() {}}
  ]);

  this.render(hbs`{{data-actions actions=listActions}}`);

  const $actionList = this.$('.data-grid__actions__list');
  assert.equal($actionList.css('display'), 'none', 'by default hide list');
});

test('shows given actions', function(assert) {
  this.set('listActions', [
    { label: "edit",   action() {}},
    { label: "delete", action() {}}
  ]);

  this.render(hbs`{{data-actions actions=listActions}}`);

  const $actions = this.$('.data-grid__actions');
  assert.equal($actions.length, 1, 'shows actions');

  const $actionList = $actions.eq(0).find('.data-grid__actions__list__action');
  assert.equal($actionList.length, 2, 'shows list of actions');

  assert.equal($actionList[0].innerText.trim().toUpperCase(), 'EDIT',
               'shows label of first action');
  assert.equal($actionList[1].innerText.trim().toUpperCase(), 'DELETE',
               'shows label of second action');
});

test('clicking action calls action', function(assert) {
  assert.expect(2);

  const Alex = { id: 1, name: 'Alex',   type: 'dog' };
  this.set('object', Alex);

  this.set('listActions', [
    {
      label: "edit",
      action(object) {
        assert.equal(object, Alex, 'calls first action with right object');
      }
    },
    {
      label: "delete",
      action(object) {
        assert.equal(object, Alex, 'calls second action with right object');
      }
    },
  ]);

  this.render(hbs`{{data-actions object=object
                                 actions=listActions}}`);

  const $actionList = this.$('.data-grid__actions__list__action');
  $actionList.eq(0).trigger('click');
  $actionList.eq(1).trigger('click');
});
