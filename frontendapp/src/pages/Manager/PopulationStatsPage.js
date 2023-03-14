import ManagerPopStats from "../../components/Manager/ManagerPopulationStats/ManagerPopulationStats.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import { decodeToken } from "react-jwt";

function Popstats() {
  const encrypted_token = sessionStorage.getItem("clientAuthToken");
  const decoded_token = decodeToken(encrypted_token);
  const name = decoded_token.name;
  const message = " , find below the population statistics for your region";
  const fullmessage = name.concat(message);
  return (
    <>
      <Header name={fullmessage} />
      <ManagerPopStats />
      <Footer />
    </>
  );
}

export default Popstats;
