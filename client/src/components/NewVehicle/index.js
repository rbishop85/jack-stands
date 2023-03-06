import { Button, styled, TextField } from "@mui/material";
import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_VEHICLE } from '../../utils/mutations';

const StyledTextField = styled(TextField)(({ theme }) => ({
    margin: "1rem",
    width: "300px",
  }));

const NewVehicle = (props) => {

  const [formState, setFormState] = useState({ 
    make: '',
    model: '',
    year: '',
    description: '' 
  });

  const [addVehicle, { error, data }] = useMutation(ADD_VEHICLE);
  const nav = useNavigate();

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addVehicle({
        variables: { ...formState },
      });

    //   What Am I getting back?
      console.log(data.addVehicle._id);
      props.handleClose();
      nav(`/vehicle/${data.addVehicle._id}`);
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
      <StyledTextField
        id="make"
        label="Make"
        name="make"
        required
        autoFocus
        value={formState.make}
        onChange={handleChange}
      />
      <StyledTextField
        id="model"
        label="Model"
        name="model"
        required
        value={formState.model}
        onChange={handleChange}
      />
      <StyledTextField
        id="year"
        label="Year"
        name="year"
        required
        value={formState.year}
        onChange={handleChange}
      />
      <StyledTextField
        id="description"
        label="Description"
        name="description"
        required
        value={formState.description}
        onChange={handleChange}
      />
      <div>
        <Button variant="contained" sx={{ margin: "2rem" }} onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ margin: "2rem" }}
        >
          Add Vehicle
        </Button>
      </div>
    </form>
  );
};

export default NewVehicle;