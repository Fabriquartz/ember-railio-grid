import Ember     from 'ember';
import { reads } from 'ember-computed';
import { set }   from '@ember/object';
import Mixin     from '@ember/object/mixin';

const { defineProperty } = Ember;

export default Mixin.create({
  content: reads('contentContext.content'),

  defineContent(context, path = 'content') {
    set(this, 'contentContext', context);
    defineProperty(this, 'content', reads(`contentContext.${path}`));
  }
});
