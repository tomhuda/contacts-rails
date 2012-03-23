App.selectedContactController = Ember.Object.create({
  content: null,

  addPhoneNumber: function() {
    var phoneNumbers = this.getPath('content.phoneNumbers');
    var phoneNumber = App.PhoneNumber.createRecord({
      number: ''
    });

    phoneNumbers.pushObject(phoneNumber);
  },

  deleteContact: function() {
    this.get('content').deleteRecord();
  }
});
