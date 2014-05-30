var app = app || {};

app.ContactView = Backbone.View.extend({
  tagName: 'div',
  className: 'contactContainer',
  template: _.template( $('#contactTemplate' ).html() ),

  events: {
    'click #show': 'showDetails',
    'click #hide': 'hideDetails',
    'click .delete': 'deleteContact',
    'dblclick': 'edit',
    'blur .editing': 'close',
    'keypress .editing': 'updateOnEnter'
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
  },

  deleteContact: function(){
    this.model.destroy();
    this.remove();
  },

  edit: function(event){
    $(event.target).attr('contenteditable', true);
    $(event.target).addClass('editing');
    $(event.target).focus();
  },

  close: function(event){
    var element = event.target;
    var attribute = element.id;
    var value = $(event.target).html();

    if(value){
      this.model.save(attribute, value);
    }

    $(event.target).attr('contenteditable', false);
    $(event.target).removeClass('editing');
  },

  updateOnEnter: function(event){
    if(event.which === ENTER_KEY){
      this.close(event);
    }
  }
});