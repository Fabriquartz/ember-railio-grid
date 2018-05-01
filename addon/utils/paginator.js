import EmberObject from 'ember-object';

import computed from 'ember-computed';
import get from 'ember-metal/get';

import ContentContextMixin from '../mixins/content-context';

export default EmberObject.extend(ContentContextMixin, {
  currentPage: computed('handler.page', 'handler.pageSize', 'content.[]',
  function() {
    let page = get(this, 'handler.page');
    let pageSize = get(this, 'handler.pageSize');
    let content = get(this, 'content');

    if (pageSize && content && pageSize < get(content, 'length')) {
      let start = 0 + ((page - 1) * pageSize);
      let end = start + pageSize;

      return content.slice(start, end);
    }

    return content;
  })
});
