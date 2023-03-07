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
      <h1>Assign new surveys to your field agents</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>AssignmentID</TableCell>
              <TableCell>FieldAgent</TableCell>
              <TableCell>Street</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Postal Code</TableCell>
              <TableCell>Lat</TableCell>
              <TableCell>Long</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.AssignmentID}>
                <TableCell>{row.AssignmentID}</TableCell>
                <TableCell>{row.FieldAgent}</TableCell>
                <TableCell>{row.Street}</TableCell>
                <TableCell>{row.City}</TableCell>
                <TableCell>{row.Postal}</TableCell>
                <TableCell>{row.Lat}</TableCell>
                <TableCell>{row.Long}</TableCell>
                <TableCell>Yes|No</TableCell>
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
