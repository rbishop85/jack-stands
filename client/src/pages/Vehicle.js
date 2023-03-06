import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Typography } from '@mui/material'

import { QUERY_VEHICLE } from "../utils/queries";

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
          ({ _id, title, description, postedDate }) => (
            <div key={_id}>
              <Typography>----------</Typography>
              <Typography>Title: {title}</Typography>
              <Typography>Description: {description}</Typography>
              <Typography>Posted: {postedDate}</Typography>
            </div>
          )
        )}
      </div>


    </div>
  );
  
};

export default Vehicle;
