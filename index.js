// dependenices and packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8080;
const db = require('./config/mongoose');
const Contact = require('./models/contact');

// express server
const app = express();

// setting view templates and middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));

// contact list
var contactsList = [
    {
        name: "Onkar",
        phone: 1234567890,
    },
    {
        name: "Sanket",
        phone: 1234566789,
    },
    {
        name: "Priya",
        phone: 3334566789,
    }
]

// home page handler
app.get('/', function (req, res) {

    Contact.find({}, function(err, allContacts){
        if(err){
            console.log('error in retrieving contacts from db');
            return;
        }
        return res.render('home', {
            contact_list: allContacts,
        });
    })
    
})

// add contact handler
app.post('/create-contact', function (req, res) {

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err){
        if(err){
            console.log('error in creating new contact')
            return;
        }

        return res.redirect('back');
    });
});

// deleting contact
app.get('/delete-contact/:id', function(req, res){

    // find the contact in db using id
    Contact.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log('error in deleting an object from db');
            return;
        }

        return res.redirect('/');
    });
    
});

// checking availability of server
app.listen(port, function (error) {
    if (error) {
        console.log('Something is wrong', error);
    }

    console.log("Yes, Express is running at port", port);
})