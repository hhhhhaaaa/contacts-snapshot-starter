const router = require('express').Router();
const contactsRoutes = require('./contacts');
const Contacts = require('../../models/contacts');
const usersRoutes = require('./users');

const isLoggedIn = function(req,res,next) {
  if(req.session.user) {
    next();
  } else {
    res.redirect("/home");
  }
};

router.get('/home', (request, response) => {
  response.render('index');
});

router.use('/', usersRoutes);

//check if logged in, redirect to home if not
router.use(isLoggedIn);

router.get('/', (request, response) => {
  Contacts.getContacts()
    .then((contacts) => {response.render('contacts/index', { contacts });})
    .catch( err => console.log('err', err) );
});

router.use('/contacts', contactsRoutes); // /contacts/search

module.exports = router;
