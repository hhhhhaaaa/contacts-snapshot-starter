const Contacts = require('../../models/contacts');
const {renderError} = require('../utils');
const canUserAccess = require('../../../authorization/roles.js');
const router = require('express').Router();

router.get('/new', (request, response) => {
  response.render('contacts/new');
});

router.post('/new', (request, response, next) => {
  console.log(request.session);
  if (canUserAccess(request.session.user, "createContact")) {
    Contacts.createContact(request.body)
      .then(function(contact) {
        if (contact) return response.redirect(`/contacts/${contact[0].id}`);
        next();
      })
      .catch(error => renderError(error, response, response));
  } else {
    response.redirect('/');
  }
});

router.get('/', (request, response) => {
  Contacts.getContacts()
    .then((contacts) => {
      response.render('contacts/index', {
        contacts
      });
    })
    .catch(err => console.log('err', err));
});

router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId;
  if (!contactId || !/^\d+$/.test(contactId)) return next();
  Contacts.getContact(contactId)
    .then(function(contact) {
      if (contact) return response.render('show', {
        contact
      });
      next();
    })
    .catch(error => renderError(error, response, response));
});


router.get('/:contactId/delete', (request, response, next) => {
  const contactId = request.params.contactId;
  Contacts.deleteContact(contactId)
    .then(function(contact) {
      if (contact) return response.redirect('/');
      next();
    })
    .catch(error => renderError(error, response, response));
});

router.get('/search', (request, response, next) => {
  const query = request.query.q;
  Contacts.searchForContact(query)
    .then(function(contacts) {
      if (contacts) return response.render('index', {
        query,
        contacts
      });
      next();
    })
    .catch(error => renderError(error, response, response));
});

module.exports = router;
