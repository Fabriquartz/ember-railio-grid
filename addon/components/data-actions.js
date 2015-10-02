import Ember from 'ember';
import layout from '../templates/components/data-actions';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: 'data-grid__actions',
  classNameBindings: ['open'],

  click: function() {
    this.toggleProperty('open');
  },

  actions: {
    callAction(action) {
      const object = this.get('object');

      if (typeof action === 'function') {
        action(object);
      }
    }
  }
});
