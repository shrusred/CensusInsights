import "../FieldagentAssignments/FieldagentAssignments.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

// import { useState } from "react";

import { useNavigate } from "react-router-dom";

function FieldagentAssignments() {
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "apptDate", headerName: "Date", width: 150 },
    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
  ];
  const rows = [
    { id: 1, apptDate: "2/26/2023", address: "15 Bellevue Rd Markham L87PL1" },
    { id: 2, apptDate: "2/26/2023", address: "31 Palace Dr Markham L5M7S2" },
    { id: 3, apptDate: "2/27/2023", address: "31 Palace Dr Markham L9Y0R3" },
  ];
  function handleRowClick(params) {
    console.log(params.row.id);
    // Add later: Handle the click event for the selected row
    navigate(`/fieldagent/verify/${params.row.id}`);
  }
  return (
    <>
      <h1>Welcome "replace with authenticated field agent name"</h1>
      <h3>Find your assignments below</h3>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={handleRowClick}
        />
      </Box>
    </>
  );
}
export default FieldagentAssignments;
