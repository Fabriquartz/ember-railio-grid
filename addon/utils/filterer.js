import Ember from 'ember';

const { computed, get } = Ember;

const FILTERS = {
  eq(value, comparison) {
    return value.toUpperCase() === comparison.toUpperCase();
  },
  cont(value, contains) {
    return value.toUpperCase().indexOf(contains.toUpperCase()) !== -1;
  },
  gt(value, comparison) {
    return value > comparison;
  },
  gte(value, comparison) {
    return value >= comparison;
  },
  lt(value, comparison) {
    return value < comparison;
  },
  lte(value, comparison) {
    return value <= comparison;
  },
  start(value, part) {
    return value.toUpperCase().indexOf(part.toUpperCase()) === 0;
  },
  end(value, part) {
    let valueLength = value.length;
    let partLength = part.length;

    return value.toUpperCase().indexOf(part.toUpperCase()) === (valueLength - partLength);
  }
};

function filter(filters, list) {
  if (!list) { return []; }

  return list.filter(function(item) {
    let isOk = true;

    filters.forEach(function(filter) {
      let itemValue = get(item, filter.propertyPath);
      let filterFn = FILTERS[filter.filter.filter];
      let OK = filterFn(itemValue, filter.value);

      if (!OK) { isOk = false; }
    });

    return isOk;
  });
}

export default Ember.Object.extend({
  filteredContent: computed(
  'content.[]', 'handler.filters.@each.{value,propertyPath}', function() {
    return filter(this.get('handler.filters'), this.get('content'));
  }),

  filters: computed(function() {
    return Ember.A();
  })
});
