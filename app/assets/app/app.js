/*global minispade*/

require('vendor/jquery-1.7.1');
require('vendor/ember');
require('vendor/ember-data');

App = Ember.Application.create({
  store: DS.Store.create({
    adapter: DS.RESTAdapter.create()
  })
});

var modules = minispade.modules;
for (var module in modules) {
  if (!modules.hasOwnProperty(module)) { continue; }
  require(module);
}

App.names = ["Adam", "Bert", "Charlie", "Dave", "Ernie", "Frances",
  "Gary", "Isabelle", "John", "Kyle", "Lyla", "Matt", "Nancy", "Ophelia",
  "Peter", "Quentin", "Rachel", "Stan", "Tom", "Uma", "Veronica", "Wilson",
  "Xander", "Yehuda", "Zora"];

App.contactsController.loadContacts();

Ember.View.create({
  templateName: 'main'
}).append();
