var app = app || {};

app.RolodexView = Backbone.View.extend({
  el: '#contacts',

  events: {
    'click #showAddForm': 'showAddForm',
    'click #hideForm': 'hideAddForm',
    'click #add': 'addContact'
  },

  initialize: function(){
    this.contactViews = [];
    this.collection = new app.Rolodex();
    this.collection.fetch({reset: true});
    this.render();

    this.listenTo( this.collection, 'add', this.render );
    this.listenTo( this.collection, 'reset', this.render);
    this.listenTo( this.collection, 'change:lastName', this.render);
    // this.listenTo( this.collection, 'all', this.dothing);
  },

  render: function() {
    this.clearContacts();
    var contacts = this.collection.sortByAlphabet();
    _.each(contacts, function( item ) {
      this.renderContact( item );
    }, this );
  },

  renderContact: function( item ){
    var contactView = new app.ContactView({
      model: item
    });
    this.contactViews.push(contactView);
    this.$el.append( contactView.render().el );
  },

  addContact: function( event ) {
    event.preventDefault();
    var formData = {};

    $('.addContact div').children('input').each( function(i, el) {
      if( $( el ).val() !== ''){
        formData[el.id] = $(el).val();
      }

      $(el).val('');
    });

    this.collection.create( formData );
  },

  showAddForm: function(event){
    event.preventDefault();
    $(event.target).hide();
    $('form').show('slow');
  },

  hideAddForm: function(event) {
    $(event.target).parent().parent().prev().show('fast');
    $(event.target).parent().parent().hide('slow');
  },

  clearContacts:function(){
    _.each(this.contactViews, function(view){
      view.remove();
    });
    this.contactViews = [];
  }
});