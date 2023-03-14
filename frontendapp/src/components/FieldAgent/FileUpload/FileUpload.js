import React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import "../FileUpload/FileUpload.scss";
import { useNavigate } from "react-router";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const FileUpload = () => {
  const navigate = useNavigate();
  let { assignmentid, userid } = useParams();
  const [verifiedopen, setVerifiedOpen] = useState(false);
  const [unverifiedopen, setUnverifiedOpen] = useState(false);

  const handleVerifiedDialogOpen = () => {
    setVerifiedOpen(true);
  };
  const handleUnverifiedDialogOpen = () => {
    setUnverifiedOpen(true);
  };

  const handleVerifiedDialogClose = () => {
    setVerifiedOpen(false);
    navigate(`/fieldagent/${userid}/form/${assignmentid}`);
  };
  const handleUnverifiedDialogClose = () => {
    setUnverifiedOpen(false);
  };

  const uploadHandler = (event) => {
    console.log("am in uploadhandler");
    const filechosen = event.target.files[0];
    // console.log(filechosen);
    fetch(`http://localhost:8080/assignment/${assignmentid}/image`, {
      method: "post",
      body: filechosen,
    })
      .then((res) => {
        console.log("response", res);
        console.log("am sending the assignment id and file to the backend");

        handleVerifiedDialogOpen();
      })
      .catch((err) => {
        //send error message to user
        console.error(err);
        handleUnverifiedDialogOpen();
      });
  };

  return (
    <>
      <h3>Upload a picture of assignment location for verification</h3>
      <div className="fileupload">
        <div className="fileinput">
          <input type="file" onChange={uploadHandler} />
        </div>
        <div className="fileinput-info">
          <p>Supports files of type .png, .jpeg, .jpg</p>
        </div>
      </div>
      <div className="verified_dialogbox">
        <Dialog open={verifiedopen} onClose={handleVerifiedDialogClose}>
          <DialogTitle>Verified!</DialogTitle>
          <DialogContent>
            <p>Photo upload successful, you can now start data collection</p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleVerifiedDialogClose}
              variant="contained"
              autoFocus
              className="dialogbox_button"
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="unverified_dialogbox">
        <Dialog open={unverifiedopen} onClose={handleUnverifiedDialogClose}>
          <DialogTitle>Unable to verify!</DialogTitle>
          <DialogContent>
            <p>Photo upload unsuccessful</p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleUnverifiedDialogClose}
              variant="contained"
              autoFocus
              className="dialogbox_button"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default FileUpload;
