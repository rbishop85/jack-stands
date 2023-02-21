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
    title: String
    description: String
    photos: [String]
    vehicle: Vehicle
    ownerId: String
    postedDate: String
  }

  type Part {
    _id: ID
    name: String
    type: String
    description: String
    location: String
    photos: [String]
    addedDate: String
    ownerId: String
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
    parts: [Part]
    part(_id: String!): Part
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addVehicle(
      make: String!
      model: String!
      year: Int!
      addedDate: String
      description: String
    ): Vehicle
    editVehicle(
      _id: ID!
      make: String
      model: String
      year: Int
      soldDate: String
      photos: [String]
      description: String
    ): Vehicle
    deleteVehicle(vehicleId: ID!): Vehicle

    addUpdate(
      title: String!
      description: String!
      photos: [String]
      vehicle: String!
    ): Update
    editUpdate(
      _id: ID!
      vehicleId: String
      photos: [String]
      description: String
    ): Update
    deleteUpdate(updateId: ID!): Update
    
    addPart(
      name: String!
      type: String
      description: String
      addedDate: String
      photos: [String]
      location: String
    ): Part
    editPart(
      _id: ID!
      name: String!
      type: String
      description: String
      addedDate: String
      photos: [String]
      location: String
    ): Part
    deletePart(partId: ID!): Part
  }
`;

module.exports = typeDefs;
