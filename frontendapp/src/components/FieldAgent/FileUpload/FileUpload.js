import React from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../FileUpload/FileUpload.scss";
// import axios from "axios";
////
//{ file, setFile }
const FileUpload = () => {
  let { assignmentid, userid } = useParams();
  // console.log("assignment id is", assignmentid);
  // console.log("userid is", userid);

  const uploadHandler = (event) => {
    console.log("am in uploadhandler");

    const filechosen = event.target.files[0];
    console.log(filechosen);
    fetch(`http://localhost:8080/assignment/${assignmentid}/image`, {
      method: "post",
      body: filechosen,
    })
      .then((res) => {
        console.log("response", res);
        console.log("am sending the assignment id and file to the backend");
        alert("You have successfully uploaded the picture to our server");
      })
      .catch((err) => {
        //send message to user
        console.error(err);
      });
  };

  return (
    <>
      <h2>This is assignment # {assignmentid}</h2>
      <h3>
        Upload a picture of the location of your assignment for validation
      </h3>
      <div className="fileupload">
        <div className="fileinput">
          <input type="file" onChange={uploadHandler} />
        </div>
        <div className="fileinput-info">
          <p>Supports files of type .png, .jpeg, .jpg</p>
        </div>
        <button>SUBMIT</button>
      </div>
    </>
  );
};

export default FileUpload;
/////////   SOME PREVIOUS WORK -- DELETE LATER IF FOUND TO BE IRRELEVANT   ////////////////////

// filechosen.isUploading = true;
// console.log(filechosen);
// setFile(filechosen);
// //upload file
// const formData = new FormData();

// //1.stringify
// //2.App json to multipart formData-blob
// formData.append(filechosen.name, filechosen, filechosen.name);
// console.log(formData);
// axios
//   .post("http://localhost:8080/photoupload", formData)
//   .then((res) => {
//     console.log("am in the post");
//     filechosen.isUploading = false;
//     console.log(filechosen);
//     setFile(filechosen);
//   })
//   .catch((err) => {
//     //send message to user
//     console.error(err);
//     // removeFile(filechosen.name);
//     setFile();
//   });
////// attempt 2

///return
{
  /* <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Upload
          </button> */
}
