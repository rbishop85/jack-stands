import { useNavigate } from 'react-router-dom';
import { useMutation } from "@apollo/client";

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import { DELETE_UPDATE } from "../../utils/mutations";
import ModalConfirm from "../ModalConfirm"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const UpdateCard = ({ _id, title, vehicle, postedDate }) => {

    const [deleteUpdate, error ] = useMutation(DELETE_UPDATE);
  
    const nav = useNavigate();
  
    const deleteU = async (id, vehicle) => {
      console.log( "id: " + id );
      console.log("vehicle: " + vehicle );
      try {
        { vehicle ? (
          await deleteUpdate({
            variables: { updateId: id, vehicle: vehicle },
          })
        ) : (
          await deleteUpdate({
            variables: { updateId: id },
          })
        )}
  
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
    };

    const navTo = (_id) => {
      nav(`/update/${_id}`)
    }

    return (
        <Card
          variant="outlined"
          sx={{
            width: { xs: "90%", md: "30%"}
          }}
        >
          <CardHeader
            avatar={<Avatar>{ vehicle ? ( vehicle.make.charAt(0).toUpperCase() ) : "*" }</Avatar>}
            title={ title }
            subheader={ "Vehicle: " + ( vehicle ? ( vehicle.year + " " + vehicle.make + " " + vehicle.model ) : "  Not Available" )}
            action={
              <IconButton>
                <ModalConfirm ChosenIcon={DeleteForeverIcon} question={"Are you sure you wish to delete this Update?"} action={() => deleteU( _id, ( vehicle ? vehicle._id : "" ) )} />
              </IconButton>
            }
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

export default UpdateCard