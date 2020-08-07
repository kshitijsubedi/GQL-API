const { Text,Password,CalendarDay, Checkbox, DateTime } = require('@keystonejs/fields');

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

module.exports = {
    fields: {
        name: { type: Text },
        email: {
          type: Text,
          isUnique: true,
        },
        isAdmin: {
          type: Checkbox,
          access: {
            update: access.userIsAdmin,
          },
        },
        password: {
          type: Password,
        },
      firstName:{
        type:Text,
      },
      lastName:{
          type:Text,
      },
      dob:{
        type:CalendarDay,
      },
      lastLogin:{
        type:DateTime,
      },
      // access: {
      //  read: access.userIsAdminOrOwner,
      //  update: access.userIsAdminOrOwner,
      //  create: access.userIsAdmin,
      //  delete: access.userIsAdmin,
      //  auth: true,
      // },
}
};
