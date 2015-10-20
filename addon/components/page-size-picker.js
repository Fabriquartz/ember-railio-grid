import Ember from 'ember';
import layout from '../templates/components/page-size-picker';

const { computed } = Ember;

export default Ember.Component.extend({
  layout: layout,
  classNames: ['page-size-picker'],

  sizeOptions: computed('maxValue', 'value', function() {
    const currentValue = this.get('value');
    const maxValue = this.get('maxValue');
    let currentVisible = false;

    const list = [
      {label: 10, value: 10 },
      {label: 50, value: 50 },
      {label: 100, value: 100 },
      {label: 'all', value: maxValue }
    ];

    const filteredList = list.filter(function(size) {
      if (size.value === currentValue) { currentVisible = true; }
      return size.value <= maxValue;
    });

    if (!currentVisible) { this.set('inputActive', true); }
                    else { this.set('inputActive', false); }

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
