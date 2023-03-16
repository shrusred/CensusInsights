import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import geolib from "geolib";
// import FileUpload from "../FileUpload/FileUpload";
function Verification(props) {
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  console.log("assingment lat from prop:", props.assignmentlat);
  console.log("assingment long from prop:", props.assignmentlong);

  ////  FUNCTIONS  //////
  //1. send data to parent
  const sendDataToVerifyMainPage = () => {
    const data = "Hello from child!";
    props.onVerify(data);
  };
  //2. is agent within 100meters of the assingment location?

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  //3. back button go to field agent home function
  function handleHome() {
    navigate(`/fieldagent/home/:userid`);
  }

  return (
    <>
      <ArrowBackIcon className="backarrow" onClick={handleHome} />
      <div className="locationverify">
        <p>Getting your current latitude..: {latitude}</p>

        <p>Assignment location latitude..: {props.assignmentlat}</p>

        <p>Getting your current longitude..: {longitude}</p>

        <p>Assignment location longitude..: {props.assignmentlong}</p>

        <p>
          Distance between your location and assignment location:{" "}
          {props.assignmentlong}
        </p>

        <button onClick={sendDataToVerifyMainPage}>Verify</button>
      </div>
    </>
  );
}

export default Verification;
