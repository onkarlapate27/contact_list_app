// require the library
const mongoose = require('mongoose');

// connect mongoose to mongo db 
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire the connection
const db = mongoose.connection;

// check connection 
db.on('error', console.error.bind('error connecting to db'));
db.once('open', ()=>{
    console.log('db connected successfully!');
})