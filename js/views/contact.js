var app = app || {};

app.ContactView = Backbone.View.extend({
  tagName: 'div',
  className: 'contactContainer',
  template: _.template( $('#contactTemplate' ).html() ),

  events: {},

  render: function(){
    this.$el.html( this.template( this.model.toJSON() ) );

    return this;
  },
});