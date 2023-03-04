import { BrowserRouter, Routes, Route } from "react-router-dom";
import Fieldagentverify from "./pages/Fieldagent/FieldagentVerifyPage";
import Login from "./pages/Login/LoginPage";
import Popstats from "./pages/Manager/PopulationStatsPage";
import ManagerMain from "./pages/Manager/ManagerMainPage.js";
import ManagerAgentAssign from "./pages/Manager/ManagerAgentAssignmentPage.js";
import FieldagentMain from "./pages/Fieldagent/FieldagentMainPage.js";
import FieldAgentFormP from "./pages/Fieldagent/FieldagentFormPage.js";
import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/manager/home" element={<ManagerMain />} />
          <Route
            path="/manager/agentassignment"
            element={<ManagerAgentAssign />}
          />
          <Route path="/manager/populationstats" element={<Popstats />} />
          <Route path="/fieldagent/home" element={<FieldagentMain />} />
          <Route path="/fieldagent/verify/:id" element={<Fieldagentverify />} />
          <Route path="/fieldagent/form" element={<FieldAgentFormP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
