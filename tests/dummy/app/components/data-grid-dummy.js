import Ember from 'ember';

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
  ]
});
