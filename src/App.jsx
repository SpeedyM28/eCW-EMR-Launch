import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchPage from "./LaunchPage";
import CallbackPage from "./CallbackPage";

function App() {
  //apples are great
  return (
    <BrowserRouter basename="/eCW-EMR-launch">
      <Routes>
        <Route path="/launch" element={<LaunchPage />} />
        <Route path="/callback" element={<CallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
