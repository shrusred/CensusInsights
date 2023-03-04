import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import "../FieldagentDataForm/FieldagentDataForm.scss";

function FieldAgentFormComp() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [fruit, setFruit] = useState("");
  const [sliderValue, setSliderValue] = useState(50);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `name:${name},age:${age},gender:${gender},fruit:${fruit},sliderValue:${sliderValue}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box m={2} />
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Box>

      <RadioGroup
        aria-label="gender"
        name="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <FormControlLabel value="male" control={<Checkbox />} label="Male" />
        <FormControlLabel
          value="female"
          control={<Checkbox />}
          label="Female"
        />
      </RadioGroup>
      <Box>
        <InputLabel id="select-label">FRUIT!!!</InputLabel>
        <Select
          label="Fruit"
          // value={fruit}
          onChange={(e) => setFruit(e.target.value)}
          className="selectbox"
        >
          <MenuItem value="apple">Apple</MenuItem>
          <MenuItem value="banana">Banana</MenuItem>
          <MenuItem value="orange">Orange</MenuItem>
        </Select>
        <Box m={2} />
      </Box>
      <Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Box m={10} />
      </Box>
    </form>
  );
}
export default FieldAgentFormComp;
