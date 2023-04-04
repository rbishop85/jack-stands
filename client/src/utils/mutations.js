import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_VEHICLE = gql`
  mutation addVehicle($make: String!, $model: String!, $year: String!, $description: String!) {
    addVehicle(make: $make, model: $model, year: $year, description: $description) {
      _id
    }
  }
`;

export const DELETE_VEHICLE = gql`
  mutation deleteVehicle($vehicleId: ID!) {
    deleteVehicle(vehicleId: $vehicleId) {
      _id
    }
  }
`;

export const ADD_UPDATE = gql`
  mutation addUpdate($title: String!, $description: String!, $vehicle: String) {
    addUpdate(title: $title, description: $description, vehicle: $vehicle) {
      _id
    }
  }
`;

export const DELETE_UPDATE = gql`
  mutation deleteUpdate($updateId: ID!, $vehicle: String) {
    deleteUpdate(updateId: $updateId, vehicle: $vehicle) {
      _id
    }
  }
`;