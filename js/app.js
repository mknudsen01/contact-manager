var app = app || {};

$(function() {

  var contacts = [
    {
      name: 'Test',
      email: 'test@email.com',
      title: 'very important person',
      phone: '1234567890'
    },
  ];


  new app.RolodexView( contacts );
});