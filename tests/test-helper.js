import resolver        from './helpers/resolver';
import { start }       from 'ember-cli-qunit';
import { setResolver } from 'ember-qunit';

setResolver(resolver);
start();

Function.prototype.bind = Function.prototype.bind || function(thisp) {
  let _this = this;
  return function() {
    return _this.apply(thisp, arguments);
  };
};
