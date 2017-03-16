import Component from 'ember-component';

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

export default Component.extend({
  list: [
    { id: 1, name: 'Ben', type: 'dog' },
    { id: 2, name: 'Alex', type: 'dog' },
    { id: 3, name: 'Chris', type: 'dog' },
    { id: 4, name: 'Chris', type: 'cat' }
  ],

  largeList: buildLargeList(120),

  properties: [
    { key: 'id', label: 'nr' },
    { key: 'name', label: 'animal name' },
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
