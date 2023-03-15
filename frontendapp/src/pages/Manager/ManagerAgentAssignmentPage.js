import React from "react";
import ManagerAgentAssignment from "../../components/Manager/ManagerAgentAssignment/ManagerAgentAssignment.js";
import { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import { getFormGroupUtilityClass } from "@mui/material";
function ManagerAgentAssignmentPage() {
  const [screenSize, setScreenSize] = useState("desktop");
  const encrypted_token = sessionStorage.getItem("clientAuthToken");
  const decoded_token = decodeToken(encrypted_token);
  const name = decoded_token.name;
  const message = ", assign data collection tasks to your agents";
  const fullmessage = name.concat(message);
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
      <Header name={fullmessage} />
      <ManagerAgentAssignment screenSize={screenSize} />
      <Footer />
    </>
  );
}

export default ManagerAgentAssignmentPage;
