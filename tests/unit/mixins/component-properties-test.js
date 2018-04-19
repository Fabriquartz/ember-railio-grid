import { moduleFor, test } from 'ember-qunit';
import EmberComponent      from '@ember/component';
import getOwner            from 'ember-owner/get';
import get                 from 'ember-metal/get';

import ComponentPropertiesMixin from
  'ember-railio-grid/mixins/component-properties';

moduleFor('mixin:component-properties', 'Unit | Mixin | component-properties', {
  integration: true,

  subject(object = {}) {
    let component = EmberComponent.extend(ComponentPropertiesMixin, object);

    this.register('component:foo-bar-component', component);
    return getOwner(this).lookup('component:foo-bar-component');
  }
});

test('Binds options to the context', function(assert) {
  let component = this.subject({
    componentProperties: {
      fooBar: 'Value for FooBar',
      fizBox: () => 'Value for FizBoz'
    }
  });

  assert.equal(get(component, 'fooBar'), 'Value for FooBar',
               'Property binded to the context');
  assert.equal(get(component, 'fizBox')(), 'Value for FizBoz',
               'Function binded to the context');
});
