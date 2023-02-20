import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

// const defaultProfile = "./assets/images/defaultprofile.jpg";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  


  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {console.log(user)}
    Viewing {userParam ? `${user.username}'s` : "your"} profile.
      {/* {Auth.loggedIn() ? (
        <div>
          {console.log(user)}
        </div>
      ) : 
      
      } */}
    </>
  );
};

export default Profile;
