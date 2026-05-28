import React from "react";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import WorkshopScheduleForm from "../components/organisms/WorkshopScheduleForm";
import { useNavigate } from "react-router-dom";

const CreateWorkshopSchedule = () => {
  const navigate = useNavigate();

  const handleAction = () => {
    navigate("/");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEF1EF" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container mt-4 mb-4" style={{ maxWidth: "600px" }}>
          <div className="card shadow-sm">
            <div className="card-body" style={{ backgroundColor: "#1A2633" }}>
              <h2 className="text-center" style={{ color: "#EEF1EF" }}>
                Agendar Cita de Taller
              </h2>
            </div>

            <div style={{ padding: "24px", backgroundColor: "#EEF1EF" }}>
              <WorkshopScheduleForm
                onClose={handleAction}
                onRefresh={handleAction}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateWorkshopSchedule;
