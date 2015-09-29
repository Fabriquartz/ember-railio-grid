import Ember from 'ember';

function buildLargeList(length) {
  const list = [];

  for (let i = 1; i <= length;i++) {
    const object = Ember.Object.create({
      id:   i,
      name: 'Name' + i,
      type: 'type' + i
    });

    list.push(object);
  }

  return list;
}

export default Ember.Component.extend({
  list: [
    Ember.Object.create({
      id: 1,
      name: 'Alex',
      type: 'dog'
    }),
    Ember.Object.create({
      id: 2,
      name: 'Ben',
      type: 'dog'
    }),
    Ember.Object.create({
      id: 3,
      name: 'Chris',
      type: 'cat'
    })
  ],

  largeList: buildLargeList(12),

  properties: [
    { key: 'id', label: 'nr' },
    'name',
    { key: 'type', label: 'species' }
  ]
});
