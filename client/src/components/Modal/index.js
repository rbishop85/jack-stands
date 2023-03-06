import { Dialog } from "@mui/material"
import NewVehicle from "../NewVehicle"
import { useState } from "react";
import { Button } from "@mui/material";


const Modal = () => {
  
    const [open, setOpen] = useState(false)
  
    const handleOpen = () => {
      setOpen(true)
    }
  
    const handleClose = (event, reason) => {
        if (reason && reason == "backdropClick") 
            return;
        setOpen(false)
    }

    return (
        <div className="modalTest">
            <Button variant="contained" onClick={handleOpen}>Add New Vehicle</Button>
            <Dialog open={open} onClose={handleClose}>
                <NewVehicle handleClose={handleClose}/>
            </Dialog>
        </div>

        )
}

export default Modal