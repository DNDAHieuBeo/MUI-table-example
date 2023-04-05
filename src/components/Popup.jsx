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
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (formData) => {
    handleAddPerson(formData);
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
      <DialogTitle>Add New Person</DialogTitle>
      <Button onClick={()=>handleClose()} style={{width:'20px', borderRadius:'50%'}}><AiOutlineClose/></Button>
      </Box>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <TextField
            type="string"
            {...register("name")}
            label="Name"
            fullWidth
            sx={{ mt: 1 }}
          />
          <TextField
            type="number"
            {...register("age")}
            label="Age"
            fullWidth
            sx={{ mt: 1 }}
          />
          <TextField
            type="email"
            {...register("email")}
            label="Email"
            fullWidth
            sx={{ mt: 1, mb: 1 }}
          />
          <Button variant="contained" color="primary" type="submit" style={{margin:'auto'}}>
            Add New Student
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
