Ember.Handlebars.registerHelper('editable', function(path, options) {
  options.hash.valueBinding = path;
  return Ember.Handlebars.helpers.view.call(this, App.EditField, options);
});

