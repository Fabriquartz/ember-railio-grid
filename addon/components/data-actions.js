import Ember from 'ember';
import layout from '../templates/components/data-actions';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: 'data-grid__actions',

  actions: {
    callAction(action) {
      if (typeof action === 'function') {
        const objects = this.get('objects');
        action(objects);
      }
    }
  }
});
