var app = app || {};

app.Contact = Backbone.Model.extend({
  defaults: {
    name: 'No name',
    email: 'No email',
    phone: 'No phone number',
    title: 'No title'
  }
});