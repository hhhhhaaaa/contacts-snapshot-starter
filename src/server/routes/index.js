const router = require('express').Router();
const contacts = require('./contacts');
const DbContacts = require('../../db/contacts');
const DbUsers = require('../../db/users');

router.get('/login', (request, response) => {
  response.render('login');
});

router.post('/login', (request, response) => {
  const loginUsername = request.body.username;
  const loginPassword = request.body.password;
  DbUsers.findUser(userInformation)
    .then((users) => {
      response.redirect('/');
      console.log("User logged in");
    })
    .catch( err => console.log('err', err) );
});

router.get('/signup', (request, response) => {
  response.render('signup');
});

router.post('/signup', (request, response) => {
  const userInformation = request.body;
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
