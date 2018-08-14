import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();

Function.prototype.bind = Function.prototype.bind || function(thisp) {
  let _this = this;
  return function() {
    return _this.apply(thisp, arguments);
  };
};