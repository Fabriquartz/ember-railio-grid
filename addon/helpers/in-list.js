import Ember from 'ember';

export default Ember.Helper.extend({
  compute: function([value, list]) {
    return list.indexOf(value) !== -1;
  }
});
