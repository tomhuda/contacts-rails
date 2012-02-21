App.CardView = Ember.View.extend({
  contentBinding: 'App.selectedContactController.content',
  classNames: ['card'],

  addPhoneNumber: function() {
    var phoneNumbers = this.getPath('content.phoneNumbers');
    phoneNumbers.pushObject({ number: '' });
  }
});
