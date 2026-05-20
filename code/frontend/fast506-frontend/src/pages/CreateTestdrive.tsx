import React from "react";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import ClientTestdriveForm from "../components/organisms/TestdriveClientForm";
import { useNavigate } from "react-router-dom";

const CreateTestdrive = () => {
  const navigate = useNavigate();

  const handleAction = () => {
    navigate("/"); 
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEF1EF" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container mt-4 mb-4" style={{ maxWidth: '600px' }}>
          <div className="card shadow-sm">
            <div className="card-body" style={{ backgroundColor: "#1A2633" }}>
              <h2 className="text-center" style={{ color: "#EEF1EF" }}>Solicitar Testdrive</h2>
            </div>
          
            {/* Pasamos funciones vacías para cumplir con la interfaz del formulario */}
            <ClientTestdriveForm 
              onClose={handleAction} 
              onRefresh={handleAction} 
            />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateTestdrive;