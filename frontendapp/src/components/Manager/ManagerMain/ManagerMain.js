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
