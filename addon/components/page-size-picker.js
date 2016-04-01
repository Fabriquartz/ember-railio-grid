import Component from 'ember-component';
import layout from '../templates/components/page-size-picker';

import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  classNames: ['page-size-picker'],

  sizeOptions: computed('maxValue', 'value', function() {
    let currentValue = get(this, 'value');
    let maxValue = get(this, 'maxValue');
    let currentVisible = false;

    let list = [
      { label: 10, value: 10 },
      { label: 50, value: 50 },
      { label: 100, value: 100 },
      { label: 'all', value: maxValue }
    ];

    let filteredList = list.filter(function(size) {
      if (size.value === currentValue) { currentVisible = true; }
      return size.value <= maxValue;
    });

    let inputActive = currentVisible ? false : true;
    set(this, 'inputActive', inputActive);

    return filteredList;
  }),

  actions: {
    setPageSize(size) {
      set(this, 'value', size);
    },

    showInput() {
      set(this, 'inputActive', true);
    }
  }
});
