import BranchPage from "./pages/BranchPage";
import SupplierPage from "./pages/SupplierPage";
import UnitPage from "./pages/UnitPage";
import { Unit } from './models/Unit';

function App() {
  return (
   <div>
      <SupplierPage />
      <h1></h1>
      <h2></h2>
      <UnitPage/>
      <h1></h1>
      <h2></h2>
      <BranchPage />
    </div>
  );
}

export default App;
