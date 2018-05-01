import EmberObject         from '@ember/object';
import ContentContextMixin from 'ember-railio-grid/mixins/content-context';
import { module, test }    from 'qunit';

module('Unit | Mixin | content-context', function() {
  let ContentContextObject = EmberObject.extend(ContentContextMixin);

  test('Content is by default content of contentContext', function(assert) {
    let subject = ContentContextObject.create({
      contentContext: { content: 'FOO' }
    });
    assert.equal(subject.get('content'), 'FOO',
                 'content is contextContent.content');

    subject.set('contentContext.content', 'BAR');

    assert.equal(subject.get('content'), 'BAR',
                 'updates on changing content of context');
  });

  test('defineContent changes content context', function(assert) {
    let subject = ContentContextObject.create({
      contentContext: { content: 'FOO' }
    });

    let newElement = {
      content:       'ABC',
      customContent: '123'
    };

    subject.defineContent(newElement);

    assert.equal(subject.get('content'), 'ABC',
                 'by default uses content of context');

    subject.defineContent(newElement, 'customContent');

    assert.equal(subject.get('content'), '123',
                 'content is updated to given context and path');
  });
});
