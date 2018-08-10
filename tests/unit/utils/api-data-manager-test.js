/* global server */

import { moduleForComponent, test } from 'ember-qunit';

import getOwner    from 'ember-owner/get';
import startMirage from '../../helpers/setup-mirage-for-integration';

let APIDataManager, dataManager;

moduleForComponent('Unit | Utility | api-data-manager', {
  integration: true,

  beforeEach() {
    startMirage(this.container);
    server.createList('animal', 12);
    APIDataManager = getOwner(this).factoryFor('util:api-data-manager');
    dataManager = APIDataManager.create({
      modelName: 'animal'
    });
  }
});

test('inherits from data-manager', function(assert) {
  assert.ok(dataManager instanceof APIDataManager.class);
});

test('has a managedContent array from the api', function(assert) {
  let done = assert.async();
  dataManager.get('managedContent').then((managedContent) => {
    assert.equal(managedContent.get('length'), 12);
    done();
  });
});

test('managedContentArray is filtered', function(assert) {
  let done = assert.async();

  dataManager.get('filteringHandler').addFilter('type', 'eq', 'dog');

  dataManager.get('managedContent').then((managedContent) => {
    assert.equal(managedContent.get('length'), 6);
    done();
  });
});

test('filters content on predefined filters', function(assert) {
  let done = assert.async();

  dataManager.set('predefinedFilters', [
    { propertyPath: 'type', 'filter': 'eq',  value: 'dog' }
  ]);

  dataManager.get('managedContent').then((managedContent) => {
    assert.equal(managedContent.get('length'), 6);
    done();
  });
});

test('managedContentArray is paginated', function(assert) {
  let done = assert.async();

  dataManager.set('paginatingHandler.pageSize', 8);
  dataManager.set('paginatingHandler.page', 1);

  dataManager.get('managedContent').then((managedContent) => {
    assert.equal(managedContent.get('length'), 8);
  });

  dataManager.set('paginatingHandler.page', 2);

  dataManager.get('managedContent').then((managedContent) => {
    assert.equal(managedContent.get('length'), 4);
    done();
  });
});

test('managedContentArray is sorted', function(assert) {
  let done = assert.async();

  dataManager.get('sortingHandler').addSortKey('name');

  dataManager.get('managedContent').then((managedContent) => {
    assert.equal(managedContent.objectAt(0).get('name'), 'Alex');
    assert.equal(managedContent.objectAt(1).get('name'), 'Ben');
    assert.equal(managedContent.objectAt(2).get('name'), 'Chris');
    assert.equal(managedContent.objectAt(3).get('name'), 'Dave');
    assert.equal(managedContent.objectAt(4).get('name'), 'Edward');
    assert.equal(managedContent.objectAt(5).get('name'), 'Frank');
    done();
  });
});
