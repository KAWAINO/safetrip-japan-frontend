import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Question from "./pages/Questions";
import Result from "./pages/Result";
import Emergency from "./pages/Emergency";
import Hospitals from "./pages/Hospitals";
import Pharmacies from './pages/Pharmacies';
import MedicineGuide from './pages/MedicineGuide';
import PharmacySpeed from './pages/PharmacySpeed';
import MedicineDetail from './pages/MedicineDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pharmacy-speed" element={<PharmacySpeed />} />
        <Route path="/question/:ageId" element={<Question />} />
        <Route path="/result/:ageId" element={<Result />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/medicine-guide" element={<MedicineGuide />} />
        <Route path="/medicine-detail/:id" element={<MedicineDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;