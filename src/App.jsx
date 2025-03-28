import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LaunchPage from "./LaunchPage";
import CallbackPage from "./CallbackPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/launch" element={<LaunchPage />} />
        <Route path="/callback" element={<CallbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
