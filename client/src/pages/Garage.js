import React from "react";
import { Navigate, Redirect, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

function Garage() {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  return (
    <div id="garage">
      {Auth.loggedIn() ? (
        <>
          <div>
            Viewing {user.username}'s garage.
          </div>

          <div>
            <br></br>
            <div>Garage:</div>
            {user.vehicles.map(
              ({ _id, make, model, year, addedDate, updates }) => (
                <div key={_id}>
                  <div>----------</div>
                  <div>Make: {make}</div>
                  <div>Model: {model}</div>
                  <div>Year: {year}</div>
                  <div>Added: {addedDate}</div>
                  <div>Updates: {updates.length}</div>
                </div>
              )
            )}
          </div>

        </>
      ) : (
          <Navigate to="/" />
      )}
    </div>
  );
  
};

export default Garage;
