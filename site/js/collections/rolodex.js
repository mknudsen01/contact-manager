var app = app || {};

app.Rolodex = Backbone.Collection.extend({
  model: app.Contact,
  url: '/contacts',

  sortByAlphabet: function(){
    var sorted = this.sortBy(function(contact){
      return contact.attributes.lastName.toLowerCase();
    });
    return sorted;
  },
});