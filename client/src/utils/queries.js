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
        addedDate
        updates {
          _id
          description
        }
      }
      updates {
        _id
        title
        description
        vehicle {
          _id
          year
          make
          model
        }
        postedDate
      }
      partsShelf {
        _id
        name
        type
        location
        addedDate
      }
    }
  }
`;

export const QUERY_VEHICLE = gql`
  query vehicle($id: ID!) {
    vehicle(_id: $id) {
      _id
      year
      make
      model
      description
      addedDate
      updates {
        _id
        title
        description 
        vehicle {
          _id
          year
          make
          model
        }
        postedDate
      }
    }
  }
`;

export const QUERY_UPDATE = gql`
  query update($id: String!) {
    update(_id: $id) {
      _id
      title
      description
      vehicle {
        _id
        year
        make
        model
      }
      postedDate
    }
  }
`;
