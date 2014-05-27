var app = app || {};

app.ContactView = Backbone.View.extend({
  tagName: 'div',
  className: 'contactContainer',
  template: _.template( $('#contactTemplate' ).html() ),

  events: {
    'click #show': 'showDetails',
    'click #hide': 'hideDetails'
  },

  render: function(){
    this.$el.html( this.template( this.model.toJSON() ) );

    return this;
  },

  showDetails: function(event){
    event.preventDefault();
    $(event.target).toggleClass('hidden');
    $(event.target).parent().parent().next().show('fast');
  },

  hideDetails: function(event) {
    event.preventDefault();
    $(event.target).parent().parent().hide('fast');
    $(event.target).parent().parent().prev().find('footer a').toggleClass('hidden');
  }
});