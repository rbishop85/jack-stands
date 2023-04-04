import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_UPDATE } from '../../utils/mutations';

const NewUpdate = (props) => {

  const [formState, setFormState] = useState({ 
    title: '',
    description: '',
    vehicle: ''
  });

  const [addUpdate, { error, data }] = useMutation(ADD_UPDATE);
  const nav = useNavigate();

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    console.log(formState);
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addUpdate({
        variables: { ...formState },
      });

    //   What Am I getting back?
      console.log(data.addUpdate._id);
      props.handleClose();
      nav(`/update/${data.addUpdate._id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <TextField
        sx={{ m: 2 }}
        fullWidth
        id="title"
        label="Title"
        name="title"
        required
        autoFocus
        value={formState.title}
        onChange={handleChange}
      />
      <TextField
        sx={{ m: 2 }}
        fullWidth
        multiline
        maxRows={3}
        id="description"
        label="Description"
        name="description"
        required
        value={formState.description}
        onChange={handleChange}
      />
      <FormControl sx={{ m: 2, minWidth: 100 }}>
        <InputLabel id="vehicle-select-label">Vehicle</InputLabel>
        <Select
            labelId="vehicle-select-label"
            id="vehicle-select"
            name="vehicle"
            label="Vehicle"
            autoWidth
            value={formState.vehicle}
            onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          {props.data.map(
              ({ _id, year, make, model }) => (
                  <MenuItem key={_id} value={_id} >{year + " " + make + " " + model}</MenuItem>
              )
          )}
            
        </Select>
      </FormControl>
      <div>
        <Button variant="contained" sx={{ margin: 1 }} onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ margin: 1 }}
        >
          Add Update
        </Button>
      </div>
    </form>
  );
};

export default NewUpdate;