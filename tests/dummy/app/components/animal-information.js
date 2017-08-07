import Component  from 'ember-component';
import { assert } from 'ember-metal/utils';

import get from 'ember-metal/get';

export default Component.extend({
  didReceiveAttrs() {
    assert('Properties passed to the component', get(this, 'properties'));
    assert('Object passed to the component', get(this, 'object'));
    assert('PropertyPath passed to the component', get(this, 'propertyPath'));

    this._super(...arguments);
  }
});