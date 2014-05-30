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

app.get( '/', function( request, response ) {
  response.send( 'Contacts API is running' );
});