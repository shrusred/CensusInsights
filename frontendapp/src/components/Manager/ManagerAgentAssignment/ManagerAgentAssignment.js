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
  TextField,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { green } from "@mui/material/colors";
import "../ManagerAgentAssignment/ManagerAgentAssignment.scss";

function Assignments({ screenSize }) {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userid;
  const [rows, setRows] = useState([]);
  const [cityoptions, setCityOptions] = useState([]);
  const [agentoptions, setAgentOptions] = useState([]);

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

  const [editableRowIndex, setEditableRowIndex] = useState(null);

  //// get data from api
  const fetchManagerAssignments = async (userId) => {
    axios
      .get(`http://localhost:8080/manager/${userId}/assignments`)
      .then((response) => {
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

        // use map to create array of objects of city option
        const label_value_agents = uniqueagents.map((value) => ({
          label: value,
          value: value,
        }));

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

  const handleRowEdit = async (index) => {
    setEditableRowIndex(index);
  };

  const handleRowSave = (index) => {
    setEditableRowIndex(null);

    axios
      .post("http://localhost:8080/assignment", newrow[0])
      .then((response) => {})
      .catch((error) => {
        console.error("Error of post assignment:", error);
      });
  };

  const handleChange = (event, index, key) => {
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

  function handleBackButtonClick() {
    navigate(`/manager/home/${userId}`);
  }

  return (
    <>
      <ArrowBackIcon
        className="backbutton"
        onClick={handleBackButtonClick}
      ></ArrowBackIcon>
      <div className="agentassignments">
        <div className="agentassignments__header">
          <h3 className="agentassignments__header--prompt">
            Your Fieldagents' assignments
          </h3>
          <p className="agentassignments__header--note">Note:</p>
          <p className="agentassignments__header--note">
            *click add row &rarr; click edit row to add new entry &rarr; click
            save row to save new entry &rarr; refresh page to see entry on page
          </p>
          <p className="agentassignments__header--note">
            **format of new entry must match that of old entries
          </p>
        </div>

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "1000px",
            overflowY: "auto",
            overflowX: "auto",
            maxWidth: "1300px",
            minWidth: "330px",
          }}
          className="agentassignments__tablecontainer"
        >
          <Table aria-label="simple table">
            <TableHead className="agentassignments__tablecontainer--header">
              <TableRow>
                <TableCell style={{ color: "white" }}>AssignmentID</TableCell>
                <TableCell style={{ color: "white" }}>Agent Name</TableCell>
                <TableCell style={{ color: "white" }}>Street</TableCell>
                <TableCell style={{ color: "white" }}>City</TableCell>
                <TableCell style={{ color: "white" }}>Postal Code</TableCell>
                <TableCell style={{ color: "white" }}>Lat</TableCell>
                <TableCell style={{ color: "white" }}>Long</TableCell>
                <TableCell style={{ color: "white" }}>Census done?</TableCell>
                <TableCell style={{ color: "white" }}>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="agentassignments__tablecontainer--body">
              {rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className="agentassignments__tablecontainer--row"
                >
                  <TableCell className="agentassignments__tablecontainer--cell">
                    {row.id}
                  </TableCell>
                  <TableCell className="agentassignments__tablecontainer--cell">
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

                  <TableCell className="agentassignments__tablecontainer--cell">
                    {editableRowIndex === index ? (
                      <TextField
                        value={row.street}
                        onChange={(event) =>
                          handleChange(event, index, "street")
                        }
                      />
                    ) : (
                      row.street
                    )}
                  </TableCell>
                  <TableCell className="agentassignments__tablecontainer--cell">
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

                  <TableCell className="agentassignments__tablecontainer--cell">
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

                  <TableCell className="agentassignments__tablecontainer--cell">
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
                  <TableCell className="agentassignments__tablecontainer--cell">
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
                  <TableCell className="agentassignments__tablecontainer--cell">
                    <CheckBoxIcon
                      style={{
                        display: row.censusassignment ? "inline-block" : "none",
                        color: green[500],
                      }}
                    />
                  </TableCell>

                  <TableCell className="agentassignments__tablecontainer--cell">
                    {editableRowIndex === index ? (
                      <button
                        onClick={() => handleRowSave(index)}
                        className="agentassignments__tablecontainer--editbutton"
                      >
                        Save
                      </button>
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
          <Button
            className="addrowbutton"
            variant="contained"
            style={{ backgroundColor: "#8de3df", color: "#393e46" }}
            onClick={handleAddRow}
          >
            Add Row
          </Button>
        </TableContainer>
      </div>
    </>
  );
}
export default Assignments;
