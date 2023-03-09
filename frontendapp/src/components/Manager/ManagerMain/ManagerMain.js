import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function ManagerHomeComp() {
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

  function handleNavAllAssignments() {
    navigate(`/manager/agentassignment/${userId}`);
  }

  function handleNavPopStats() {
    navigate(`/manager/populationstats/${userId}`);
  }
  return (
    <>
      <h1> Welcome {managername}</h1>
      <button onClick={handleNavAllAssignments}>
        View fieldagent assignments
      </button>
      <button onClick={handleNavPopStats}>View population statistics </button>
    </>
  );
}
export default ManagerHomeComp;
