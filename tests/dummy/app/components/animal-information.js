import Component  from 'ember-component';
import { assert } from 'ember-metal/utils';

import get from 'ember-metal/get';

export default Component.extend({
  didReceiveAttrs() {
    assert('Properties passed to the component', get(this, 'properties'));

    this._super(...arguments);
  }
});