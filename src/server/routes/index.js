const bcrypt = require('bcrypt');
const router = require('express').Router();
const contacts = require('./contacts');
const DbContacts = require('../../db/contacts');
const DbUsers = require('../../db/users');

const saltRounds = 10;

router.get('/login', (request, response) => {
  response.render('login');
});

router.post('/login', (request, response) => {
  const loginUsername = request.body.username;
  const loginPassword = request.body.password;
  DbUsers.findUser(loginUsername)
    .then((user) => {
      if (!user || loginPassword !== user[0].password) {
        console.log("Username and password don't match");
        response.redirect('/login');
      } else {
        console.log("User logged in");
        request.session.user = user[0].username;
        response.redirect('/');
      }
    })
    .catch( err => console.log('err', err) );
});

router.get('/signup', (request, response) => {
  response.render('signup');
});

router.post('/signup', (request, response) => {
  const userInformation = request.body;
  const userPassword = request.body.password;
  bcrypt.hash(userPassword, saltRounds, function(err, hash) {

  });
  DbUsers.createUser(userInformation)
    .then((users) => {
      response.redirect('/login');
      console.log("User created");
    })
    .catch( err => console.log('err', err) );
});

router.get('/', (request, response) => {
  DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts });})
    .catch( err => console.log('err', err) );
});

router.use('/contacts', contacts); // /contacts/search

module.exports = router;
