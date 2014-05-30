var application_root = __dirname,
    express = require( 'express' ),
    path = require( 'path' ),
    mongoose = require( 'mongoose' );

var app = express();

app.configure( function() {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( application_root, 'site' ) ) );
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true}));
});

var port = 1414;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env);
});

mongoose.connect( 'mongodb://localhost/contacts_database' );

var Contact = new mongoose.Schema({
  firstName: String,
  lastName: String,
  title: String,
  company: String,
  email: String,
  phone: String
});

var ContactModel = mongoose.model( 'Contact', Contact );

app.get( '/contacts', function( request, response ) {
  return ContactModel.find( function(err, contacts ) {
    if(!err) {
      return response.send( contacts );
    } else {
      return console.log( err );
    }
  });
});

app.get( '/contacts/:id', function( request, response ) {
    return ContactModel.findById( request.params.id, function( err, contact ) {
        if( !err ) {
            return response.send( contact );
        } else {
            return console.log( err );
        }
    });
});

app.post( '/contacts', function( request, response ){
  var contact = new ContactModel({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    title: request.body.title,
    company: request.body.company,
    email: request.body.email,
    phone: request.body.phone
  });

  return contact.save( function( err ){
    if(!err){
      console.log( 'created' );
      return response.send( contact );
    } else {
      console.log( err );
    }
  });
});