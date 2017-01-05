import Ember from 'ember';

function buildLargeList(length) {
  let list = [];

  for (let i = 1; i <= length; i++) {
    let object = {
      id:   i,
      name: `Name${i}`,
      type: `type${i}`
    };
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
    { key: 'id', label: 'nr', style: { width: 20 } },
    { key: 'name', label: 'animal names', style: { width: 5 } },
    { key: 'type', label: 'species' }
  ],

  actionList: [
    {
      label: 'edit',
      action() { }
    },
    {
      label: 'delete',
      action() { }
    }
  ],

  doubleClickAction() { }
});
