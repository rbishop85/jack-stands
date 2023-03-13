import { useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { DELETE_VEHICLE } from "../../utils/mutations";
import ModalConfirm from "../ModalConfirm"



const VehicleCard = ({ _id, make, model, year, color, trim, addedDate, updates }) => {

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

    const navTo = (car) => {
      nav(`/vehicle/${car}`)
    }

    return (
        <Card
          variant="outlined"
          sx={{
            // width: "90%"
            width: { xs: "90%", md: "30%"}
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
}

export default VehicleCard