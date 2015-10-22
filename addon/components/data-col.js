import Ember from 'ember';
import $ from 'jquery';

const { computed, defineProperty } = Ember;
const { reads } = computed;

const defaultPropertyObject = {
  format: function(value) { return value; },
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
  return  $.extend({}, object);
}

export default Ember.Component.extend({
  tagName: 'td',
  attributeBindings: ['style'],

  _property: computed('property', function() {
    return $.extend({}, defaultPropertyObject, this.get('property'));
  }),

  style: computed('_value', '_property.style',
  function() {
    const value = this.get('_value');
    const style = copy(this.get('_property.style'));

    // if style property is a function, return style depending on value
    for (const property in style) {
      if (style.hasOwnProperty(property) &&
          typeof style[property] === 'function') {
        style[property] = style[property](value);
      }
      if (typeof style[property] === 'boolean') {
        style[property] = style[property] ? property : 'inherit';
      }
    }

    return `
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
    `;
  }),

  value: computed('_value', '_property.{format}', function() {
    const value  = this.get('_value');
    const format = this.get('_property.format');

    return format(value);
  }),

  didReceiveAttrs: function() {
    this._super(...arguments);

    const propertyPath = this.get('property.key');
    defineProperty(this, '_value', reads(`item.${propertyPath}`));
  }
});
