import React from "react";
import ManagerAgentAssignment from "../../components/Manager/ManagerAgentAssignment/ManagerAgentAssignment.js";
import { useState, useEffect } from "react";
function ManagerAgentAssignmentPage() {
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    function handleResize() {
      // setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      const width = window.innerWidth;
      // console.log("this is the page width", width);
      if (width > 999) {
        setScreenSize("desktop");
      } else {
        setScreenSize("mobile");
      }
    }

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize to set initial screen size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //add a property here called res- with options desktop, mobile, tablet
  return (
    <>
      <ManagerAgentAssignment screenSize={screenSize} />
    </>
  );
}

export default ManagerAgentAssignmentPage;
