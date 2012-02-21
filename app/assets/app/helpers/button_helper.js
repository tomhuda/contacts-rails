Ember.Handlebars.registerHelper('button', function(options) {
  var hash = options.hash;

  if (!hash.target) {
    hash.target = "App.contactsController";
  }
  return Ember.Handlebars.helpers.view.call(this, Ember.Button, options);
});
