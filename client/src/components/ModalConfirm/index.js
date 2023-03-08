import { Dialog, Typography } from "@mui/material"
import { useState } from "react";
import { Button } from "@mui/material";


const Modal = ({ ChosenIcon, question, action }) => {
  
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
        <>
            <ChosenIcon onClick={handleOpen}/>
            <Dialog open={open} onClose={handleClose}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem",
                    }}
                >
                    <Typography>{question}</Typography>
                    <div>
                        <Button variant="contained" sx={{ margin: "2rem" }} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ margin: "2rem" }}
                            onClick={action}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>

        )
}

export default Modal