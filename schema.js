const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

// Temp Hardcoded Data
const users = [
  {id: 1, name: 'Fernando', username: 'ferdelamad', email: 'ferdelamad@gmail.com'},
  {id: 2, name: 'Nick', username: 'nvh', email: 'nvh@gmail.com'},
  {id: 2, name: 'Penelope', username: 'pecalderon', email: 'penny@gmail.com'},
];

// User Type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name:  { type: GraphQLString },
    username:  { type: GraphQLString },
    email:  { type: GraphQLString },
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return users.filter(user => user.id === args.id)[0]
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return users;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})
