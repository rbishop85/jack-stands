import React from "react";
import { Link, Navigate, Redirect, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Button } from '@mui/material/';
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
    <div id="profile">
      {Auth.loggedIn() ? (
        <>
          <div>
            Viewing {user.username}'s profile.
          </div>
          <div>
            Email: {user.email}
          </div>

          <Link to="/garage">
            <Button variant="contained" className="">
              Garage
            </Button>
          </Link>

          <div>
            <br></br>
            <div>Updates:</div>
            {user.updates.map(
              ({ _id, title, description, vehicle, postedDate }) => (
                <div key={_id}>
                  <div>----------</div>
                  <div>Title: {title}</div>
                  <div>Description: {description}</div>
                  <div>Vehicle: {vehicle.model}</div>
                  <div>Posted: {postedDate}</div>
                </div>
              )
            )}
          </div>

          {/* <div>
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
          </div> */}

        </>
      ) : (
          <Navigate to="/" />
      )}
    </div>
  );
  
};

export default Profile;
