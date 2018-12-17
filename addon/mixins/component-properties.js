import { defineProperty, get } from '@ember/object';
import { reads }               from '@ember/object/computed';
import Mixin                   from '@ember/object/mixin';

export default Mixin.create({
  didReceiveAttrs() {
    this._super(...arguments);

    let options = get(this, 'componentProperties') || {};

    Object.keys(options).forEach((attributeName) => {
      if (typeof get(options, attributeName) === 'function') {
        defineProperty(this, attributeName, { value: get(options, attributeName) });
        return;
      }

      defineProperty(this, attributeName,
        reads(`componentProperties.${attributeName}`));
    });
  }
});
