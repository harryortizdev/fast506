import { useEffect, useState } from "react";
import ButtonNew from "../components/ButtonNew";
import MechanicForm from "../components/organisms/MechanicForm";
import TableGeneric from "../components/organisms/TableGeneric";
import { getAll, deleteMechanic } from "../services/MechanicService";
import { Mechanic } from "../models/Mechanic";
import ButtonIcon from "../components/molecules/ButtonIcon";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";

type MechanicTable = Mechanic & {
  dateFormatted: string;
};

const MechanicPage = () => {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [MechanicToEdit, setMechanicToEdit] = useState<Mechanic | undefined>(
    undefined,
  );

  const loadMechanics = async () => {
    const data = await getAll();
    setMechanics(data);
  };

  useEffect(() => {
    loadMechanics();
  }, []);

  const handleSaveAndClose = async () => {
    await loadMechanics();
    setMechanicToEdit(undefined);
    setShowForm(false);
  };

  const handleClose = () => {
    setMechanicToEdit(undefined);
    setShowForm(false);
  };

  const handleEdit = (mechanic: Mechanic) => {
    setMechanicToEdit(mechanic);
    setShowForm(true);
  };

  const handleDelete = async (mechanic: Mechanic) => {
    if (!mechanic.idUser) return;
    const confirmar = await AlertConfirm(
      `¿Desea eliminar el mecánico ${mechanic.name}?`,
    );
    if (!confirmar) return;
    await deleteMechanic(mechanic.idUser!);
    await loadMechanics();
  };

  const formatDate = (date?: any) => {
    if (!date) return "";

    let dateObject: Date;

    //    Si la fecha viene como un arreglo de número[2026, 6, 23]
    if (Array.isArray(date)) {
      const [year, month, day] = date;

      dateObject = new Date(year, month - 1, day);
    } else {
      dateObject = new Date(String(date).split("T")[0] + "T00:00:00");
    }

    // corrupto o algo que no se pudo parsear bien getTime() devolve NaN es así, devolvemos el string original
    if (isNaN(dateObject.getTime())) {
      return String(date);
    }

    const formatted = dateObject.toLocaleDateString("es-CR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const transformedMechanics: MechanicTable[] = mechanics.map((m) => ({
    ...m,
    dateFormatted: formatDate(m.dateBirth),
  }));

  const columns: { key: keyof MechanicTable; label: string }[] = [
    { key: "index" as keyof Mechanic, label: "#" },
    { key: "name", label: "Nombre" },
    { key: "id", label: "Cédula" },
    { key: "email", label: "Correo Electrónico" },
    { key: "phoneNumber", label: "Número de Teléfono" },
    { key: "dateFormatted", label: "Fecha de Nacimiento" },
    { key: "profileImage", label: "Foto de Perfil" },
    { key: "employeeId", label: "ID de Empleado" },
    { key: "corporateEmail", label: "Correo Corporativo" },
    { key: "certLevel", label: "Nivel de Certificación" },
    { key: "specialty", label: "Especialidad" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#EEF1EF",
      }}
    >
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container-fluid container-md mt-3 mt-md-4 mb-4 px-2 px-md-4">
          <div className="card shadow-sm border-0">
            <div
              className="card-header d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-2"
              style={{ backgroundColor: "#2C3E50" }}
            >
              <h5
                className="mb-0 text-center text-md-start"
                style={{ color: "#EEF1EF" }}
              >
                Gestión de Mecánicos
              </h5>

              <div className="d-flex justify-content-center justify-content-md-end">
                <ButtonIcon
                  label="Nuevo"
                  onClick={() => setShowForm(true)}
                  icon={<i className="bi bi-plus-circle" />}
                  className="btn mb-3 w-100 w-sm-auto d-flex align-items-center justify-content-center gap-2"
                  backgroundColor="#5E6572"
                  hoverColor="#2C3E50"
                  color="#EEF1EF"
                  style={{
                    backgroundColor: "#5E6572",
                    color: "#EEF1EF",
                    border: "none",
                  }}
                />
              </div>
            </div>

            <div
              className="card-body p-2 p-md-4"
              style={{ backgroundColor: "#EEF1EF" }}
            >
              {!showForm ? (
                <TableGeneric
                  data={transformedMechanics}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <MechanicForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  mechanicToEdit={MechanicToEdit}
                  //mechanics={mechanics}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MechanicPage;
