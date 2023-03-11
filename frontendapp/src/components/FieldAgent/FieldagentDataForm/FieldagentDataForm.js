import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";
import "../FieldagentDataForm/FieldagentDataForm.scss";

function FieldAgentFormComp() {
  const [householdsize, setHouseholdSize] = useState(1);
  const [inputFields, setInputFields] = useState([
    { age: "", gender: "", occupation: "", income: "" },
  ]);

  const handleHouseholdInputChange = (event) => {
    setHouseholdSize(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted form!!");
  };

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const addFields = (inp) => {
    console.log("inside add fields, household size: ", inp);
    // for (let i = 0; i < inp; i++) {

    // let newfield = { age: "", gender: "", occupation: "", income: "" };
    // setInputFields([...inputFields, newfield]);
    // console.log("am in the addfields");
    // setInputFields(newfield);
    // }
    let count = 0;
    while (count < inp) {
      // loop until count reaches 10
      let newfield = { age: "", gender: "", occupation: "", income: "" };
      setInputFields([...inputFields, newfield]);
      count++; // increase count by 1 in each iteration
      console.log(count); // print the current value of count to the console
    }
  };
  const formSubmit = (e) => {
    e.preventDefault();
    console.log(inputFields);
  };

  // useEffect(() => {
  //   addFields(householdsize);
  // }, []);
  // useEffect(() => {
  //   addFields(householdsize);
  // }, [householdsize]);

  // console.log("this is the inputFields array", inputFields);

  // useEffect(() => {
  // addFields(2);
  // }, []);
  useEffect(() => {
    addFields(5);
  }, []);
  // console.log(inputFields);
  // console.log(householdsize);
  return (
    <>
      <div>
        <TextField
          label="Members in household"
          value={householdsize}
          onChange={handleHouseholdInputChange}
          InputProps={{ maxLength: 20 }}
        />
      </div>

      {/* <div className="App">
        <form>
          {inputFields.map((input, index) => {
            return (
              <div key={index}>
                <input
                  name="age"
                  placeholder="Age"
                  value={input.age}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <input
                  name="gender"
                  placeholder="Gender"
                  value={input.gender}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <input
                  name="ethnicity"
                  placeholder="Ethnicity"
                  value={input.gender}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <input
                  name="occupation"
                  placeholder="Occupation"
                  value={input.gender}
                  onChange={(event) => handleFormChange(index, event)}
                />
              </div>
            );
          })}
        </form>
      </div> */}
      <button onClick={addFields}>Add More..</button>
      <button onClick={formSubmit}>Form Submit</button>
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </>
  );
}
export default FieldAgentFormComp;

///   OLD CODE   ////
{
  /* <form onSubmit={handleSubmit}>
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
      </form> */
}

{
  /* <Box border={1} borderColor="primary.main" borderRadius={5} p={2}>
<Grid container spacing={4} className="repeatingcomp">
  <Grid item sm={6}>
    <TextField label="Age" fullWidth />
  </Grid>
  <Grid item sm={6}>
    <TextField label="Gender" fullWidth />
  </Grid>
  <Grid item sm={6}>
    <TextField label="Occupation" fullWidth />
  </Grid>
  <Grid item sm={6}>
    <TextField label="Income" fullWidth />
  </Grid>
</Grid>
</Box> */
}
