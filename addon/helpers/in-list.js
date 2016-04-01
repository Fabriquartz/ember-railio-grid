import Helper from 'ember-helper';

export default Helper.extend({
  compute([value, list]) {
    return list.indexOf(value) !== -1;
  }
});
