import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Symptom from "./pages/Symptom";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/symptom/:age" element={<Symptom />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;