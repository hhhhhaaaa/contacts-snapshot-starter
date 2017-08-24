const db = require('./db/users');

const createUser = function(username, password){
  return db.createUser(username, password);
};

const findUser = function(username){
  return db.findUser(username);
};

const isValidPassword= function(plainTextPassword, encryptedPassword) {

};

module.exports = {
  createUser,
  findUser
};
