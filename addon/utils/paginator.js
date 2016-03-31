import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({
  currentPage: computed('handler.page', 'handler.pageSize', 'content.[]', function() {
    let page = this.get('handler.page');
    let pageSize = this.get('handler.pageSize');
    let content = this.get('content');

    if (pageSize && pageSize < content.length) {
      let start = 0 + ((page - 1) * pageSize);
      let end = start + pageSize;

      return content.slice(start, end);
    }

    return content;
  })
});
