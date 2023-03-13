import FieldAgentForm from "../../components/FieldAgent/FieldagentDataForm/FieldagentDataForm.js";
import Footer from "../../components/Footer/Footer.js";
import Header from "../../components/Header/Header.js";
import { decodeToken } from "react-jwt";

function FieldAgentFormPage() {
  const encrypted_token = sessionStorage.getItem("clientAuthToken");
  const decoded_token = decodeToken(encrypted_token);
  const name = decoded_token.name;
  const message = "Census data collection by: ";
  const fullmessage = message.concat(name);
  return (
    <>
      <Header name={fullmessage} />
      <FieldAgentForm />
      <Footer name={fullmessage} />
    </>
  );
}

export default FieldAgentFormPage;
