var app = app || {};

app.NoResultsView = Backbone.View.extend({
  tagName: 'article',
  className: 'no-results',
  template: _.template( $('#noResultsTemplate').html() ),

  render: function(){
    this.$el.html( this.template() );
    return this;
  }

});