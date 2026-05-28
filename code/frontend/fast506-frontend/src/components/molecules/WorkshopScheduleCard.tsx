import { WorkshopSchedule } from "../../models/WorkshopSchedule";

interface WorkshopScheduleCardProps {
  appointment: WorkshopSchedule;
  clientName: string;
  branchName: string;
  onEdit: (appointment: WorkshopSchedule) => void;
  onDelete: (appointment: WorkshopSchedule) => void;
  formatDate: (dateString: string) => string;
}

const WorkshopScheduleCard = ({
  appointment,
  clientName,
  branchName,
  onEdit,
  onDelete,
  formatDate,
}: WorkshopScheduleCardProps) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(44, 62, 80, 0.1)",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(44, 62, 80, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(44, 62, 80, 0.1)";
      }}
    >
      {/* Card Header */}
      <div
        style={{
          backgroundColor: "#2C3E50",
          padding: "16px",
          color: "#EEF1EF",
        }}
      >
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h6 style={{ marginBottom: "4px", fontWeight: "700" }}>
              {clientName}
            </h6>
            <small style={{ color: "#A9B4C2" }}>
              Ref. {appointment.numberReference}
            </small>
          </div>
          <span
            style={{
              backgroundColor: "#5E6572",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            #{appointment.idAppointment}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: "16px", flex: 1 }}>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "#A9B4C2", fontWeight: "600" }}>
            PLACA
          </label>
          <p
            style={{
              marginBottom: "0",
              fontSize: "16px",
              fontWeight: "600",
              color: "#2C3E50",
            }}
          >
            {appointment.licensePlate}
          </p>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "#A9B4C2", fontWeight: "600" }}>
            FECHA DE INGRESO
          </label>
          <p
            style={{
              marginBottom: "0",
              fontSize: "14px",
              color: "#2C3E50",
            }}
          >
            {formatDate(appointment.entryDate)}
          </p>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={{ fontSize: "12px", color: "#A9B4C2", fontWeight: "600" }}>
            MOTIVO DEL SERVICIO
          </label>
          <p
            style={{
              marginBottom: "0",
              fontSize: "14px",
              color: "#2C3E50",
            }}
          >
            {appointment.reasonService}
          </p>
        </div>

        <div className="row g-2">
          <div className="col-6">
            <label style={{ fontSize: "12px", color: "#A9B4C2", fontWeight: "600" }}>
              KILOMETRAJE
            </label>
            <p
              style={{
                marginBottom: "0",
                fontSize: "14px",
                color: "#2C3E50",
              }}
            >
              {appointment.receptionMileage} km
            </p>
          </div>
          <div className="col-6">
            <label style={{ fontSize: "12px", color: "#A9B4C2", fontWeight: "600" }}>
              SUCURSAL
            </label>
            <p
              style={{
                marginBottom: "0",
                fontSize: "14px",
                color: "#2C3E50",
              }}
            >
              {branchName}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div
        style={{
          padding: "12px 16px",
          backgroundColor: "#F8F9FA",
          borderTop: "1px solid #EEF1EF",
          display: "flex",
          gap: "8px",
        }}
      >
        <button
          onClick={() => onEdit(appointment)}
          style={{
            flex: 1,
            padding: "8px 12px",
            backgroundColor: "#5E6572",
            color: "#EEF1EF",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#2C3E50")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#5E6572")
          }
        >
          <i className="bi bi-pencil me-2"></i>
          Editar
        </button>
        <button
          onClick={() => onDelete(appointment)}
          style={{
            flex: 1,
            padding: "8px 12px",
            backgroundColor: "#dc3545",
            color: "#EEF1EF",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#c82333")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#dc3545")
          }
        >
          <i className="bi bi-trash me-2"></i>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default WorkshopScheduleCard;
