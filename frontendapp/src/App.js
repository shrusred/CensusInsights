import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fieldagentverify from "./pages/Fieldagent/FieldagentVerifyPage";
import Login from "./pages/Login/LoginPage";
import Popstats from "./pages/Manager/PopulationStatsPage";
import ManagerMain from "./pages/Manager/ManagerMainPage.js";
import ManagerAgentAssign from "./pages/Manager/ManagerAgentAssignmentPage.js";
import TestP from "./pages/testpage.js";
import FieldagentMain from "./pages/Fieldagent/FieldagentMainPage.js";
import FieldAgentFormP from "./pages/Fieldagent/FieldagentFormPage.js";
import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/manager/home/:userid" element={<ManagerMain />} />
          <Route
            path="/manager/agentassignment/:userid"
            element={<ManagerAgentAssign />}
          />
          <Route
            path="/manager/populationstats/:userid"
            element={<Popstats />}
          />
          <Route path="/fieldagent/home/:userid" element={<FieldagentMain />} />
          <Route
            path="/fieldagent/verify/:userid/:assignmentid"
            element={<Fieldagentverify />}
          />
          <Route
            path="/fieldagent/:userid/form/:assignmentid"
            element={<FieldAgentFormP />}
          />
          <Route path="/test" element={<TestP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
