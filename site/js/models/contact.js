var app = app || {};

app.Contact = Backbone.Model.extend({
  defaults: {
    name: 'No name',
    email: 'No email',
    phone: 'No phone number',
    title: 'No title',
    city: 'No location set'
  },

  parse: function( response ){
    response.id = response._id;
    return response;
  }
});