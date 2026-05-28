import { useLocation, useNavigate } from "react-router-dom";
import SalesClientForm from "../components/organisms/SalesClientForm";
import Footer from "../components/organisms/Footer";
import Navbar from "../components/organisms/Navbar";

const SalesClientPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const idCatalog = location.state?.idCatalog;

  return (
    <div className="d-flex flex-column min-vh-100">

     <Navbar />

      <main className="flex-grow-1 py-4">
        <SalesClientForm
          onClose={() => navigate(-1)}
          onRefresh={() => {}}
          salesToEdit={null}
          idCatalogFromUrl={idCatalog}
        />
      </main>

      <Footer />

    </div>
  );
};

export default SalesClientPage;