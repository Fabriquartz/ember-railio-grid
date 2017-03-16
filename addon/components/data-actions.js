import Component from 'ember-component';
import layout from '../templates/components/data-actions';

import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  layout,
  tagName:    'span',
  classNames: 'data-grid__actions',

  actions: {
    callAction(action) {
      if (typeof action === 'function') {
        let objects = get(this, 'objects');
        let message = action(objects);

        set(this, 'message', message);
      }
    }
  }
});
