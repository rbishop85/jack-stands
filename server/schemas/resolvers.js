const { AuthenticationError } = require('apollo-server-express');
const { User, Vehicle, Update } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Find all users
    users: async () => {
      return User.find();
    },
    // Find single user by username
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    // If logged in, search current user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Find all vehicles
    vehicles: async () => {
      return Vehicle.find();
    },
    // Find single vehicle by ID
    vehicle: async (parent, { _id }) => {
      return Vehicle.findOne({ _id });
    },
    // Find all updates
    updates: async () => {
      return Update.find();
    },
    // Find single update by ID
    update: async (parent, { _id }) => {
      return Update.findOne({ _id });
    },

  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user found with this username');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // addVehicle - (Create new vehicle)
    addVehicle: async (parent, { make, model, year, addedDate, description }, context) => {

      const vehicle = await Vehicle.create({ make, model, year, addedDate, ownerId: context.user.username, description });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { vehicles: vehicle._id } }
      );

      return vehicle;
    },

    // editVehicle - (Update an existing vehicle)
    editVehicle: async (parent, args, context) => {
      if (context.user) {
        return Vehicle.findOneAndUpdate(
          { _id: args._id, ownerId: context.user.username },
          args, 
          { new: true }
        );
      }

      throw new AuthenticationError('Not logged in');
    },

    // deleteVehicle - (Delete a vehicle and remove it from the owner's list of vehicles)
    deleteVehicle: async (parent, { vehicleId }, context) => {
      if (context.user) {
        const vehicle = await Vehicle.findOneAndDelete({
          _id: vehicleId,
          ownerId: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { vehicles: vehicleId } }
        );

        return vehicle;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // addUpdate - (Create new update)
    addUpdate: async (parent, { vehicleId, postedDate, photos, description }, context) => {

      const update = await Update.create({ ownerId: context.user.username, vehicleId, postedDate, photos, description });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { updates: update._id } }
      );

      return update;
    },

    // editUpdate - (Edit an existing update)
    editUpdate: async (parent, args, context) => {
      if (context.user) {
        return Update.findOneAndUpdate(
          { _id: args._id, ownerId: context.user.username },
          args, 
          { new: true }
        );
      }

      throw new AuthenticationError('Not logged in');
    },

    // deleteUpdate - (Delete an update and remove it from the owner's list of updates)
    deleteUpdate: async (parent, { updateId }, context) => {
      if (context.user) {
        const update = await Update.findOneAndDelete({
          _id: updateId,
          ownerId: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { updates: updateId } }
        );

        return update;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
