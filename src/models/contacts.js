const db = require('./db/contacts.js');

const createContact = function(contact){
  return db.createContact(contact);
};

const getContacts = function(){
  return db.getContacts();
};

const getContact = function(contactId){
  return db.getContact(contactId);
};

const deleteContact = function(contactId){
  return db.deleteContact(contactId);
};

const searchForContact = function(searchQuery){
  return db.searchForContact(searchQuery);
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  searchForContact
};
