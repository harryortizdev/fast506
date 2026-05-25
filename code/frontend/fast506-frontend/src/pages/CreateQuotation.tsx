import React from "react";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import ClientQuotationForm from "../components/organisms/QuotationClientForm";
import { useNavigate } from "react-router-dom";

const CreateQuotation = () => {
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
              <h2 className="text-center" style={{ color: "#EEF1EF" }}>Solicitar Cotización</h2>
            </div>
          
            <ClientQuotationForm 
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

export default CreateQuotation;