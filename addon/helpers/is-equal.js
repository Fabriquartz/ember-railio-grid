import Ember from 'ember';

export default Ember.Helper.extend({
  compute: function ([value, comparison]) {
    return value === comparison;
  }
});
