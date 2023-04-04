import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Typography } from '@mui/material'

import { QUERY_UPDATE } from "../utils/queries";

function Vehicle() {

  let { id } = useParams();


  const { loading, data } = useQuery(QUERY_UPDATE, {
    variables: { id: id },
  });

  const update = data?.update || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log(data);

  console.log(update);

  return (
    <div id="update">
      <div>
        <Typography>Title: {update.title}</Typography>
        <Typography>Description: {update.description}</Typography>
        <Typography>Vehicle: { update.vehicle ? ( update.vehicle.year + " " + update.vehicle.make + " " + update.vehicle.model ) : "  Not Available" }</Typography>
      </div>
    </div>
  );
  
};

export default Vehicle;
