import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
  const params = useParams();
  const userId = params.userid;
  const [rows, setRows] = useState([]);

  //// get data from api
  const fetchManagerAssignments = async (userId) => {
    axios
      .get(
        `http://localhost:8080/manager/${userId}/assignments`
        // , {
        //userId is URL parameter;query paramaeters are used when you are
        //sending a query param to the backend to be used in filtering
        // params: {
        //   id: userId,
        // },
        // }
      )
      .then((response) => {
        // console.log("am in the fetch manager assignments", response.data);
        setRows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchManagerAssignments(userId);
  }, []);

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, name: "", age: 0 }]);
  };
  console.log(rows);

  const handleRowDelete = async (assignmentid) => {
    axios
      .delete(`http://localhost:8080/assignment/${assignmentid}`)
      .then((response) => {
        // console.log("am in the fetch manager assignments", response.data);
        fetchManagerAssignments(userId);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Your field agent's assignments</h1>
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
              <TableCell>Delete?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.fieldagentname}</TableCell>
                <TableCell>{row.street}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.postalcode}</TableCell>
                <TableCell>{row.latitude}</TableCell>
                <TableCell>{row.longitude}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleRowDelete(row.id);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Yes
                  </Button>
                </TableCell>
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
