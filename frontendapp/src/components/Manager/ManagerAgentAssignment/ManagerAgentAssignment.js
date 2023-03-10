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
  TextField,
  Select,
  MenuItem,
  useThemeProps,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { green } from "@mui/material/colors";

function Assignments({ screenSize }) {
  const params = useParams();
  const userId = params.userid;
  const [rows, setRows] = useState([]);

  const [editableRowIndex, setEditableRowIndex] = useState(null);

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
    setRows([...rows, {}]);
  };

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

  const handleRowEdit = async (index) => {
    setEditableRowIndex(index);
  };

  const handleRowSave = (index) => {
    setEditableRowIndex(null);
  };

  const handleChange = (event, index, key) => {
    const newRows = [...rows];
    newRows[index][key] = event.target.value;
    setRows(newRows);
  };
  ////TESTING VARIOUS FUNCTIONALITIES
  ///// 1. testing post assignment api
  const testpostData = {
    street: "frontendposting_Test_1",
    city: "Aurora",
    postalcode: "L8K4F3",
    fieldagent_id: 1,
    latitude: 43.86,
    longitude: -79.79,
  };

  // axios
  //   .post("http://localhost:8080/assignment", testpostData)
  //   .then((response) => {
  //     console.log("Response of post:", response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error of post:", error);
  //   });

  ///////2. testing drop down select
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const [value, setValue] = React.useState("");
  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  if (screenSize === "mobile") {
    return (
      <>
        <h1>THIS IS THE MOBILE CONTENT</h1>
      </>
    );
  }

  return (
    <>
      <h1>Your Fieldagents' assignments</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>AssignmentID</TableCell>
              <TableCell>AgentID</TableCell>
              <TableCell>Agent Name</TableCell>
              <TableCell>Street</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Postal Code</TableCell>
              <TableCell>Lat</TableCell>
              <TableCell>Long</TableCell>
              <TableCell>Census done?</TableCell>
              <TableCell>Delete?</TableCell>
              <TableCell>Edit?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                {/**********************************************************************************************/}
                <TableCell>
                  {editableRowIndex === index ? (
                    <TextField
                      value={row.fieldagentid}
                      onChange={(event) =>
                        handleChange(event, index, "fieldagentid")
                      }
                    />
                  ) : (
                    row.fieldagentid
                  )}
                </TableCell>
                <TableCell>
                  {editableRowIndex === index ? (
                    <TextField
                      select
                      value={row.fieldagentname}
                      onChange={(event) =>
                        handleChange(event, index, "fieldagentname")
                      }
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    row.fieldagentname
                  )}
                </TableCell>

                <TableCell>
                  {editableRowIndex === index ? (
                    <TextField
                      value={row.street}
                      onChange={(event) => handleChange(event, index, "street")}
                    />
                  ) : (
                    row.street
                  )}
                </TableCell>
                <TableCell>
                  {editableRowIndex === index ? (
                    <TextField
                      value={row.city}
                      onChange={(event) => handleChange(event, index, "city")}
                    />
                  ) : (
                    row.city
                  )}
                </TableCell>

                <TableCell>
                  {editableRowIndex === index ? (
                    <TextField
                      value={row.postalcode}
                      onChange={(event) =>
                        handleChange(event, index, "postalcode")
                      }
                    />
                  ) : (
                    row.postalcode
                  )}
                </TableCell>

                <TableCell>
                  {editableRowIndex === index ? (
                    <TextField
                      value={row.latitude}
                      onChange={(event) =>
                        handleChange(event, index, "latitude")
                      }
                    />
                  ) : (
                    row.latitude
                  )}
                </TableCell>
                <TableCell>
                  {editableRowIndex === index ? (
                    <TextField
                      value={row.longitude}
                      onChange={(event) =>
                        handleChange(event, index, "longitude")
                      }
                    />
                  ) : (
                    row.longitude
                  )}
                </TableCell>
                <TableCell>
                  <CheckBoxIcon
                    style={{
                      display: row.censusassignment ? "inline-block" : "none",
                      color: green[500],
                    }}
                  />
                </TableCell>
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
                <TableCell>
                  {editableRowIndex === index ? (
                    <button onClick={() => handleRowSave(index)}>Save</button>
                  ) : (
                    <button
                      disabled={row.censusassignment}
                      onClick={() => handleRowEdit(index)}
                    >
                      {"Edit"}
                    </button>
                  )}
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
