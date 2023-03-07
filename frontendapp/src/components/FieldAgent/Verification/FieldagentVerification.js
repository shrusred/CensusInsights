import React, { useState, useEffect } from "react";
import FileUpload from "../FileUpload/FileUpload";
function Verification() {
  //get the current location of the field agent
  // console.log(navigator.geolocation.getCurrentPosition((success) => {}));

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

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

  const pickerOpts = {
    types: [
      {
        description: "Images",
        accept: {
          "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };

  async function getTheFile() {
    // open file picker
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    console.log([fileHandle]);

    // get file contents
    const fileData = await fileHandle.getFile();
    console.log(fileData);
  }

  async function handleClick(e) {
    e.preventDefault();
    console.log("You clicked the upload pic button");
    // await getTheFile();
    // window.showSaveFilePicker();
  }
  const [file, setFile] = useState();
  // console.log(file);
  // const removeFile = (filename) => {
  //   setFile();
  // };
  // file={file} setFile={setFile}
  return (
    <>
      <FileUpload />
      <div>
        Latitude: {latitude}
        <br />
        Longitude: {longitude}
      </div>
    </>
  );
}

export default Verification;
