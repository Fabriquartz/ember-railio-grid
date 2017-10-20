import resolver        from './helpers/resolver';
import { setResolver } from 'ember-qunit';
import { start }       from 'ember-cli-qunit';

setResolver(resolver);
start();

Function.prototype.bind = Function.prototype.bind || function(thisp) {
  let _this = this;
  return function() {
    return _this.apply(thisp, arguments);
  };
};