import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";


import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

import Modal from "../components/Modal";
import NewVehicle from "../components/NewVehicle"

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
          <Modal label={"Add Vehicle"} Content={NewVehicle}/>
          <div>
            <br></br>
            <div>Garage:</div>
            {user.vehicles.map(
              ({ _id, make, model, year, addedDate, updates }) => (
                <div key={_id}>
                  <div>----------</div>
                  <Link to={`/vehicle/${_id}`}>
                    <div>{year + ' ' + make + ' ' + model}</div>
                  </Link>
                  
                  <div>Added: {addedDate}</div>
                  <div>Total Updates: {updates.length}</div>
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
