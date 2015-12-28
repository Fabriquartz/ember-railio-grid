import Ember from 'ember';
import layout from '../templates/components/data-actions';

const { set } = Ember;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'span',
  classNames: 'data-grid__actions',

  actions: {
    callAction(action) {
      if (typeof action === 'function') {
        const objects = this.get('objects');
        const message = action(objects);

        set(this, 'message', message);
      }
    }
  }
});
