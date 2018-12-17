import { set, defineProperty } from '@ember/object';
import { reads }               from '@ember/object/computed';
import Mixin                   from '@ember/object/mixin';

export default Mixin.create({
  content: reads('contentContext.content'),

  defineContent(context, path = 'content') {
    set(this, 'contentContext', context);
    defineProperty(this, 'content', reads(`contentContext.${path}`));
  }
});
