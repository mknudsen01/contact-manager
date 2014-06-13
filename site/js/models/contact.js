var app = app || {};

app.Contact = Backbone.Model.extend({
  defaults: {
    firstName: 'NO NAME',
    lastName: 'DOE',
    email: 'No email',
    phone: 'No phone number',
    title: 'No title',
    company: 'No company',
    city: 'No location set'
  },

  parse: function( response ){
    response.id = response._id;
    return response;
  }
});