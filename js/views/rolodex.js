var app = app || {};

app.RolodexView = Backbone.View.extend({
  el: '#contacts',

  events: {},

  initialize: function( initialContacts ){
    this.collection = new app.Rolodex( initialContacts );
    this.render();
  },

  render: function() {
    this.collection.each( function( item ) {
      this.renderContact( item );
    }, this );
  },

  renderContact: function( item ){
    var contactView = new app.ContactView({
      model: item
    });
    this.$el.append( contactView.render().el );
  },
});