import Component from 'ember-component';
import set from 'ember-metal/set';

function handleChanged() {
  let value = this.readDOMAttr('value');
  value = value.replace(/[^0-9]/g, '');

  this.$().val(value);
}

export default Component.extend({
  tagName: 'input',
  attributeBindings: ['value'],
  classNames: ['paginator__number-input'],

  input:  handleChanged,
  change: handleChanged,

  focusOut() {
    let value = parseInt(this.$().val());
    this.send('changed', value);
  },

  keyDown(e) {
    let value = parseInt(this.$().val());

    // 38 = up
    if (e.keyCode === 38) {
      this.send('changed', value + 1);
    }

    // 40 = down
    if (e.keyCode === 40) {
      this.send('changed', value - 1);
    }

    // 13 = enter
    if (e.keyCode === 13) {
      this.send('changed', value);
    }
  },

  actions: {
    changed(value) {
      set(this, 'value', value);
    }
  }
});
