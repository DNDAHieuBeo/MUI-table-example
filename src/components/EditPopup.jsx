import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";

function EditPopup(props) {
  const { open, handleClose, handleEditPerson, editingPerson } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: editingPerson,
  });

  const onSubmit = (data) => {
    handleEditPerson(editingPerson.id, data);
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
      <DialogTitle>Edit Person</DialogTitle>
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
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditPopup;
