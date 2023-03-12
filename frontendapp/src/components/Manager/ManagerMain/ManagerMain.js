import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../ManagerMain/ManagerMain.scss";
function ManagerHomeComp(props) {
  const navigate = useNavigate();
  function handleNavAllAssignments() {
    navigate(`/manager/agentassignment/${props.userId}`);
  }

  function handleNavPopStats() {
    navigate(`/manager/populationstats/${props.userId}`);
  }
  return (
    <>
      <div className="managerhomebox">
        <button
          onClick={handleNavAllAssignments}
          className="managerhomebox__assignments"
        >
          View fieldagent assignments
        </button>
        <button
          onClick={handleNavPopStats}
          className="managerhomebox__statistics"
        >
          View population statistics
        </button>
      </div>
    </>
  );
}
export default ManagerHomeComp;

////////   OLD CODE   ///////
// ///use effect first renders, make the call to the backend to fetch the profile info
// const params = useParams();
// const userId = params.userid;
// const [managername, setManagerName] = useState("");
// const fetchManagerInfo = async (userId) => {
//   axios
//     .get(`http://localhost:8080/manager/${userId}`, {
//       params: {
//         id: userId,
//       },
//     })
//     .then((response) => {
//       // console.log(
//       //   "am in the fetch manager info",
//       //   response.data[0].managername
//       // );
//       setManagerName(response.data[0].managername);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// useEffect(() => {
//   fetchManagerInfo(userId);
// }, []);
