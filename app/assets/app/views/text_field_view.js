App.TextField = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});
