import React from "react";
import { useState, useEffect } from "react";
import { sortById, sortByAge,sortByName,sortByEmail } from "./SortFucnction";

import Popup from "./Popup";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { handleDeletePerson } from "./DeleteFunction";
import EditPopup from "./EditPopup";
import IconButton from "@mui/material/IconButton";


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

function MainPage() {
  // Create array data using hook to apply localStorage()
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      return JSON.parse(savedData);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);

  //Function to opn create popup
  const handleOpen = () => {
    setOpen(true);
  };
  //function to close create popup
  const handleClose = () => {
    setOpen(false);
  };
  //Function to create edit popup
  const handleEditOpen = (person) => {
    setEditingPerson(person);
    setEditing(true);
  };
  //Create data
  const handleAddPerson = (formData) => {
    const newPerson = {
      id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
      ...formData,
    };
    setData([...data, newPerson]);
  };
  //Delete data
  const handleDelete = (id) => {
    handleDeletePerson(id, data, setData);
  };
  //Edit and update data
  const handleEditPerson = (id, updatedData) => {
    setData((prevData) =>
      prevData.map((person) =>
        person.id === id ? { ...person, ...updatedData } : person
      )
    );
  };

  return (
    <div style={{ paddingLeft: 300, paddingRight: 300, paddingTop: 50,paddingBottom:50, overflow:'hidden' }}>
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
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "white",
                  borderRight: "1px solid gray",
                }}
              >
                ID{""}
                <IconButton
                  sx={{ fontSize: "15px", color: "white" }}
                  onClick={() =>
                    sortById(data, sortOrder, setData, setSortOrder)
                  }
                >
                  {sortOrder === "asc" ? (
                    <AiOutlineArrowDown />
                  ) : (
                    <AiOutlineArrowUp />
                  )}
                </IconButton>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "white",
                  borderRight: "1px solid gray",
                }}
                onClick={() => sortByName(data, sortOrder, setData, setSortOrder)}
              >
                Name{" "}
                <IconButton sx={{ fontSize: "15px", color: "white" }}>
                  {sortOrder === "asc" ? (
                    <AiOutlineArrowDown />
                  ) : (
                    <AiOutlineArrowUp />
                  )}
                </IconButton>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "white",
                  borderRight: "1px solid gray",
                }}
               
              >
                Age{""}
                <IconButton
                  sx={{ fontSize: "15px", color: "white" }}
                  onClick={() => sortByAge(data, sortOrder, setData, setSortOrder)}
                >
                  {sortOrder === "asc" ? (
                    <AiOutlineArrowDown />
                  ) : (
                    <AiOutlineArrowUp />
                  )}
                </IconButton>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "white",
                  borderRight: "1px solid gray",
                }}
              >
                Email{""}
                <IconButton
                  sx={{ fontSize: "15px", color: "white" }}
                  onClick={() => sortByEmail(data, sortOrder, setData, setSortOrder)}
                >
                  {sortOrder === "asc" ? (
                    <AiOutlineArrowDown />
                  ) : (
                    <AiOutlineArrowUp />
                  )}
                </IconButton>
              </TableCell>
              <TableCell style={{ width: "150px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  sx={{ textAlign: "center", borderRight: "1px solid gray" }}
                >
                  {row.id}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", borderRight: "1px solid gray" }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", borderRight: "1px solid gray" }}
                >
                  {row.age}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", borderRight: "1px solid gray" }}
                >
                  {row.email}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditOpen(row)}
                  >
                    Edit
                  </Button>
                  {editing && (
                    <EditPopup
                      open={editing}
                      handleClose={() => setEditing(false)}
                      handleEditPerson={handleEditPerson}
                      editingPerson={editingPerson}
                    />
                  )}
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "red", ml: 2 }}
                    onClick={() => handleDelete(row.id)}
                  >
                    Del
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
        handleOpen={handleOpen}
      />
    </div>
  );
}

export default MainPage;
