import React, { useState } from "react";

import {
  TableCell,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const TableCellWithSelectDropdown = ({ row, columns }) => {
  const [selectedValue, setSelectedValue] = useState(row[columns[1].id]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <TableCell>
      <FormControl>
        <InputLabel id={`select-label-${row.id}`}>
          {columns[1].headerName}
        </InputLabel>
        <Select
          labelId={`select-label-${row.id}`}
          id={`select-${row.id}`}
          value={selectedValue}
          onChange={handleChange}
        >
          {columns[1].options.map((option) => (
            <MenuItem key={`${row.id}-${option}`} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </TableCell>
  );
};

export default TableCellWithSelectDropdown;
