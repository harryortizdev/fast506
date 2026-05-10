import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UnitPage from "./pages/UnitPage";
import BranchPage from "./pages/BranchPage";
import SupplierPage from "./pages/SupplierPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/units" element={<UnitPage />} />
        <Route path="/admin/branches" element={<BranchPage />} />
        <Route path="/admin/suppliers" element={<SupplierPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
