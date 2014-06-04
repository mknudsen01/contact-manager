var app = app || {};

app.ContactView = Backbone.View.extend({
  tagName: 'article',
  className: 'box glow-dull col12 border-blue-5',
  template: _.template( $('#contactTemplate' ).html() ),
  attributes: {
    "data-name": "contact"
  },

  events: {
    'click [data-show-more]': 'showDetails',
    'click [data-delete]': 'deleteContact',
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
    this.$el.find('[data-details]').toggle('fast');
    this.$el.find('[data-show-more]').toggleClass('flip');
  },

  deleteContact: function(){
    this.model.destroy();
    this.remove();
  },

  edit: function(event){
    event.preventDefault();
    $(event.target).attr('contenteditable', true);
    $(event.target).addClass('editing');
    $(event.target).focus();
  },

  close: function(event){
    event.preventDefault();
    var element = event.target;
    var attribute = element.id;
    var value = $(event.target).html();

    if(value){
      this.model.save(attribute, value);
    } else {
      $(event.target).text(this.model.attributes[attribute]);
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