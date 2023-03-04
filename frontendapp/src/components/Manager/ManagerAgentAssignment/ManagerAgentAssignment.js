import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
} from "@mui/material";

function Assignments() {
  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, name: "", age: 0 }]);
  };
  console.log(rows);
  return (
    <>
      <h1>this is the manager agent assignment</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          Add Row
        </Button>
      </TableContainer>
    </>
  );
}
export default Assignments;
