import { useEffect, useState } from "react";
import { Testdrive } from "../models/Testdrive";
import AlertConfirm from "../components/atoms/AlertConfirm";
import AlertWarning from "../components/atoms/AlertWarning";
import ButtonIcon from "../components/molecules/ButtonIcon";
import Footer from "../components/organisms/Footer";
import Navbar from "../components/organisms/Navbar";
import TableGeneric from "../components/organisms/TableGeneric";
import { deleteTestdrive } from "../services/TestdriveService";
import { getAll } from "../services/TestdriveService";
import TestdriveForm from "../components/organisms/TestdriveForm";
import { Client } from "../models/Client";
import { Branch } from "../models/Branch";
import { Unit } from "../models/Unit";
import { getAll as getAllBranch } from "../services/BranchService";
import { getAll as getAllClients } from "../services/ClientService";
import { getAll as getAllUnits } from "../services/UnitService";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

type TestdriveTable = Testdrive & {
  creationDateFormatted: string;      // Para el día/mes/año
  scheduledDateFormatted: string;      // Para el día/mes/año
  clientName: string;           // Para el nombre de la persona
  carName: string;            // Para el nombre del vehículo
  branchName: string;         // Para el nombre de la sucursal (catálogo)
};

const TestdrivePage = () => {
  const [testdrive, setTestDrive] = useState<Testdrive[]>([]); //guarda la lista de Testdrives
  const [showForm, setShowForm] = useState(false); //formulario off
  const [testdriveToEdit, setTestdriveToEdit] = useState<Testdrive | undefined>(undefined); //resguarda la sucursal a ediaatr

  const [clients, setClients] = useState<Client[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [branchs, setBranchs] = useState<Branch[]>([]);


  const loadTestdrive = async () => {
    const data = await getAll();//pide lista testdrive
    setTestDrive(data);//las setea
  };

  const loadDetails = async () => {
    try {
      const clientsData = await getAllClients();
      setClients(Array.isArray(clientsData) ? clientsData : []);

      const unitsData = await getAllUnits();
      setUnits(Array.isArray(unitsData) ? unitsData : []);

      const branchData = await getAllBranch();
      setBranchs(Array.isArray(branchData) ? branchData : []);
    } catch (error) {
      console.error("Error cargando datos ", error);
    }
  };

  useEffect(() => { //Carga la lista una sola vez al iniciar el programa
    loadTestdrive();
    loadDetails();

  }, []);


  const handleSaveAndClose = async () => {
    await loadTestdrive(); //lista de testdrives
    await loadDetails(); //lista de datos extra

    setTestdriveToEdit(undefined); //limpia el testdrive de editar
    setShowForm(false); //limpia formulario
  };

  const handleClose = () => { //cancelar 
    setTestdriveToEdit(undefined); //limpia los datos de testdrive
    setShowForm(false);//esconde el formulario
  };

  const handleEdit = async (testdrive: Testdrive) => { //editar
    const confirmar = await AlertConfirm(`¿Desea editar el Testdrive ${testdrive.numberReference}?`); //alerta de confirmacion
    if (!confirmar) return;//si no selecciona confirmar cancela 
    setTestdriveToEdit(testdrive);//pone los datos del testdrive en sus respectivas casillas
    setShowForm(true);//abre el formulario
  };

  const handleDelete = async (testdrive: Testdrive) => {//eliminar
    if (!testdrive.idTest) return;// sin id no trabaja
    const confirmar = await AlertConfirm(`¿Desea eliminar el Testdrive ${testdrive.numberReference}?`); //alerta de confirmacion
    if (!confirmar) return;//si no selecciona confirmar cancela 
    await deleteTestdrive(testdrive.idTest!); //señal de eliminar
    AlertWarning("Testdrive eliminada correctamente."); //alert de eliminado correctamente
    await loadTestdrive();//recargar la lista
    await loadDetails(); //recarga datos extra

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

  const getUserName = (idUser?: number) => {
    const c = clients.find((c) => Number(c.idUser) === Number(idUser));
    return c?.name || `Usuario #${idUser}`; // Si no lo encuentra, pone el ID por defecto
  };

  const getUnitName = (idCar?: number) => {
    const u = units.find((c) => Number(c.idCar) === Number(idCar));
    return u?.carName + " " + u?.transmission + " " + u?.fuelType || `Unidad #${idCar}`;
  };

  const getBranchName = (idBranch?: number) => {
    const b = branchs.find((b) => Number(b.idBranch) === Number(idBranch));
    return b?.name || `Sucursal #${idBranch}`;
  };


  const transformedTestDrive: TestdriveTable[] = testdrive.map((q) => ({
    ...q, // Copia la cotización original intacta (¡así no se rompe el Editar!)
    creationDateFormatted: formatDate(q.creationDate),
    scheduledDateFormatted: formatDate(q.scheduledDate),
    clientName: getUserName(q.idUser),
    carName: getUnitName(q.idCar),
    branchName: getBranchName(q.idBranch),
  }));

  useEffect(() => {
    let table: any;

    if (testdrive.length > 0) {
      table = new DataTable('#myTable', {
        language: {
          search: "Buscar:",
          searchPlaceholder: "Escribe aquí...",
          lengthMenu: "Mostrar _MENU_ registros",
          info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
          infoEmpty: "No hay registros",
          zeroRecords: "No se encontraron resultados",

        }
      });
    }
    return () => {
      if (table) {
        table.destroy();
      }
    };
  }, [testdrive]);


  const columns: { key: keyof TestdriveTable; label: string }[] = [ //columnas
    { key: "index" as keyof TestdriveTable, label: "#" },
    { key: "numberReference", label: "Num.Referencia" },
    { key: "creationDateFormatted", label: "Fecha de creación" },
    { key: "scheduledDateFormatted", label: "Fecha cita agendada" },
    { key: "initiationTime", label: "Hora de Inicio" },
    { key: "finalizationTime", label: "Fecha de finalización" },
    { key: "statusAppointment", label: "Estado" },
    { key: "clientName", label: "Usuario" },
    { key: "carName", label: "Vehiculo" },
    { key: "branchName", label: "Sucursal" },

  ];


  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEF1EF", }}>

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
                Gestión de Testdrive
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
                    border: "none"
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
                  data={transformedTestDrive}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <TestdriveForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  testdriveToEdit={testdriveToEdit}
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

export default TestdrivePage;