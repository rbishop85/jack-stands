const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    photo: String
    vehicles: [Vehicle]
    updates: [Update]
    partsShelf: [Part]
  }

  type Vehicle {
    _id: ID
    make: String
    model: String
    year: Int
    addedDate: String
    soldDate: String
    ownerId: String
    description: String
    photos: [String]
    updates: [Update]
  }

  type Update {
    _id: ID
    ownerId: String
    vehicleId: String
    postedDate: String
    photos: [String]
    description: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    vehicles: [Vehicle]
    vehicle(_id: String!): Vehicle
    updates: [Update]
    update(_id: String!): Update
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
