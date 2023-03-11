import React from "react";
import { Navigate } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";


import { QUERY_ME } from "../utils/queries";
import { DELETE_VEHICLE } from "../utils/mutations";

import Auth from "../utils/auth";

import Modal from "../components/Modal";
import ModalConfirm from "../components/ModalConfirm"
import NewVehicle from "../components/NewVehicle"
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Garage() {

  const [deleteVehicle, error ] = useMutation(DELETE_VEHICLE);

  const nav = useNavigate();

  const deleteV = async (id) => {
    console.log(id);
    try {
      await deleteVehicle({
        variables: { vehicleId: id },
      });

      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  const navTo = (car) => {
    nav(`/vehicle/${car}`)
  }

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
                <Card 
                  key={_id} 
                  variant="outlined"
                  style={{
                    width: 400
                  }}
                >
                  <CardHeader
                    avatar={<Avatar>{make.charAt(0).toUpperCase()}</Avatar>}
                    title={make + ' ' + model}
                    subheader={(year) + ( color ? ( " " + color ) : " color" ) + ( trim ? ( " " + trim ) : " trim" ) }
                    action={
                      <IconButton>
                        <ModalConfirm ChosenIcon={DeleteForeverIcon} question={"Are you sure you wish to delete this car?"} action={() => deleteV(_id)} />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography>{"Added: " + addedDate}</Typography>
                    <Typography>{"Total Updates: " + (updates.length)}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => navTo(_id)}>View Vehicle</Button>
                  </CardActions>
                </Card>
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
