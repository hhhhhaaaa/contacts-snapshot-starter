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
      if (!user || loginPassword !== user.password) {
        console.log("Username and password don't match");
        response.redirect('/login');
      } else {
        console.log("User logged in");
        request.session.user = user.username;
        response.redirect('/');
      }
    })
    .catch( err => console.log('err', err) );
});

router.get('/signup', (request, response) => {
  response.render('signup');
});

router.post('/signup', (request, response) => {
  const username = request.body.username;
  const userPassword = request.body.password;
  bcrypt.hash(userPassword, saltRounds).then(newlyHashedPassword => {
    const hashedPassword = newlyHashedPassword;
    return hashedPassword;
  }).then(hashedPassword => {
  DbUsers.createUser(username, hashedPassword)
    .then((users) => {
      response.redirect('/login');
    })
    .catch( err => console.log('err', err) );
  });
  //.catch( err => {console.log("something happened with the hash: " + err.message )};)
});

router.get('/', (request, response) => {
  DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts });})
    .catch( err => console.log('err', err) );
});

router.use('/contacts', contacts); // /contacts/search

module.exports = router;
