import ManagerMain from "../../components/Manager/ManagerMain/ManagerMain";
import Header from "../../components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
function ManagerMainPage() {
  ///use effect first renders, make the call to the backend to fetch the profile info
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userid;
  const [managername, setManagerName] = useState("");
  const fetchManagerInfo = async (userId) => {
    axios
      .get(`http://localhost:8080/manager/${userId}`, {
        params: {
          id: userId,
        },
      })
      .then((response) => {
        // console.log(
        //   "am in the fetch manager info",
        //   response.data[0].managername
        // );
        setManagerName(response.data[0].managername);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchManagerInfo(userId);
  }, []);

  return (
    <>
      <Header name={managername} />
      <ManagerMain userId={userId} managername={managername} />
      <Footer />
    </>
  );
}

export default ManagerMainPage;
