import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({
  currentPage: computed('handler.page', 'handler.pageSize', 'content.[]', function() {
    const page = this.get('handler.page');
    const pageSize = this.get('handler.pageSize');
    const content = this.get('content');

    if (pageSize && pageSize < content.length) {
      const start = 0 + ((page - 1) * pageSize);
      const end = start + pageSize;

      return content.slice(start, end);
    }

    return content;
  })
});
