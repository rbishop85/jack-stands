import { Dialog } from "@mui/material"
import { useState } from "react";
import { Button } from "@mui/material";


const Modal = ({ label, Content }) => {
  
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
            <Button variant="contained" onClick={handleOpen}>{label}</Button>
            <Dialog open={open} onClose={handleClose}>
                <Content handleClose={handleClose}/>
            </Dialog>
        </div>

        )
}

export default Modal