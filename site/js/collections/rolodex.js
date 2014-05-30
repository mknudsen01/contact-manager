var app = app || {};

app.Rolodex = Backbone.Collection.extend({
  model: app.Contact
});