var app = app || {};

$(function() {

  var contacts = [
    {
      firstName: 'Test',
      lastName: 'Testerson',
      email: 'test@email.com',
      company: 'cool company',
      title: 'very important person',
      phone: '1234567890'
    },

    {
      firstName: 'Test',
      lastName: 'Testerson',
      email: 'test@email.com',
      company: 'cool company',
      title: 'very important person',
      phone: '1234567890'
    },

    {
      firstName: 'Test',
      lastName: 'Testerson',
      email: 'test@email.com',
      company: 'cool company',
      title: 'very important person',
      phone: '1234567890'
    },

    {
      firstName: 'Test',
      lastName: 'Testerson',
      email: 'test@email.com',
      company: 'cool company',
      title: 'very important person',
      phone: '1234567890'
    },

  ];


  new app.RolodexView( contacts );
});