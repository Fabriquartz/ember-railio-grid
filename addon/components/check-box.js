import Component from 'ember-component';
import { strictInvokeAction } from 'ember-invoke-action';
import get from 'ember-metal/get';

function handleChanged() {
  this.send('changed', this.readDOMAttr('checked'));
}

export default Component.extend({
  tagName:           'input',
  type:              'checkbox',
  attributeBindings: ['type', 'value:checked', 'disabled'],
  classNames:        ['check-box'],

  change: handleChanged,

  actions: {
    changed(value) {
      strictInvokeAction(this, 'updated', value, get(this, 'object'));
    }
  }
});
