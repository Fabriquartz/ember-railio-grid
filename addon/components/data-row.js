import Component from 'ember-component';
import layout from '../templates/components/data-row';
import invokeAction from 'ember-invoke-action';
import get from 'ember-metal/get';

export default Component.extend({
  layout,
  tagName: 'tr',
  classNames: ['data-grid__row'],
  classNameBindings: [
    'isSelected:data-grid__row--selected',
    'doubleClickAction:data-grid__row--clickable'
  ],

  doubleClick() {
    invokeAction(this, 'doubleClickAction', get(this, 'item'));
  }
});
