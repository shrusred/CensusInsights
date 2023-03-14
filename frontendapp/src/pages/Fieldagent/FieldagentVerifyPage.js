import Verify from "../../components/FieldAgent/Verification/FieldagentVerification.js";
import Fileupload from "../../components/FieldAgent/FileUpload/FileUpload.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import { useParams } from "react-router-dom";
import { decodeToken } from "react-jwt";
function FieldAgentVerify() {
  const { userid, assignmentid } = useParams();

  const encrypted_token = sessionStorage.getItem("clientAuthToken");
  const decoded_token = decodeToken(encrypted_token);
  const name = decoded_token.name;
  const message = ", verify assignment location";
  const fullmessage = name.concat(message);

  return (
    <>
      <Header name={fullmessage} />
      <h3>Verify if you are at the right location for # {assignmentid}</h3>
      <Fileupload />
      <Footer />
    </>
  );
}

export default FieldAgentVerify;
