const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./initial-data');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const PROJECT_NAME = 'hello';
const adapterConfig = { mongoUri: 'mongodb://localhost/hello' };

const UserSchema = require('./tables/user.js');
const MeetingSchema = require('./tables/meeting.js');


const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
});


keystone.createList('User', UserSchema);
keystone.createList('Meeting', MeetingSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
