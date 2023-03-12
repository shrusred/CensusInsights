import FieldAgentHome from "../../components/FieldAgent/FieldagentAssignments/FieldagentAssignments.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import { decodeToken } from "react-jwt";
function FieldAgentHomePage() {
  const encrypted_token = sessionStorage.getItem("clientAuthToken");
  const decoded_token = decodeToken(encrypted_token);
  const name = decoded_token.name;
  const message = "Welcome, ";
  const fullmessage = message.concat(name);
  return (
    <>
      <Header name={fullmessage} />
      <FieldAgentHome />
      <Footer />
    </>
  );
}

export default FieldAgentHomePage;
