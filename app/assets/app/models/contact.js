App.Contact = DS.Model.extend({
  firstName: DS.attr('string',  { key: 'first_name' }),
  lastName: DS.attr('string', { key: 'last_name' }),

  phoneNumbers: DS.hasMany('App.PhoneNumber'),

  hasName: function() {
    var firstName = this.get('firstName'),
        lastName = this.get('lastName');

    return firstName !== '' || lastName !== '';
  }.property('firstName', 'lastName'),

  // This value is used to determine how the contact
  // should be sorted in the contacts list. By default
  // we sort by last name, but we use the first name if
  // no last name is provided.
  sortValue: function() {
    return this.get('lastName') || this.get('firstName');
  }.property('firstName', 'lastName')
});
