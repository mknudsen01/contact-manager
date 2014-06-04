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
    var element = event.target;
    var attribute = element.dataset.id;
    if(attribute){
      $(element).attr('contenteditable', true);
      $(element).addClass('editing');
      $(element).focus();
    }
  },

  close: function(event){
    event.preventDefault();
    var element = event.target;
    var attribute = element.dataset.id;
    var value = $(event.target).html();
    value = value.replace(/&nbsp;/g," ").trim();
    if(value){
      this.model.save(attribute, value);
    } else {
      $(element).text(this.model.attributes[attribute]);
    }

    $(element).attr('contenteditable', false);
    $(element).removeClass('editing');
  },

  updateOnEnter: function(event){
    if(event.which === ENTER_KEY){
      this.close(event);
    }
  }
});