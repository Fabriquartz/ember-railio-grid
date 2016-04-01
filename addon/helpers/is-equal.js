import Ember from 'ember';

export default Ember.Helper.extend({
  compute([value, comparison]) {
    return value === comparison;
  }
});
