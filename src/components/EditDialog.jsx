import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const EditDialog = ({ open, handleClose, handleEdit, person }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: person,
  });

  const onSubmit = (data) => {
    handleEdit(person.id, data);
    handleClose();
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
            type="text"
            fullWidth
            {...register("name", { required: true })}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            {...register("age", { required: true })}
          />
          <TextField
            margin="dense"
            label="Gender"
            type="text"
            fullWidth
            {...register("gender", { required: true })}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
