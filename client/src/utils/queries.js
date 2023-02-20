import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      photo
      vehicles {
        _id
        make
        model
        year
        description
      }
      updates {
        _id
        description
      }
      partsShelf {
        _id
        name
        description
        location
        type
      }
    }
  }
  # query me {
  #   me {
  #     _id
  #     username
  #     email
  #   }
  # }
`;
