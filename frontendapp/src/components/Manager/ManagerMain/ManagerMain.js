import { Link } from "react-router-dom";
function ManagerHomeComp() {
  ///use effect first renders, make the call to the backend to fetch the profile info
  return (
    <>
      <h1> Welcome "replace with manager name"</h1>
      <Link to="/manager/agentassignment">
        <button>Field agents and their assignments </button>
      </Link>
      <Link to="/manager/populationstats">
        <button>Population statistics KPIs </button>
      </Link>
    </>
  );
}
export default ManagerHomeComp;
