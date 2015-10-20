import Ember from 'ember';

function buildLargeList(length) {
  const list = [];

  for (let i = 1; i <= length;i++) {
    const object = { id: i, name: 'Name' + i, type: 'type' + i };
    list.push(object);
  }

  return list;
}

export default Ember.Component.extend({
  list: [
    { id: 1, name: 'Ben', type: 'dog' },
    { id: 2, name: 'Alex', type: 'dog' },
    { id: 3, name: 'Chris', type: 'dog' },
    { id: 4, name: 'Chris', type: 'cat' }
  ],

  largeList: buildLargeList(120),

  properties: [
    { key: 'id', label: 'nr' },
    'name',
    { key: 'type', label: 'species' }
  ],

  actionList: [
    {
      label: "edit",
      action() { }
    },
    {
      label: "delete",
      action() { }
    },
  ]
});
