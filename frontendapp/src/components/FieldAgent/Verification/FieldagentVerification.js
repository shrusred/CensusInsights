import React, { useState, useEffect } from "react";

import geolib from "geolib";
// import FileUpload from "../FileUpload/FileUpload";
function Verification(props) {
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

  return (
    <>
      {/* <FileUpload /> */}
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

/////////////   OLD CODE    /////////////
//get the current location of the field agent
// console.log(navigator.geolocation.getCurrentPosition((success) => {}));

// const pickerOpts = {
//   types: [
//     {
//       description: "Images",
//       accept: {
//         "image/*": [".png", ".gif", ".jpeg", ".jpg"],
//       },
//     },
//   ],
//   excludeAcceptAllOption: true,
//   multiple: false,
// };

// async function getTheFile() {
//   // open file picker
//   const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
//   console.log([fileHandle]);

//   // get file contents
//   const fileData = await fileHandle.getFile();
//   console.log(fileData);
// }

// async function handleClick(e) {
//   e.preventDefault();
//   console.log("You clicked the upload pic button");
//   // await getTheFile();
//   // window.showSaveFilePicker();
// }
// const [file, setFile] = useState();
// console.log(file);
// const removeFile = (filename) => {
//   setFile();
// };
// file={file} setFile={setFile}
