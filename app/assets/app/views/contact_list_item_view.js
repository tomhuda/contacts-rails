App.ContactListItemView = Ember.View.extend({
  classNameBindings: ['isSelected'],
  templateName: 'contact_list_item',

  click: function() {
    var content = this.get('content');

    App.selectedContactController.set('content', content);
  },

  touchEnd: function() {
    this.click();
  },

  isSelected: function() {
    var selectedItem = App.selectedContactController.get('content'),
        content = this.get('content');

    if (content === selectedItem) { return true; }
  }.property('App.selectedContactController.content')
});

