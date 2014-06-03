var app = app || {};

app.RolodexView = Backbone.View.extend({
  el: '#contacts',

  events: {
    'click #showAddForm': 'showAddForm',
    'click #hideForm': 'hideAddForm',
    'click #add': 'addContact',
    'keyup #search': 'search',
    'click .letter': 'filterLetter'
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
    _.each(contacts, function( contact ) {
      this.renderContact( contact );
    }, this );
  },

  renderContact: function( contact ){
    var contactView = new app.ContactView({
      model: contact
    });
    this.contactViews.push(contactView);
    this.$el.append( contactView.render().el );
  },

  addContact: function( event ) {
    event.preventDefault();
    var formData = {};

    $('.addContact section').children('input').each( function(i, el) {
      if( $( el ).val() !== ''){
        formData[el.id] = $(el).val();
      }

      $(el).val('');
    });
    this.collection.create( formData );
    this.hideAddForm();
  },

  showAddForm: function(event){
    event.preventDefault();
    $(event.target).hide();
    $('form').show('slow');
  },

  hideAddForm: function(event) {
    var that = this;
    this.$el.find('form').hide('slow', function(){
      that.$el.find('#showAddForm').fadeIn('slow');
    });
  },

  clearContacts:function(){
    _.each(this.contactViews, function(view){
      view.remove();
    });
    this.contactViews = [];
  },

  search: function(){
    var view = this;
    var searchTerm = $(event.target).val();
    // debugger
    var matches = _.filter(this.collection.models,function(contact){
      return view.filterContacts(contact, searchTerm);
    });
    this.renderMatches(matches);
  },

  filterContacts: function(contact, searchTerm){

    for(var i = 0; i< TO_CHECK.length; i++){
      var attribute = TO_CHECK[i];
      var value = contact.attributes[attribute].toLowerCase();
      if(value.indexOf(searchTerm.toLowerCase()) > -1){
        console.log("match for ", contact.attributes.lastName, ": ", attribute);
        return true;
      }
    }
    return false;
  },

  renderMatches: function(matches){
    this.clearContacts();
    sortedMatches = this.sortByAlphabet(matches);
    // var contacts = this.collection.sortByAlphabet();
    _.each(sortedMatches, function( contact ) {
      this.renderContact( contact );
    }, this );
  },

  sortByAlphabet: function(contacts){
    var sorted = contacts.sort(function(a,b){
      if(a.attributes.lastName.toLowerCase() > b.attributes.lastName.toLowerCase()){
        return 1;
      }
      if(a.attributes.lastName.toLowerCase() < b.attributes.lastName.toLowerCase()){
        return -1;
      }
      return 0;
    });
    // var sorted = contacts.sortBy(function(contact){
    //   return contact.attributes.lastName.toLowerCase();
    // });
    return sorted;
  },

  filterLetter: function(event){
    $('.active-letter').toggleClass('active-letter');
    $(event.target).toggleClass('active-letter');
  }
});