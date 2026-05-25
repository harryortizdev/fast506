  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import HomePage from "./pages/HomePage";
  import UnitPage from "./pages/UnitPage";
  import BranchPage from "./pages/BranchPage";
  import SupplierPage from "./pages/SupplierPage";
  import ShowBranches from "./pages/ShowBranches";
  import AdministratorPage from "./pages/AdministratorPage";
  import ClientPage from "./pages/ClientPage";
  import MechanicPage from "./pages/MechanicPage";
  import TestdrivePage from "./pages/TestdrivePage";
  import CatalogPage from "./pages/CatalogPage";
  import CreateTestdrive from "./pages/CreateTestdrive";
  import CatalogDetailPage from "./pages/CatalogDetailPage";
  import QuotationPage from "./pages/QuotationPage";
  import CreateQuotation from "./pages/CreateQuotation";



  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/units" element={<UnitPage />} />
          <Route path="/admin/testdrive" element={<TestdrivePage />} />
          <Route path="/admin/branches" element={<BranchPage />} />
          <Route path="/admin/suppliers" element={<SupplierPage />} />
          <Route path="/branches" element={<ShowBranches />} />
          <Route path="/admin/administrators" element={<AdministratorPage />} />
          <Route path="/admin/clients" element={<ClientPage />} />
          <Route path="/admin/mechanics" element={<MechanicPage />} />
          <Route path="/admin/catalogs" element={<CatalogPage />} />
          <Route path="/testdrive" element={<CreateTestdrive />} />
          <Route path="/admin/quotations" element={<QuotationPage />} />
          <Route path="/quotation" element={<CreateQuotation />} />
          <Route path="/catalog/detail/:id" element={<CatalogDetailPage />} />

        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
