import Ember from 'ember';
import layout from 'ember-railio-grid/templates/components/data-grid';

const { computed } = Ember;

function getPropertiesList(properties) {
  let list = null;

  if (typeof properties === 'string') {
    const propertyList = properties.split(' ');

    list = propertyList.map(function(property) {
      return { key: property, label: property };
    });
  } else if (properties !== null && Ember.isArray(properties)) {
    list = properties.map(function(property) {
      if (typeof property === 'string') {
        return { key: property, label: property };
      } else if (typeof property === 'object' &&
                 property.hasOwnProperty('key') &&
                 property.hasOwnProperty('label')) {
        return property;
      }
    });
  }

  return list;
}

export default Ember.Component.extend({
  layout: layout,
  classNames: ['data-grid'],
  attributeBindings: ['widthString:style'],

  currentPage: 1,
  showHeader: true,

  widthString: computed('width', function() {
    const width = this.get('width') + '';
    if (width.indexOf('%') > 0) { return width; }

    return  'width: ' + width + 'px';
  }),

  propertiesList: computed('properties', function() {
    const properties = this.get('properties');

    return getPropertiesList(properties);
  }),

  pageAmount: computed('pageSize', 'content.length', function() {
    return Math.ceil(this.get('content.length') / this.get('pageSize'));
  }),

  pageNumbers: computed('pageAmount', 'currentPage', function() {
    const pages = [];
    const pageAmount = this.get('pageAmount');
    const currentPage = this.get('currentPage');

    let start = currentPage - 2;
    if (start < 1) { start = 1; }

    let end = start + 4;

    if (end > pageAmount) { end = pageAmount; start = pageAmount - 4; }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }),

  pageContent: computed('pageSize', 'currentPage', 'content.@each', function() {
    const pageSize    = this.get('pageSize');
    const currentPage = this.get('currentPage');
    const content     = this.get('content');

    if (pageSize && pageSize < content.length) {
      const start = 0 + ((currentPage - 1) * pageSize);
      const end = start + pageSize;

      return content.slice(start, end);
    }

    return content;
  }),

  actions: {
    goToPage(pageNr) {
      const pageAmount = this.get('pageAmount');

      if (pageNr > 0 && pageNr <= pageAmount) {
        this.set('currentPage', pageNr);
      }
    },
    goToPreviousPage() {
      const current = this.get('currentPage');
      this.send('goToPage', current - 1);
    },
    goToNextPage() {
      const current = this.get('currentPage');
      this.send('goToPage', current + 1);
    }
  }
});
