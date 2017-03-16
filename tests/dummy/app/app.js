import Ember    from 'ember';
import Resolver from './resolver';
import config   from './config/environment';

import loadInitializers from 'ember-load-initializers';
import EmberApplication from 'ember-application';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = EmberApplication.extend({
  modulePrefix:    config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
