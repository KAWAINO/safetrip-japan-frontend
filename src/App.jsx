import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Question from "./pages/Questions";
import Result from "./pages/result";
import Emergency from "./pages/Emergency";
import Hospitals from "./pages/Hospitals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question/:ageId" element={<Question />} />
        <Route path="/result" element={<Result />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/hospitals" element={<Hospitals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;