import React from "react";
import ManagerAgentAssignment from "../../components/Manager/ManagerAgentAssignment/ManagerAgentAssignment.js";
import { useState } from "react";
function ManagerAgentAssignmentPage() {
  const [screensize, setScreenSize] = useState(900);
  // function checkScreenSize(){

  // }
  //add a property here called res- with options desktop, mobile, tablet
  return (
    <>
      <ManagerAgentAssignment screensize={screensize} />
    </>
  );
}

export default ManagerAgentAssignmentPage;
