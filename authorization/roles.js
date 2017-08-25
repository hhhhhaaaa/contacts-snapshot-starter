const allUserRoles = ['admin', 'viewer'];

const userActions = {
  "viewContacts": ['admin', 'viewer'],
  "viewContact": ['admin', 'viewer'],
  "createContact": ['admin'],
  "deleteContact": ['admin']
};

const canUserAccess = (user, action) => {
  console.log(user);
  const role = user.role;
  const username = user.username;
  const allActions = Object.keys(userActions);
  const isValidRole = allUserRoles.includes(role);
  console.log(isValidRole);
  if (!isValidRole) {
    throw new Error(`User with username: ${username} does not have a valid role!`);
  } else if (!allActions.includes(action)) {
    throw new Error(`Tried to get permissions for an invalid action. Action: ${action}`);
  } else {
    const capabilities = userActions[action];
    //Returns true or false.
    return capabilities.includes(user.role);
  }
};

module.exports = canUserAccess;
