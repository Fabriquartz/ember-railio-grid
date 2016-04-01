import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

Function.prototype.bind = Function.prototype.bind || function(thisp) {
  let _this = this;
  return function() {
    return _this.apply(thisp, arguments);
  };
};
