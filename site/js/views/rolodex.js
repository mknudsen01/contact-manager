var app = app || {};

app.RolodexView = Backbone.View.extend({
  el: '#contacts',

  events: {
    'click #showAddForm': 'showAddForm',
    'click #hideForm': 'hideAddForm',
    'click #add': 'addContact',
    'keyup #search': 'searchEvent',
    'click .letter': 'filterLastNameEvent'
  },

  initialize: function(){
    this.contactViews = [];
    this.collection = new app.Rolodex();
    this.collection.fetch({reset: true});
    this.render();

    this.listenTo( this.collection, 'add', this.render );
    this.listenTo( this.collection, 'reset', this.render);
    this.listenTo( this.collection, 'change:lastName', this.changeLastName);
  },

  render: function(filterObject) {
    var renderArgs;
    this._clearContacts();
    var contacts = this.collection.sortByAlphabet();

    if(filterObject && filterObject.callback){
      renderArgs = {
        contacts: contacts,
        callback: filterObject.callback,
        searchTerm: filterObject.searchTerm
      };
      this._renderSome(renderArgs);
    } else {
      renderArgs = {
        contacts: contacts
      };
      this._renderAll(renderArgs);
    }
  },

  _renderAll: function(renderArgs){
    var contacts = renderArgs.contacts;
    _.each(contacts, function( contact ) {
      this._renderContact( contact );
    }, this );
  },

  _renderSome: function(renderArgs){
    var contacts = renderArgs.contacts;
    var callback = renderArgs.callback;
    var searchTerm = renderArgs.searchTerm;
    _.each(contacts, function( contact ) {
      if(callback(contact, searchTerm)){
        this._renderContact( contact );
      }
    }, this );
  },

  _renderContact: function( contact ){
    var contactView = new app.ContactView({
      model: contact
    });
    this.contactViews.push(contactView);
    this.$el.append( contactView.render().el );
  },

  changeLastName: function(){
    this._resetLastNameFilter();
    this.render();
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
    event.preventDefault();
    var that = this;
    this.$el.find('form').hide('slow', function(){
      that.$el.find('#showAddForm').fadeIn('slow');
    });
  },

  searchEvent: function(){
    this._resetLastNameFilter();
    var searchTerm = $(event.target).val();
    var callback = this._filterBySearchTerm;
    this.render({callback: callback, searchTerm: searchTerm});
    this._renderNoMatches();
  },

  filterLastNameEvent: function(event){
    event.preventDefault();
    $('.active-letter').toggleClass('active-letter');
    $(event.target).toggleClass('active-letter');
    var lastNameLetter = $(event.target).html();

    if(lastNameLetter === "ALL"){
      this.render();
    } else {
      var callback = this._filterByLastName;
      var searchTerm = lastNameLetter;
      this.render({callback: callback, searchTerm: searchTerm });
    }
    this._renderNoMatches();
  },


  _renderNoMatches: function(){
    if(this.contactViews.length === 0){
      var noResultsView = new app.NoResultsView();
      this.contactViews.push(noResultsView);
      this.$el.append( noResultsView.render().el );
    }
  },

  _clearContacts:function(){
    _.each(this.contactViews, function(view){
      view.remove();
    });
    this.contactViews = [];
  },

  _filterByLastName: function(contact, lastNameLetter){
    var firstLetterOfLastName = contact.attributes.lastName[0].toLowerCase();
    var lastNameSearchLetter = lastNameLetter.toLowerCase();
    if(firstLetterOfLastName === lastNameSearchLetter){
      return true;
    }
    return false;
  },

  _filterBySearchTerm: function(contact, searchTerm){
    for(var i = 0; i< TO_CHECK.length; i++){
      var attribute = TO_CHECK[i];
      var value = contact.attributes[attribute].toLowerCase();
      if(value.indexOf(searchTerm.toLowerCase()) > -1){
        return true;
      }
    }
    return false;
  },

  _resetLastNameFilter: function(){
    $('.active-letter').toggleClass('active-letter');
    $('.all-letters').toggleClass('active-letter');
  },
});