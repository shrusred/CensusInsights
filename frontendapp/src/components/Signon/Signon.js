import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import logoweb from "../../assets/images/censusinsights.webp";
function Signoncomponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const authToken = sessionStorage.getItem("clientAuthToken");
    console.log(authToken);
    // fetchProfile(authToken);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("you are in form submit");
    // endpoint is at http://localhost:8080/login
    const username = e.target.username.value;
    console.log("username", e.target.username.value);
    const password = e.target.password.value;
    console.log("password", e.target.password.value);
    axios
      .post("http://localhost:8080/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("clientAuthToken", response.data.token);
        console.log(response.data.role);
        //use navigate to send to appropriate page based on role
        // fetchProfile(response.data.token);
      })
      .catch((err) => console.log("login error", err.response.data));
  };
  const userid = "111";
  const profilepath = "http://localhost:8080/profilehome/";
  console.log(`profilepath/${userid}`);
  const fetchProfile = (token) => {
    axios
      .get(`profilepath/${userid}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        setProfileData(response.data);
        setIsLoggedIn(true);
      })
      .catch((err) => console.log("profile error", err.response.data));
  };

  return (
    <div>
      <h1>Auth Client Demo</h1>
      {!isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <h2>Login Form</h2>
          <input name="username" type="text" placeholder="User Name" />
          <input name="password" type="password" placeholder="Password" />
          <button>Submit</button>
        </form>
      )}
      {/* {isLoggedIn && (
        <>
          <h2>Authorized Page</h2>
          <h3>Welcome, {profileData && profileData.tokenInfo.name}</h3>
          <h3>User Name: {profileData && profileData.tokenInfo.username}</h3>
          <h3>
            Loves: {profileData && profileData.sensitiveInformation.secret}
          </h3>
        </>
      )} */}
    </div>
  );
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  // return (
  //   <MDBContainer className="my-5 gradient-form" onSubmit={handleSubmit}>
  //     <MDBRow>
  //       <MDBCol col="6" className="mb-5">
  //         <div className="d-flex flex-column ms-5">
  //           <div className="text-center">
  //             <img src={logoweb} style={{ width: "185px" }} alt="logo" />
  //             <h4 className="mt-1 mb-5 pb-1">
  //               Census insights - assisting you with census data collection and
  //               insights
  //             </h4>
  //           </div>

  //           <p>Please login to your account</p>

  //           <MDBInput
  //             wrapperClass="mb-4"
  //             label="Username"
  //             id="form1"
  //             type="email"
  //           />
  //           <MDBInput
  //             wrapperClass="mb-4"
  //             label="Password"
  //             id="form2"
  //             type="password"
  //           />
  //         </div>
  //       </MDBCol>
  //     </MDBRow>
  //   </MDBContainer>
  // );
}

export default Signoncomponent;
