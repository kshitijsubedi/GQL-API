const { Text, Checkbox, Relationship, DateTime,CalendarDay,Integer, Password } = require('@keystonejs/fields');

module.exports = {
  fields: {
    title: {
      type: Text,
      isRequired: true,
    },
    RoomName: {
      type: Text,
      isRequired:true,
    },

    host:{
            type: Relationship,
            ref: 'User',
            isRequired:true,
    },
    active:{
        type:Checkbox,
        defaultValue: false,
    },
    dateTime:{
        type:CalendarDay,
    },
    participantsCount:{
        type:Integer,
        defaultValue: 1,
    },
    meetingPassword:{
        type:Password,
        isRequired:true,
    }
  },
};