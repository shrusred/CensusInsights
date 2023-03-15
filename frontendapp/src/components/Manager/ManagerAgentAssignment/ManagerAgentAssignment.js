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
  const [cityoptions, setCityOptions] = useState([]);
  const [agentoptions, setAgentOptions] = useState([]);
  const [showbutton, setShowbutton] = useState(true);
  const [newrow, setNewrow] = useState([
    {
      street: "",
      city: "",
      postalcode: "",
      fieldagent_id: 0,
      latitude: 0,
      longitude: 0,
    },
  ]);
  console.log(newrow[0].city);

  const [editableRowIndex, setEditableRowIndex] = useState(null);

  //// get data from api
  const fetchManagerAssignments = async (userId) => {
    axios
      .get(`http://localhost:8080/manager/${userId}/assignments`)
      .then((response) => {
        // console.log("am in the fetch manager assignments", response.data);
        console.log("rows", rows);
        setRows(response.data);
        /////////////  city options   ///////////////////
        const city_key = "city";

        // use reduce to extract unique values of cities for this manager
        const uniquecities = response.data.reduce((acc, curr) => {
          if (!acc.includes(curr[city_key])) {
            acc.push(curr[city_key]);
          }
          return acc;
        }, []);

        // console.log(uniquecities);
        // use map to create array of objects of city option
        const label_value_cities = uniquecities.map((value) => ({
          label: value,
          value: value,
        }));

        // console.log(label_value_cities);
        setCityOptions(label_value_cities);
        ///////////////   fieldagentname options  ////////////////
        const agent_key = "fieldagentname";

        // use reduce to extract unique values of cities for this manager
        const uniqueagents = response.data.reduce((acc, curr) => {
          if (!acc.includes(curr[agent_key])) {
            acc.push(curr[agent_key]);
          }
          return acc;
        }, []);

        // console.log(uniqueagents);
        // use map to create array of objects of city option
        const label_value_agents = uniqueagents.map((value) => ({
          label: value,
          value: value,
        }));

        // console.log(label_value_agents);
        setAgentOptions(label_value_agents);
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
    ///// if saving a new row
    axios
      .post("http://localhost:8080/assignment", newrow[0])
      .then((response) => {
        console.log("Response of post assignment:", response.data);
      })
      .catch((error) => {
        console.error("Error of post assignment:", error);
      });
    ///// if editing an existing row
  };

  const handleChange = (event, index, key) => {
    // city
    // fieldagent_id
    // latitude
    // longitude
    // postalcode
    // street
    console.log(event);

    if (key === "fieldagentname") {
      const find_faname = event.target.value;
      const filteredData = rows.filter(
        (item) => item.fieldagentname === find_faname
      );
      const id_fieldagent =
        filteredData.length > 0 ? filteredData[0].fieldagentid : null;
      // console.log("id of the field agent", id_fieldagent);
      newrow[0].fieldagent_id = id_fieldagent;
    } else if (key === "city") {
      newrow[0].city = event.target.value;
    } else if (key === "latitude") {
      newrow[0].latitude = event.target.value;
    } else if (key === "longitude") {
      newrow[0].longitude = event.target.value;
    } else if (key === "postalcode") {
      newrow[0].postalcode = event.target.value;
    } else if (key === "street") {
      newrow[0].street = event.target.value;
    }

    // newrow[0][key] = event.target.value;

    const newRows = [...rows];
    newRows[index][key] = event.target.value;
    // console.log("new row", newrow[0]);
    setRows(newRows);
  };
  function handleRowChange(e) {
    console.log("akakakakakakakakakakaka", e.target);
  }
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
  // console.log(rows);

  // const [value, setValue] = React.useState("");
  // const handleSelectChange = (event) => {
  //   setValue(event.target.value);
  // };

  if (screenSize === "mobile") {
    return (
      <>
        <h1>THIS IS THE MOBILE CONTENT</h1>
      </>
    );
  }
  console.log("agentoptions:", agentoptions);
  return (
    <>
      <h1>Your Fieldagents' assignments</h1>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: "600px",
          overflowY: "auto",
          overflowX: "auto",
          maxWidth: "1300px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>AssignmentID</TableCell>
              {/* <TableCell>AgentID</TableCell> */}
              <TableCell>Agent Name</TableCell>
              <TableCell>Street</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Postal Code</TableCell>
              <TableCell>Lat</TableCell>
              <TableCell>Long</TableCell>
              <TableCell>Census done?</TableCell>
              {/* <TableCell>Delete?</TableCell> */}
              <TableCell>Edit?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id} onChange={(e) => handleRowChange(e)}>
                <TableCell>{row.id}</TableCell>
                {/**********************************************************************************************/}
                {/* <TableCell>
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
                </TableCell> */}
                <TableCell>
                  {editableRowIndex === index ? (
                    <TextField
                      select
                      value={row.fieldagentname}
                      onChange={(event) =>
                        handleChange(event, index, "fieldagentname")
                      }
                    >
                      {agentoptions.map((option) => (
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
                      select
                      value={row.city}
                      onChange={(event) => handleChange(event, index, "city")}
                    >
                      {cityoptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
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
                  {/* <Button
                    onClick={() => {
                      handleRowDelete(row.id);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Yes
                  </Button> */}
                </TableCell>

                <TableCell>
                  {editableRowIndex === index ? (
                    <button onClick={() => handleRowSave(index)}>Save</button>
                  ) : (
                    <button
                      disabled={row.id}
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
