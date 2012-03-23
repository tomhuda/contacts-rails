App.ContactListItemView = Ember.View.extend({
  classNameBindings: ['isSelected', 'content.isDirty', 'content.isSaving', 'content.isDeleted'],
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

