import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import "../FieldagentDataForm/FieldagentDataForm.scss";

function FieldAgentFormComp(props) {
  const navigate = useNavigate();
  const { assignmentid, userid } = useParams();
  const userId = userid;

  const [inputFields, setInputFields] = useState([
    { age: "", gender: "", ethnicity: "", occupation: "", income: 0 },
  ]);

  const [isAddDisabled, setIsAddDisabled] = useState(false);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const submit = (e) => {
    //post form data for this assignment to server with api post call
    e.preventDefault();
    setIsFormSubmitted(true);
    axios
      .post(`http://localhost:8080/census/${assignmentid}`, inputFields)
      .then((response) => {
        console.log(response.data); // handle success
      })
      .catch((error) => {
        console.error(error); // handle error
      });
    // console.log(inputFields);
  };

  const addFields = (inp) => {
    let newfield = {
      age: "",
      gender: "",
      ethnicity: "",
      occupation: "",
      income: 0,
    };
    setInputFields([...inputFields, newfield]);
  };
  const deleteFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  return (
    <>
      <div className="censusdata">
        <h2 className="censusdata__text1">
          Collect data for assignment #{assignmentid}
        </h2>
        <h3 className="censusdata__text2">
          Note: please collect data for each member of the household
        </h3>
        <form className="censusdataform">
          {inputFields.map((input, index) => {
            return (
              <div key={index}>
                <input
                  disabled={isFormSubmitted}
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={input.age}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <input
                  disabled={isFormSubmitted}
                  type="text"
                  list="genderlist"
                  name="gender"
                  placeholder="Gender"
                  value={input.gender}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <datalist id="genderlist">
                  <option>Female</option>
                  <option>Male</option>
                </datalist>
                <input
                  disabled={isFormSubmitted}
                  type="text"
                  list="ethnicitylist"
                  name="ethnicity"
                  placeholder="Ethnicity"
                  value={input.ethnicity}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <datalist id="ethnicitylist">
                  <option>Other</option>
                  <option>African</option>
                  <option>Asian</option>
                  <option>Caucasian</option>
                  <option>Latin American</option>
                  <option>Middle Eastern</option>
                  <option>Mixed</option>
                  <option>Native</option>
                  <option>South Asian</option>
                  <option>Southeast Asian</option>
                </datalist>
                <input
                  disabled={isFormSubmitted}
                  type="text"
                  list="occupationlist"
                  name="occupation"
                  placeholder="Occupation"
                  value={input.occupation}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <datalist id="occupationlist">
                  <option>Other</option>
                  <option>Beauty</option>
                  <option>Business Operations</option>
                  <option>Education</option>
                  <option>Engineering</option>
                  <option>Food and Beverage</option>
                  <option>Legal</option>
                  <option>Logistics</option>
                  <option>Management</option>
                  <option>Medical, Wellness Services</option>
                  <option>Research</option>
                  <option>Retail</option>
                  <option>Transportation</option>
                </datalist>
                <input
                  disabled={isFormSubmitted}
                  type="number"
                  name="income"
                  placeholder="Yearly Income"
                  value={input.income}
                  onChange={(event) => handleFormChange(index, event)}
                />

                <button
                  className="censusdataform__removebutton"
                  disabled={isFormSubmitted}
                  onClick={() => deleteFields(index)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </form>

        <button
          className="censusdata__addbutton"
          disabled={isFormSubmitted}
          onClick={addFields}
        >
          Add household member data..
        </button>
        <br></br>
        <button
          className="censusdata__submitbutton"
          type="submit"
          onClick={submit}
        >
          Submit
        </button>
      </div>
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

/////input household number//////
// const [householdsize, setHouseholdSize] = useState(0);
{
  /* <div>
        <TextField
          label="Members in household"
          value={householdsize}
          onChange={handleHouseholdInputChange}
        />
      </div> */
}
//// input household number change////
// const handleHouseholdInputChange = (event) => {
//   setHouseholdSize(event.target.value);
//   // addFields(event.target.value);
// };
