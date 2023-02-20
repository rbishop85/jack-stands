import React from "react";
import { Navigate, Redirect, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <div>
            Viewing {user.username}'s profile.
          </div>
          <div>
            Email: {user.email}
          </div>
        </>
      ) : (
          <Navigate to="/" />
      )}
    </div>
  );

  // if (user.username) {


  //   return (
  //     <div>
  //       Viewing {user.username}'s profile.
  //       Email: {user.email}
  //     </div>
  //   );
  // } else {
  //   return <Navigate to="/" />
  // }


  
};

export default Profile;
