# Ember-railio-grid
[![npm version](https://badge.fury.io/js/ember-railio-grid.svg)](http://badge.fury.io/js/ember-railio-grid) [![Build Status](https://travis-ci.org/Fabriquartz/ember-railio-grid.svg)](https://travis-ci.org/Fabriquartz/ember-railio-grid) [![Ember Observer Score](http://emberobserver.com/badges/ember-railio-grid.svg)](http://emberobserver.com/addons/ember-railio-grid) [![Code Climate](https://codeclimate.com/github/Fabriquartz/ember-railio-grid/badges/gpa.svg)](https://codeclimate.com/github/Fabriquartz/ember-railio-grid)

An Ember addon to display a list of Objects, and be able to filter, sort and paginate this list. With build-in selection and be able to give actions for the selected objects.

## Install

In your application's directory:

```sh
$ ember install ember-railio-grid
```

## Basic usage

The grid can be used with an existing array of objects, or can be connected to the store to get the objects from the store. 

In your Handlebars templates when using an existing list:

```handlebars
{{data-grid content=list
            properties=listProperties}}
```

When you want to get the content from the store, keep in mind you have to pass the store in your current project to the data-grid.

```handlebars
{{data-grid model="modelName"
            store=store
            properties=listProperties}}
```

#### Properties

The properties are the cols you want to show and their extra information like formatting and styling. 
It should be an array with objects for each property. At least it should contain key and label:

```js
listProperties: [
  {
    key:   'name',
    label: 'First name'
  },
  {
    key:   'age',
    label: 'Age'
  }
]
```

It is possible to use multiple properties in just one cell by giving an array of keys. By default, without giving a custom format function, both values are shown seperated with a comma. See the example below for using your own format function. The format function gets the properties in the same order as you specify it in the key list. 

```js
listProperties: [
  {
    key:    ['firstName', 'lastName'],
    label:  'Name',
    format: function(first, last) {
      return `${last}, ${first}`;
    }
  }
]
```

If you want your cells to have some styling, you could add it to the property. The following styling options can be used inside the style object: 

- width *(in em)*
- horizontalAlign
- verticalAlign
- backgroundColor
- fontFamily
- fontWeight
- italic *(boolean)*
- fontColor
- borderWidth *(in px)*
- borderColor
- borderStyle

```js
listProperties: [
  {
    key:    'name',
    label:  'Name',
    style: {
      width:           30,
      horizontalAlign: 'center',
      verticalAlign:   'top',
      backgroundColor: '#EFEFEF',
      fontFamily:      'Monospace',
      fontWeight:      '300',
      italic:          true,
      fontColor:       '#777',
      borderWidth:     2,
      borderColor:     'grey',
      borderStyle:     'dashed'
    }
  }
]
```

Instead of giving a fixed value, you could use a function to style the cell depending on it's value:

```js
listProperties: [
  {
    key:    'total',
    label:  'Total',
    style: {
      backgroundColor: function(total) {
        if (total > 1000) { return 'green'; } 
        if (total < 0)    { return 'red'; }
        return '#EFEFEF';
      }
    }
  },
  {
    key:    ['in', 'out'],
    label:  'diff',
    format: function(incoming, outgoing) {
      return incoming - outgoing;
    },
    style: {
      fontColor: function(incoming, outgoing) {
        if (incoming > outgoing) { return 'green'; } 
        if (incoming < outgoing) { return 'red'; }
        return 'black';
      }
    }
  }
]
```

#### Paginating

The grid can be used to paginate the content. For a given content, it will use the build-in filterer. When using the api for getting the content, the api should handle the paginating. For now, there is just one paginator, but there will be more available in the future (or you could write your own). You are able to show the paginator on top, bottom, or both. Without a page size, the grid will show all content.

```handlebars
{{data-grid content=list
            properties=listProperties
            topPaginator="page-picker-paginator"
            bottomPaginator="page-picker-paginator"
            pageSize=20}}
```

#### Filtering

You could optional add a filtering bar, where you can filter the content by each col. For a given content, it will use the build-in filterer. When using the api for getting the content, the api should handle the paginating.

```handlebars
{{data-grid content=list
            properties=listProperties
            filterEnabled=true}}
```

Possible filter options:

- equals
- contains
- is greater than
- is greater than or equal to
- is lower than
- is lower than or equal to
- starts with
- ends with

#### Sorting

The grid has a build-in sorting, or can be sorted from the store when using a model. Each property can be used to sort by clicking on it's header. The order of adding the sortings, will be the order for importancy. So the first added sorting will be the most important, even if it is changed from ASC to DESC. Only removing it and re-adding will change its importancy.

#### Actions

Inside the grid it is possible to select specific rows (by holding CTRL or CMD while clicking). After selecting, you can use some passed actions for the selected items. The actions need to be a list like:

```js
actionList: [
  {
    label:  'something',
    action: function(items) {
      // do something for each selected item
    }
  },
  {
    label:  'open',
    action: function(items) {
      // open the selected items
    }
  }
]
```

And can be passed to the grid like:

```handlebars
{{data-grid content=list
            properties=listProperties
            actionList=actionList}}
```

##### doubleClick action

You could also pass a doubleClickAction, which will be called after double-clicking a row. It passes the object of that row to the function.

```js
  editObject(object) {
    // do something with this object
  }
```

And can be passed to the grid like:

```handlebars
{{data-grid content=list
            properties=listProperties
            doubleClickAction=editObject}}
```
