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


const QuotationPage = () => {
    const [quotation, setQuotation] = useState<Quotation[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [quotationToEdit, setQuotationToEdit] = useState<Quotation | undefined>(undefined);

    const loadQuotation = async () => {
        const data = await getAll();
        setQuotation(data);
    }

    useEffect(() => {
        loadQuotation();
    }, []);

    const handleSaveAndClose = async () => {
        await loadQuotation(); //lista de sucursales
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
    };


    const columns: { key: keyof Quotation; label: string }[] = [ //columnas
        { key: "idQuotation", label: "ID" },
        { key: "referenceNumber", label: "Num. Referencia" },
        { key: "date", label: "Fecha" },
        { key: "initialPrice", label: "Precio Inicial" },
        { key: "salesTax", label: "IVA" },
        { key: "transferCost", label: "Costo Traspaso" },
        { key: "totalPayment", label: "Pago Total" },
        { key: "idUser", label: "Usuario" },
        { key: "idCatalog", label: "Catalogo" },
        { key: "idCar", label: "Unidad" },
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
                  data={quotation}
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
