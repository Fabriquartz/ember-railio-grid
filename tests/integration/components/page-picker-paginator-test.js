import { moduleForComponent, test } from 'ember-qunit';
import PaginatingHandler from 'ember-railio-grid/utils/paginating-handler';
import hbs from 'htmlbars-inline-precompile';

let $currentPage;

moduleForComponent('page-picker-paginator', 'Integration | Component | {{page-picker-paginator}}', {
  integration: true,

  beforeEach() {
    this.set('handler', PaginatingHandler.create({
      contentLength: 5,
      pageSize: 1
    }));

    this.render(hbs`{{page-picker-paginator handler=handler}}`);
    $currentPage = this.$('.paginator__page-number');
  }
});

test('shows current page', function(assert) {
  assert.equal($currentPage.val(), '1');
});

test('shows amount of page', function(assert) {
  let pageAmount = this.$('.paginator__max-pages')[0].innerText;
  assert.equal(pageAmount, '5');
});

test('input arrow up increases page', function(assert) {
  $currentPage.trigger('focusin');
  $currentPage.trigger($.Event('keydown', { keyCode: 38 }));
  assert.equal($currentPage.val(), '2', 'arrow up increases page');
  assert.equal(this.get('handler.page'), 2, 'arrow up increases page');
});

test('input arrow down decreases page', function(assert) {
  this.set('handler.page', 3);

  $currentPage.trigger('focusin');
  $currentPage.trigger($.Event('keydown', { keyCode: 40 }));
  assert.equal($currentPage.val(), '2', 'arrow down decreases page');
  assert.equal(this.get('handler.page'), 2, 'arrow down decreases page');
});

test('press previous page button', function(assert) {
  this.set('handler.page', 3);
  this.$('.paginator__button--previous:eq(0)').trigger('click');
  assert.equal($currentPage.val(), '2', 'previous page selected');
  assert.equal(this.get('handler.page'), 2, 'previous page selected');
});

test('press next page button', function(assert) {
  this.$('.paginator__button--next:eq(0)').trigger('click');
  assert.equal($currentPage.val(), '2', 'next page selected');
  assert.equal(this.get('handler.page'), 2, 'next page selected');
});

test('press last page button', function(assert) {
  this.$('.paginator__button--last:eq(0)').trigger('click');
  assert.equal($currentPage.val(), '5', 'last page selected');
  assert.equal(this.get('handler.page'), 5, 'last page selected');
});

test('press first page button', function(assert) {
  this.set('handler.page', 4);
  this.$('.paginator__button--first:eq(0)').trigger('click');
  assert.equal($currentPage.val(), '1', 'first page selected');
  assert.equal(this.get('handler.page'), 1, 'first page selected');
});
