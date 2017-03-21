import EmberRouter from 'ember-router';
import config      from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL:  config.rootURL
});

Router.map(function() {
});

export default Router;
