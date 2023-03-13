import { useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import { DELETE_VEHICLE } from "../../utils/mutations";
import ModalConfirm from "../ModalConfirm"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const VehicleCard = ({ _id, title, vehicle, postedDate }) => {

    // const [deleteVehicle, error ] = useMutation(DELETE_VEHICLE);
  
    const nav = useNavigate();
  
    // const deleteV = async (id) => {
    //   console.log(id);
    //   try {
    //     await deleteVehicle({
    //       variables: { vehicleId: id },
    //     });
  
    //     window.location.reload();
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };

    const navTo = (_id) => {
      nav(`/update/${_id}`)
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
            avatar={<Avatar>{vehicle.make.charAt(0).toUpperCase()}</Avatar>}
            title={ title }
            subheader={ "Vehicle: " + vehicle.year + " " + vehicle.make + " " + vehicle.model }
            // action={
            //   <IconButton>
            //     <ModalConfirm ChosenIcon={DeleteForeverIcon} question={"Are you sure you wish to delete this car?"} action={() => deleteV(_id)} />
            //   </IconButton>
            // }
          />
          <CardContent>
            <Typography>{"Posted: " + postedDate}</Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => navTo(_id)}>View Update</Button>
          </CardActions>
        </Card>
    )
}

export default VehicleCard