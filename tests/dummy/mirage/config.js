import Ember from 'ember';
import { A } from 'ember-array/utils';
const { compare, get } = Ember;

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';
  // make this `http://localhost:8080`, for example,
  // if your API is on a different server

  // this.namespace = '';
  // make this `api`, for example, if your API is namespaced

  // this.timing = 400;
  // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  this.get('/animals', function(db, query) {
    let content = A(db.animals.all().models);

    if (query.queryParams['filter[type_eq]']) {
      let filterValue = query.queryParams['filter[type_eq]'];

      content = content.filter(function(animal) {
        return animal.type === filterValue;
      });
    }

    if (query.queryParams['filter[sorts][0][name]']) {
      if (typeof content.sort !== 'function' &&
          typeof content.toArray === 'function') {
        content = content.toArray();
      }

      let sortKey = query.queryParams['filter[sorts][0][name]'];
      let sortDir = query.queryParams['filter[sorts][0][dir]'];

      content = [].concat(content).sort((item1, item2) => {
        let result = 0;

        result = compare(get(item1, sortKey), get(item2, sortKey));
        if (result !== 0 && sortDir === 'DESC') {
          result = result * -1;
        }

        return result;
      });
    }

    if (query.queryParams.page && query.queryParams.per_page) {
      let { page } = query.queryParams;
      let pageSize = query.queryParams.per_page;

      let start = 0 + ((page - 1) * pageSize);
      let end = start + pageSize;

      content = content.slice(start, end);
    }

    return {
      data: content.map(function(attrs) {
        return {
          type:       'animals',
          id:         attrs.id,
          attributes: attrs };
      })
    };
  });

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
