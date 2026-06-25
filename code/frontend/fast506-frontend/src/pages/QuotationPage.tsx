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
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";



type QuotationTable = Quotation & { //lista personalizada
  dateFormatted: string;
  userName: string;
  carName: string;
  catalogName: string;
};


const QuotationPage = () => {
  const [quotation, setQuotation] = useState<Quotation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [quotationToEdit, setQuotationToEdit] = useState<Quotation | undefined>(undefined);
    const [refreshKey, setRefreshKey] = useState(0);


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
        setRefreshKey((prev) => prev + 1);

  };

  const handleClose = () => { //cancelar 
    setQuotationToEdit(undefined); //limpia los datos de sucursal
    setShowForm(false);//esconde el formulario
  };

  const handleEdit =  async (quotation: Quotation) => { //editar
    const confirmar = await AlertConfirm(`¿Desea editar la Cotizacion ${quotation.referenceNumber}?`); //alerta de confirmacion
    if (!confirmar) return;//si no selecciona confirmar cancela 
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
        setRefreshKey((prev) => prev + 1);

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
    return c?.name || `Usuario #${idUser}`;
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
    ...q, // Copia la cotización original intact
    dateFormatted: formatDate(q.date),
    userName: getUserName(q.idUser),
    carName: getUnitName(q.idCar),
    catalogName: getCatalogName(q.idCatalog),
  }));

  
    useEffect(() => {
    if (showForm || quotation.length === 0) return;

    const tableElement = document.querySelector("#quotationTable table");
    if (!tableElement) return;

    const hasRows = (tableElement as HTMLTableElement).querySelector("tbody tr") !== null;
    if (!hasRows) return;

    const table = new DataTable(tableElement as Element, {
      destroy: true,
      language: {
        search: "Buscar:",
        searchPlaceholder: "Escribe aquí...",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        infoEmpty: "No hay registros",
        zeroRecords: "No se encontraron resultados",
      },
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50],
    });

    return () => {
      table.destroy();
    };
  }, [showForm, quotation.length, refreshKey]);


  const columns: { key: keyof QuotationTable; label: string }[] = [ //columnas
    { key: "index" as keyof QuotationTable, label: "#" },
    { key: "referenceNumber", label: "Num. Referencia" },
    { key: "dateFormatted", label: "Fecha" },
    { key: "initialPrice", label: "Precio Inicial" },
    { key: "salesTax", label: "IVA" },
    { key: "transferCost", label: "Costo de Traspaso" },
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
                                                <div id="quotationTable" key={refreshKey}>

                <TableGeneric
                
                  data={transformedQuotations}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
                                </div>

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
