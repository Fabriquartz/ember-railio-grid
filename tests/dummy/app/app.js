import Resolver from './resolver';
import config   from './config/environment';

import loadInitializers from 'ember-load-initializers';
import Application      from '@ember/application';

const App = Application.extend({
  modulePrefix:    config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
