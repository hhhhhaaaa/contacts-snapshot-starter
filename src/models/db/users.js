const db = require('./db');

const createUser = function(username, password){
  return db.query(`
    INSERT INTO
      users (username, password)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
    `,
    [
      username,
      password,
    ])
    .catch(error => { throw error;
    });
};

const findUser = function(username){
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
    `,
  [
    username
  ])
  .catch(error => { console.log(error.message);
  });
};

module.exports = {
  createUser,
  findUser
};
