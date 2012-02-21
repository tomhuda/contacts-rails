App.DeleteNumberView = Ember.View.extend({
  classNames: ['delete-number-view'],
  click: function() {
    var phoneNumber = this.get('content');
    var contact = this.getPath('contentView.content');

    contact.get('phoneNumbers').removeObject(phoneNumber);
  },

  touchEnd: function() {
    this.click();
  }
});
