import ArrayDataManager from 'ember-railio-grid/utils/array-data-manager';
import APIDataManager from 'ember-railio-grid/utils/api-data-manager';
import { moduleForComponent, test } from 'ember-qunit';

import run from 'ember-runloop';
import get from 'ember-metal/get';

moduleForComponent('data-grid', 'Unit | Component | data-grid', {
  unit: true
});

test('with content: has a ArrayDataManager with content', function(assert) {
  let dataGrid;
  run(() => {
    dataGrid = this.subject({
      content: [1, 2, 3, 4]
    });
    dataGrid.didReceiveAttrs();
  });

  let dataManager = get(dataGrid, 'dataManager');

  assert.notEqual(dataManager, null, 'dataManager is defined');
  assert.ok(dataManager instanceof ArrayDataManager,
            'dataManager is of type ArrayDataManager');
  assert.deepEqual(dataManager.get('content'), [1, 2, 3, 4],
                   'dataManager gets content');
});

test('with modelName: has a APIDataManager with content from API', function(assert) {
  let dataGrid;
  run(() => {
    dataGrid = this.subject({
      modelName: 'animal'
    });
    dataGrid.didReceiveAttrs();
  });

  let dataManager = dataGrid.get('dataManager');

  assert.notEqual(dataManager, null, 'dataManager is defined');
  assert.ok(dataManager instanceof APIDataManager,
            'dataManager is of type APIDataManager');
  assert.equal(dataManager.get('modelName'), 'animal', 'dataManager has modelName');
});
