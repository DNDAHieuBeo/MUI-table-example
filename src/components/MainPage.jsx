import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Popup from "./Popup";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import EditDialog from "./EditDialog";

function MainPage() {
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("exampleTableData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("exampleTableData", JSON.stringify(data));
  }, [data]);

  const handleOpen = () => {
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
  };


  const handleAddPerson = (formData) => {
    const newPerson = {
      id: uuidv4(),
      ...formData,
    };
    setData([...data, newPerson]);
  };

  const handleDeletePerson = (id) => {
    const index = data.findIndex((person) => person.id === id);
    if (index !== -1) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };

  

  return (
    <div style={{paddingLeft:400,paddingRight:300,paddingTop:50}}>
      <TableContainer component={Paper} sx={{ width: "auto", margin: "auto" }}>
        <Button
          onClick={handleOpen}
          style={{
            width: "50px",
            position: "absolute",
            bottom: "10px",
            right: "10px",
            color: "white",
            backgroundColor: "#3c629e",
            fontSize: 24,
            height: "60px",
            borderRadius: "50%",
          }}
        >
          <AiOutlinePlus style={{ width: "100%" }} />
        </Button>
        <Table>
          <TableHead sx={{ backgroundColor: "#3c629e" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Email</TableCell>
              <TableCell style={{width:'150px'}}></TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeletePerson(row.id)}
                  >
                    D
                  </Button>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup
        open={open}
        handleClose={handleClose}
        handleAddPerson={handleAddPerson}
      />

    </div>
  );
}

export default MainPage;
