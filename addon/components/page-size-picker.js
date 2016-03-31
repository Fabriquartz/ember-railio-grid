import Ember from 'ember';
import layout from '../templates/components/page-size-picker';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['page-size-picker'],

  sizeOptions: computed('maxValue', 'value', function() {
    let currentValue = this.get('value');
    let maxValue = this.get('maxValue');
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
    this.set('inputActive', inputActive);

    return filteredList;
  }),

  actions: {
    setPageSize(size) {
      this.set('value', size);
    },

    showInput() {
      this.set('inputActive', true);
    }
  }
});
