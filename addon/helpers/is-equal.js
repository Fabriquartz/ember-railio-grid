import Helper from 'ember-helper';

export default Helper.extend({
  compute([value, comparison]) {
    return value === comparison;
  }
});
