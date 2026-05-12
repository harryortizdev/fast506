import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UnitPage from "./pages/UnitPage";
import BranchPage from "./pages/BranchPage";
import SupplierPage from "./pages/SupplierPage";
import ShowBranches from "./pages/ShowBranches";
import AdministratorPage from "./pages/AdministratorPage";
import ClientPage from "./pages/ClientPage";
import MechanicPage from "./pages/MechanicPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/units" element={<UnitPage />} />
        <Route path="/admin/branches" element={<BranchPage />} />
        <Route path="/admin/suppliers" element={<SupplierPage />} />
        <Route path="/branches" element={<ShowBranches />} />
        <Route path="/admin/administrators" element={<AdministratorPage />} />
        <Route path="/admin/clients" element={<ClientPage />} />
        <Route path="/admin/mechanics" element={<MechanicPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
