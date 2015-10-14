import Ember from 'ember';
import DataManager from 'ember-railio-grid/utils/data-manager';
import { moduleForComponent, test } from 'ember-qunit';

const { run } = Ember;

moduleForComponent('data-grid', 'Unit | Component | data-grid', {
  unit: true
});

test('creates a default dataManager with content', function(assert) {
  let dataGrid;
  run(() => {
    dataGrid = this.subject({
      content: [1, 2, 3, 4]
    });
  });

  const dataManager = dataGrid.get('dataManager');

  assert.notEqual(dataManager, null, 'dataManager is defined');
  assert.ok(dataManager instanceof DataManager,
            'dataManager is of type DataManager');
  assert.deepEqual(dataManager.get('content'), [1, 2, 3, 4],
                   'dataManager gets content');
});
