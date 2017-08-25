const Contacts = require('../../models/contacts');
const {renderError} = require('../utils');
const canUserAccess = require('../../../authorization/roles.js');
const router = require('express').Router();

router.get('/new', (request, response) => {
  let canAccess = canUserAccess(request.session.user, "createContact");
  if(canAccess) {
    response.render('contacts/new');
  } else {
    response.status(403).render('not_authorized');
  }
});

router.post('/new', (request, response, next) => {
  let canAccess = canUserAccess(request.session.user, "createContact");
  if (canAccess) {
    Contacts.createContact(request.body)
      .then(function(contact) {
        if (contact) return response.redirect(`/contacts/${contact[0].id}`);
        next();
      })
      .catch(error => renderError(error, response));
  } else {
    response.redirect('/');
  }
});

router.get('/:contactId/delete', (request, response, next) => {
  const contactId = request.params.contactId;
  let canAccess = canUserAccess(request.session.user, "deleteContact");
  if (canAccess) {
    Contacts.deleteContact(contactId)
      .then(function(contact) {
        if (contact) return response.redirect('/');
        next();
      })
      .catch(error => renderError(error, response));
  } else {
    response.status(403).render('not_authorized');
  }
});

router.get('/', (request, response) => {
  let canAccess = canUserAccess(request.session.user, "deleteContact");
  Contacts.getContacts()
    .then((contacts) => {
      response.render('contacts/index', {
        contacts,
        canAccess
      });
    })
    .catch(err => console.log('err', err));
});

router.get('/:contactId', (request, response, next) => {
  let canAccess = canUserAccess(request.session.user, "deleteContact");
  const contactId = request.params.contactId;
  if (!contactId || !/^\d+$/.test(contactId)) return next();
  Contacts.getContact(contactId)
    .then(function(contact) {
      if (contact) return response.render('show', {
        contact,
        canAccess
      });
      next();
    })
    .catch(error => renderError(error, response));
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
    .catch(error => renderError(error, response));
});

module.exports = router;
