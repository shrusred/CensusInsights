import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../FieldagentDataForm/FieldagentDataForm.scss";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function FieldAgentFormComp(props) {
  const navigate = useNavigate();
  const { assignmentid, userid } = useParams();
  const [errordialogopen, setErrorDialogOpen] = useState(false);
  const [successdialogopen, setSuccessDialogOpen] = useState(false);
  const [inputFields, setInputFields] = useState([
    { age: "", gender: "", ethnicity: "", occupation: "", income: "" },
  ]);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const handleErrorDialogOpen = () => {
    setErrorDialogOpen(true);
  };
  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false);
  };
  const handleSuccessDialogOpen = () => {
    setSuccessDialogOpen(true);
  };
  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
    navigate(`/fieldagent/home/${userid}`);
  };
  const submit = (e) => {
    //post form data for this assignment to server with api post call
    e.preventDefault();
    setIsFormSubmitted(true);
    console.log(inputFields);
    axios
      .post(`http://localhost:8080/census/${assignmentid}`, inputFields)
      .then((response) => {
        console.log(response.data); // handle success
        handleSuccessDialogOpen();
      })
      .catch((error) => {
        handleErrorDialogOpen();
        console.error(error); // handle error
      });
  };

  const addFields = (inp) => {
    let newfield = {
      age: "",
      gender: "",
      ethnicity: "",
      occupation: "",
      income: "",
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
      <div className="fieldagentdataback">
        <ArrowBackIcon />
      </div>

      <div className="censusdata">
        <div className="censusdata__header">
          <h3 className="censusdata__header--text1">
            Collect data for assignment #{assignmentid}
          </h3>
          <p className="censusdata__header--text2">
            Note: please collect data for each member of the household
          </p>
        </div>
        <form className="censusdata__form">
          {inputFields.map((input, index) => {
            return (
              <div key={index} className="censusdata__forminput">
                <input
                  className="censusdata__forminput--input"
                  disabled={isFormSubmitted}
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={input.age}
                  onChange={(event) => handleFormChange(index, event)}
                />
                <input
                  className="censusdata__forminput--input"
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
                  className="censusdata__forminput--input"
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
                  className="censusdata__forminput--input"
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
                  className="censusdata__forminput--input"
                  disabled={isFormSubmitted}
                  type="number"
                  name="income"
                  placeholder="Income"
                  value={input.income}
                  onChange={(event) => handleFormChange(index, event)}
                />

                <button
                  className="censusdata__forminput--deletebutton"
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
          disabled={isFormSubmitted}
          onClick={addFields}
          className="addformbutton"
        >
          Add household member data..
        </button>
        <br></br>
        <Dialog open={errordialogopen} onClose={handleErrorDialogClose}>
          <DialogTitle>Ooops!</DialogTitle>
          <DialogContent>
            <p>
              There is an error with the data you just submitted to the server.
              Ensure you entered the ages and incomes in number format. Close
              this box. Refresh page and retry submit.
            </p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleErrorDialogClose}
              variant="contained"
              autoFocus
              className="dialogbox_button"
              style={{ backgroundColor: "#8de3df", color: "#393e46" }}
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
        {/*************  SUCCESS DIALOG BOX  ******************/}
        <Dialog open={successdialogopen} onClose={handleSuccessDialogClose}>
          <DialogTitle>Success!</DialogTitle>
          <DialogContent>
            <p>
              You have submitted the form data successfully to the server. Click
              done to be re-directed back to your other assignments.
            </p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSuccessDialogClose}
              variant="contained"
              autoFocus
              className="dialogbox_button"
              style={{ backgroundColor: "#8de3df", color: "#393e46" }}
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
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
