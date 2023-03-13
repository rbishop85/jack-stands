import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";


import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import Modal from "../components/Modal";
import VehicleCard from "../components/VehicleCard";
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
          <Modal label={"Add Vehicle"} Content={NewVehicle} />
          <div>
            <br></br>
            <div>Garage:</div>
            {user.vehicles.map(
              ({ _id, make, model, year, color, trim, addedDate, updates }) => (
                <VehicleCard
                  key={_id} 
                  _id={_id}
                  make={make}
                  model={model}
                  year={year}
                  color={color}
                  trim={trim}
                  addedDate={addedDate}
                  updates={updates}
                />
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
