import { useEffect, useState } from "react"
import { Quotation } from "../models/Quotation"
import { deleteQuotation, getAll } from "../services/QuotationService";
import AlertConfirm from "../components/atoms/AlertConfirm";
import AlertWarning from "../components/atoms/AlertWarning";
import Navbar from "../components/organisms/Navbar";
import ButtonIcon from "../components/molecules/ButtonIcon";
import TableGeneric from "../components/organisms/TableGeneric";
import Footer from "../components/organisms/Footer";
import QuotationForm from "../components/organisms/QuotationForm";
import { Client } from "../models/Client";
import { Unit } from "../models/Unit";
import { getAll as getAllCatalog } from "../services/CatalogService";
import { getAll as getAllClients } from "../services/ClientService";
import { getAll as getAllUnits } from "../services/UnitService";
import { Catalog } from "../models/Catalog";



type QuotationTable = Quotation & {
  dateFormatted: string;      // Para el día/mes/año
  userName: string;           // Para el nombre de la persona
  carName: string;            // Para el nombre del vehículo
  catalogName: string;         // Para el nombre de la sucursal (catálogo)
};


const QuotationPage = () => {
  const [quotation, setQuotation] = useState<Quotation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [quotationToEdit, setQuotationToEdit] = useState<Quotation | undefined>(undefined);

  const [clients, setClients] = useState<Client[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [catalogs, setCatalog] = useState<Catalog[]>([]);

  const loadQuotation = async () => {
    const data = await getAll();
    setQuotation(data);
  }

  const loadDetails = async () => {
    try {
      const clientsData = await getAllClients();
      setClients(Array.isArray(clientsData) ? clientsData : []);

      const unitsData = await getAllUnits();
      setUnits(Array.isArray(unitsData) ? unitsData : []);

      const catalogData = await getAllCatalog();
      setCatalog(Array.isArray(catalogData) ? catalogData : []);
    } catch (error) {
      console.error("Error cargando datos ", error);
    }
  };

  useEffect(() => {
    loadQuotation();
    loadDetails();
  }, []);

  const handleSaveAndClose = async () => {
    await loadQuotation(); //lista de sucursales
    await loadDetails(); //lista de datos extra
    setQuotationToEdit(undefined); //limpia la unidad de editar
    setShowForm(false); //limpia formulario
  };

  const handleClose = () => { //cancelar 
    setQuotationToEdit(undefined); //limpia los datos de sucursal
    setShowForm(false);//esconde el formulario
  };

  const handleEdit = (quotation: Quotation) => { //editar
    setQuotationToEdit(quotation);//pone los datos de la sucursal en sus respectivas casillas
    setShowForm(true);//abre el formulario
  };

  const handleDelete = async (quotation: Quotation) => {//eliminar
    if (!quotation.idQuotation) return;// sin id no trabaja
    const confirmar = await AlertConfirm(`¿Desea eliminar la Cotizacion ${quotation.referenceNumber}?`); //alerta de confirmacion
    if (!confirmar) return;//si no selecciona confirmar cancela 
    await deleteQuotation(quotation.idQuotation!); //señal de eliminar
    AlertWarning("Sucursal eliminada correctamente."); //alert de eliminado correctamente
    await loadQuotation();//recargar la lista
    await loadDetails(); //recarga datos extra
  };

  const formatDate = (date?: any) => {
    if (!date) return "";

    let dateObject: Date;

    // Si viene como array [año, mes, día] desde el backend
    if (Array.isArray(date)) {
      const [year, month, day] = date;
      dateObject = new Date(year, month - 1, day);
    } else {
      // Si viene como string ISO
      dateObject = new Date(String(date).split("T")[0] + "T00:00:00");
    }

    if (isNaN(dateObject.getTime())) {
      return String(date);
    }

    // Esto te lo devuelve en formato: "23 de junio de 2026" o similar
    // Si preferís estrictamente "23/06/2026", avisame y lo cambiamos a una sola línea
    const formatted = dateObject.toLocaleDateString("es-CR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return formatted;
  };

  const getUserName = (idUser?: number) => {
    const c = clients.find((c) => Number(c.idUser) === Number(idUser));
    return c?.name || `Usuario #${idUser}`; // Si no lo encuentra, pone el ID por defecto
  };

  const getUnitName = (idCar?: number) => {
    const u = units.find((c) => Number(c.idCar) === Number(idCar));
    return u?.carName + " " + u?.transmission + " " + u?.fuelType || `Unidad #${idCar}`;
  };

  const getCatalogName = (idCatalog?: number) => {
    const c = catalogs.find((b) => Number(b.idCatalog) === Number(idCatalog));
    return c?.carName + " " + c?.transmission + " " + c?.fuelType || `Sucursal #${idCatalog}`;
  };

  const transformedQuotations: QuotationTable[] = quotation.map((q) => ({
    ...q, // Copia la cotización original intacta (¡así no se rompe el Editar!)
    dateFormatted: formatDate(q.date),
    userName: getUserName(q.idUser),
    carName: getUnitName(q.idCar),
    catalogName: getCatalogName(q.idCatalog),
  }));


  const columns: { key: keyof QuotationTable; label: string }[] = [ //columnas
    { key: "idQuotation", label: "ID" },
    { key: "referenceNumber", label: "Num. Referencia" },
    { key: "dateFormatted", label: "Fecha" },
    { key: "initialPrice", label: "Precio Inicial" },
    { key: "salesTax", label: "IVA" },
    { key: "transferCost", label: "Costo Traspaso" },
    { key: "totalPayment", label: "Pago Total" },
    { key: "userName", label: "Usuario" },
    { key: "catalogName", label: "Catalogo" },
    { key: "carName", label: "Unidad" },
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
                Gestión de Cotizaciones
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
                  data={transformedQuotations}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ) : (
                <QuotationForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  quotationToEdit={quotationToEdit}
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

export default QuotationPage;
