App.contactsController = Ember.ArrayController.create({
  // The array of Contact objects that backs the array controller.
  content: [],

  add: function(contacts) {
    var idx, len;

    if (!$.isArray(contacts)) {
      contacts = [contacts];
    }

    len = contacts.get('length');
    for (idx = 0; idx < len; idx++) {
      this.addItem(contacts.objectAt(idx));
    }
  },

  // Adds a new contact to the list and ensures it is
  // sorted correctly.
  addItem: function(contact) {
    var length = this.get('length'), idx;

    idx = this.binarySearch(contact.get('sortValue'), 0, length);

    this.insertAt(idx, contact);

    // If the value by which we've sorted the contact
    // changes, we need to re-insert it at the correct
    // location in the list.
    contact.addObserver('sortValue', this, 'contactSortValueDidChange');
  },

  // Binary search implementation that finds the index
  // where a contact should be inserted.
  binarySearch: function(value, low, high) {
    var mid, midValue;

    if (low === high) {
      return low;
    }

    mid = low + Math.floor((high - low) / 2);
    midValue = this.objectAt(mid).get('sortValue');

    if (value > midValue) {
      return this.binarySearch(value, mid+1, high);
    } else if (value < midValue) {
      return this.binarySearch(value, low, mid);
    }

    return mid;
  },

  remove: function(contact) {
    this.removeObject(contact);
    contact.removeObserver('sortValue', this, 'contactSortValueDidChange');
  },

  contactSortValueDidChange: function(contact) {
    this.remove(contact);
    this.add(contact);
  },

  // Creates a new, empty Contact object and adds it to the
  // array controller.
  newContact: function() {
    var names = App.names,
        firstName = Math.floor(Math.random()*names.length),
        lastName = Math.floor(Math.random()*names.length),
        hasLastName = Math.random();

    this.add(App.Contact.create({
      firstName: names[firstName],
      lastName: hasLastName < 0.9 ? names[lastName] : null,
      phoneNumbers: []
    }));
  },

  loadContacts: function() {
    var self = this;
    $.ajax({
      url: '/contacts.json',
      dataType: 'json',
      success: function(data) {
        var contacts = data.contacts;

        // Turn JSON objects into bindable Ember
        // objects.
        contacts = contacts.map(function(item) {
          return self.createContactFromJSON(item);
        });

        self.add(contacts);
      },

      error: function() {
        self.pushObject(self.createContactFromJSON({
          firstName: 'Peter',
          lastName: 'Wagenet',
          phoneNumbers: ['(415) 555-2381']
        }));

        self.set('isFromFixtures', true);
      }
    });
  },

  createContactFromJSON: function(json) {
    json.phoneNumbers = json.phone_numbers.map(function(number) {
      return { number: number };
    });

    return App.Contact.create(json);
  }
});

