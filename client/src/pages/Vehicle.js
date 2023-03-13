import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Typography } from '@mui/material'

import { QUERY_VEHICLE } from "../utils/queries";
import UpdateCard from "../components/UpdateCard";

import Auth from "../utils/auth";

function Vehicle() {

  let { id } = useParams();


  const { loading, data } = useQuery(QUERY_VEHICLE, {
    variables: { id: id },
  });

  const vehicle = data?.vehicle || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(vehicle);

  return (
    <div id="vehicle">
      <div>
        <Typography>Year: {vehicle.year}</Typography>
        <Typography>Make: {vehicle.make}</Typography>
        <Typography>Model: {vehicle.model}</Typography>
      </div>

      <div>
        <br />
        <Typography>Recent Updates:</Typography>
        {vehicle.updates.map(
          ({ _id, title, vehicle, postedDate }) => (
            <UpdateCard
              key={_id}
              _id={_id}
              title={title}
              vehicle={vehicle}
              postedDate={postedDate}
            />
          )
        )}
      </div>


    </div>
  );
  
};

export default Vehicle;
