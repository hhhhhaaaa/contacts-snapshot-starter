const router = require('express').Router();
const contactsRoutes = require('./contacts');
const Contacts = require('../../models/contacts');
const usersRoutes = require('./users');



router.get('/home', (request, response) => {
  console.log("***", request.session, request.session.user);
  response.render('index');
});

router.get('/', (request, response) => {
  Contacts.getContacts()
    .then((contacts) => {response.render('contacts/index', { contacts });})
    .catch( err => console.log('err', err) );
});

router.use('/contacts', contactsRoutes); // /contacts/search
router.use('/', usersRoutes);

module.exports = router;
