import Ember from 'ember';
import $ from 'jquery';

import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import { htmlSafe } from 'ember-string';
import { isEmberArray } from 'ember-array/utils';

const { defineProperty } = Ember;

const defaultPropertyObject = {
  format() {
    return Array.prototype.slice.call(arguments, 0).join(', ');
  },
  style: {
    width:           'auto',

    horizontalAlign: 'inherit',
    verticalAlign:   'inherit',

    backgroundColor: 'inherit',

    fontFamily:      'inherit',
    fontWeight:      'inherit',
    italic:          false,
    fontColor:       'inherit',

    borderWidth:     3,
    borderColor:     'inherit',
    borderStyle:     'inherit'
  }
};

function copy(object) {
  return $.extend({}, object);
}

export default Component.extend({
  tagName: 'td',
  attributeBindings: ['style'],

  _property: computed('property', function() {
    return $.extend({}, defaultPropertyObject, get(this, 'property'));
  }),

  style: computed('_values', '_property.style',
  function() {
    let values = get(this, '_values');
    let style  = copy(get(this, '_property.style'));

    // if style property is a function, return style depending on value
    for (let property in style) {
      if (style.hasOwnProperty(property) &&
          typeof style[property] === 'function') {
        style[property] = style[property](...values);
      }
      if (typeof style[property] === 'boolean') {
        style[property] = style[property] ? property : 'inherit';
      }
    }

    return htmlSafe(`
      width:            ${style.width}em;
      text-align:       ${style.horizontalAlign};
      vertical-align:   ${style.verticalAlign};
      background-color: ${style.backgroundColor};
      font-family:      ${style.fontFamily};
      font-weight:      ${style.fontWeight};
      font-style:       ${style.italic};
      color:            ${style.fontColor};
      border-width:     ${style.borderWidth}px;
      border-color:     ${style.borderColor};
      border-style:     ${style.borderStyle};
    `);
  }),

  value: computed('_values', '_property.{format}', function() {
    let values = get(this, '_values');
    let format = get(this, '_property.format');

    return format.apply(null, values);
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    let propertyPaths = get(this, 'property.key');
    if (!isEmberArray(propertyPaths)) {
      propertyPaths = [propertyPaths];
    }

    defineProperty(this, '_values', computed(`item.{${propertyPaths.join(',')}}`,
    function() {
      return propertyPaths.map((key) => {
        return get(this, `item.${key}`);
      });
    }));
  }
});
