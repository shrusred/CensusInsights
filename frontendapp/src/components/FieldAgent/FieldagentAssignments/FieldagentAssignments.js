import "../FieldagentAssignments/FieldagentAssignments.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useState } from "react";

function FieldagentAssignments() {
  const navigate = useNavigate();
  const params = useParams();
  const [assignments_fieldagent, setAssignmentsFieldAgent] = useState([]);
  const [fieldagentname, setFieldAgentName] = useState([]);
  const userId = params.userid;
  const fieldagent_name = "test";
  const fetchData = async (userId) => {
    axios
      .get(`http://localhost:8080/fieldagent/${userId}/assignments`, {
        params: {
          id: userId,
        },
      })
      .then((response) => {
        setAssignmentsFieldAgent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fetchName = async (userId) => {
  //   axios
  //     .get(`http://localhost:8080/fieldagent/${userId}`, {
  //       params: {
  //         id: userId,
  //       },
  //     })
  //     .then((response) => {
  //       // console.log("am in the fetch name", response.data[0].fieldagentname);
  //       setFieldAgentName(response.data[0].fieldagentname);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    fetchData(userId);
    // fetchName(userId);
  }, []);

  const columns = [
    { field: "id", headerName: "Assignment#", width: 100 },
    { field: "assignment_date", headerName: "Date", width: 110 },
    { field: "street", headerName: "Street", width: 150 },
    { field: "city", headerName: "City", width: 90 },
    { field: "postalcode", headerName: "Postalcode", width: 90 },
    { field: "latitude", headerName: "Latitude", width: 90 },
    { field: "longitude", headerName: "Longitude", width: 90 },
  ];

  const rows = assignments_fieldagent;

  function handleRowClick(params) {
    console.log(params.row.id);
    navigate(`/fieldagent/verify/${userId}/${params.row.id}`);
  }
  return (
    <>
      <h3>The following assignments have not had census data collected yet</h3>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[3]}
          onRowClick={handleRowClick}
        />
      </Box>
    </>
  );
}
export default FieldagentAssignments;
