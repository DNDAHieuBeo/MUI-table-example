import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";

const Popup = ({ open, handleClose, handleAddPerson }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    
  });
  const onSubmit = (formData) => {
    handleAddPerson(formData);
    reset();
    handleClose();
  };
  const validateAge = (value) => {
    if (!value) {
      return "Age is required";
    }
    if (isNaN(value)) {
      return "Age must be a number";
    }
    if (value < 16) {
      return "Age must be bigger than 16";
    }
    if (value > 60) {
      return "Age must be under 60";
    }
    return true;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <DialogTitle>Add New Person</DialogTitle>
        <Button
          onClick={() => handleClose()}
          style={{ width: "20px", borderRadius: "50%" }}
        >
          <AiOutlineClose />
        </Button>
      </Box>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            required
            {...register("name", {
              required: "Name is required",
              pattern: {
                value:  /^[A-Za-z\s]+$/i,
                message: "Name must only contain letters",
              },
            })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            margin="dense"
            label="Age"
            name="age"
            fullWidth
            required
            {...register("age", {
              validate: validateAge,
            })}
            error={Boolean(errors.age)}
            helperText={errors.age?.message}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            required
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Invalid email format",
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            
          >
            Add New Student
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
