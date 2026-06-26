import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";

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
import AdPage from "./pages/AdPage";
import SalesPage from "./pages/SalesPage";
import SalesClientPage from "./pages/SalesClientPage";
import WorkshopSchedulePage from "./pages/WorkshopSchedulePage";
import CreateWorkshopSchedule from "./pages/CreateWorkshopSchedule";
import RepairReportPage from "./pages/RepairReportPage";
import RolePage from "./pages/RolePage";
import LoginForm from "./components/organisms/LoginForm";
import RegisterForm from "./components/organisms/RegisterForm";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import WorkshopSchedulePageClient from "./pages/WorkshopSchedulePageClient";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/branches" element={<ShowBranches />} />
          <Route path="/catalog/detail/:id" element={<CatalogDetailPage />} />
          <Route path="/catalog/client/sales" element={<SalesClientPage />} />
          

          {/* Ruta de perfil de usuario */}
          <Route path="/profile" element={
            <PrivateRoute><ProfilePage /></PrivateRoute>
          } />

          {/* Rutas que requieren inicio de sesión */}
          <Route path="/testdrive" element={
            <PrivateRoute><CreateTestdrive /></PrivateRoute>
          } />
          <Route path="/quotation" element={<PrivateRoute><CreateQuotation /></PrivateRoute>} />
          <Route path="/workshopSchedules" element ={<PrivateRoute><WorkshopSchedulePageClient/></PrivateRoute>}/>
          

          {/* Rutas de mecánico */}
          <Route path="/mechanic/repair-reports" element={
            <PrivateRoute allowedModules={["repairreport"]}><RepairReportPage /></PrivateRoute>
          } />
          <Route path="/mechanic/workshop-schedules" element={
            <PrivateRoute allowedModules={["mechanic"]}><WorkshopSchedulePage /></PrivateRoute>
          } />

          {/* Rutas de administración */}
          <Route path="/admin/units" element={
            <PrivateRoute allowedModules={["units"]}><UnitPage /></PrivateRoute>
          } />
          <Route path="/admin/testdrive" element={
            <PrivateRoute allowedModules={["testdrive"]}><TestdrivePage /></PrivateRoute>
          } />
          <Route path="/admin/branches" element={
            <PrivateRoute allowedModules={["branches"]}><BranchPage /></PrivateRoute>
          } />
          <Route path="/admin/suppliers" element={
            <PrivateRoute allowedModules={["suppliers"]}><SupplierPage /></PrivateRoute>
          } />
          <Route path="/admin/administrators" element={
            <PrivateRoute allowedModules={["users"]}><AdministratorPage /></PrivateRoute>
          } />
          <Route path="/admin/clients" element={
            <PrivateRoute allowedModules={["users"]}><ClientPage /></PrivateRoute>
          } />
          <Route path="/admin/mechanics" element={
            <PrivateRoute allowedModules={["users"]}><MechanicPage /></PrivateRoute>
          } />
          <Route path="/admin/catalogs" element={
            <PrivateRoute allowedModules={["catalog"]}><CatalogPage /></PrivateRoute>
          } />
          <Route path="/admin/quotations" element={
            <PrivateRoute allowedModules={["quotation"]}><QuotationPage /></PrivateRoute>
          } />
          <Route path="/admin/ad" element={
            <PrivateRoute allowedModules={["adds"]}><AdPage /></PrivateRoute>
          } />
          <Route path="/admin/sales" element={
            <PrivateRoute allowedModules={["sales"]}><SalesPage /></PrivateRoute>
          } />
          <Route path="/admin/repair-reports" element={
            <PrivateRoute allowedModules={["repairreport"]}><RepairReportPage /></PrivateRoute>
          } />
          <Route path="/admin/workshop-schedules" element={
            <PrivateRoute allowedModules={["mechanic"]}><WorkshopSchedulePage /></PrivateRoute>
          } />
          <Route path="/admin/roles" element={
            <PrivateRoute allowedModules={["roles"]}><RolePage /></PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
