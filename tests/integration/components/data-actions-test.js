import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('data-actions', 'Integration | Component | {{data-actions}}', {
  integration: true
});

test('shows given actions', function(assert) {
  this.set('listActions', [
    { label: "edit",   action() {}},
    { label: "delete", action() {}}
  ]);

  this.render(hbs`{{data-actions actionList=listActions}}`);

  const $actions = this.$('.data-grid__actions');
  assert.equal($actions.length, 1, 'shows actions');

  const $actionList = $actions.eq(0).find('.data-grid__actions__action');
  assert.equal($actionList.length, 2, 'shows list of actions');

  assert.equal($actionList[0].innerText.trim().toUpperCase(), 'EDIT',
               'shows label of first action');
  assert.equal($actionList[1].innerText.trim().toUpperCase(), 'DELETE',
               'shows label of second action');
});

test('clicking action calls action with objects', function(assert) {
  assert.expect(2);

  const Alex = { id: 1, name: 'Alex' };
  const Bart = { id: 2, name: 'Bart' };
  const list = [Alex, Bart];

  this.set('objects', list);

  this.set('listActions', [
    {
      label: "edit",
      action(objects) {
        assert.deepEqual(objects, list, 'calls first action with objects');
      }
    },
    {
      label: "delete",
      action(objects) {
        assert.deepEqual(objects, list, 'calls second action with objects');
      }
    },
  ]);

  this.render(hbs`{{data-actions objects=objects
                                 actionList=listActions}}`);

  const $actionList = this.$('.data-grid__actions__action');
  $actionList.eq(0).trigger('click');
  $actionList.eq(1).trigger('click');
});

test('finishing action shows return message', function(assert) {
  const Alex = { id: 1, name: 'Alex' };
  const Bart = { id: 2, name: 'Bart' };
  const list = [Alex, Bart];

  this.set('objects', list);

  this.set('listActions', [
    {
      label: "edit",
      action(objects) {
        const names = objects.map((o) => { return o.name;}).join(' and ');
        return `Objects ${names} are updated`;
      }
    }
  ]);

  this.render(hbs`{{data-actions objects=objects
                                 actionList=listActions}}`);

  const $actionList = this.$('.data-grid__actions__action');
  $actionList.eq(0).trigger('click');

  const message = this.$('.data-grid__actions__message')[0].innerText;
  assert.equal(message, 'Objects Alex and Bart are updated');
});
