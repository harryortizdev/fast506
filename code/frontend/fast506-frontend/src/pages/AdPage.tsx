import { useEffect, useState } from "react";
import TableGeneric from "../components/organisms/TableGeneric";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import AlertWarning from "../components/atoms/AlertWarning";
import ButtonIcon from "../components/molecules/ButtonIcon";
import { Ad } from "../models/Ad";
import { deleteAd, getAll } from "../services/AdService";
import AdForm from "../components/organisms/AdForm";
import { getAll as getAllAdministrators } from "../services/AdministratorService";
import { Administrator } from "../models/Administrator";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";


type adTable = Ad & { //tabla ajustable 
  administratorName: string;
};



const AdPage = () => {
  const [ad, setAd] = useState<Ad[]>([]); //guarda la lista de anuncios
  const [showForm, setShowForm] = useState(false); //formulario off
  const [adToEdit, setAdToEdit] = useState<Ad | undefined>(undefined); //resguarda el anuncio
  const [administrators, setAdministrators] = useState<Administrator[]>([]); //lista administradores
  const [refreshKey, setRefreshKey] = useState(0);

  const loadAd = async () => {
    const data = await getAll();//pide lista anuncios
    setAd(data);//las setea
  };

  const loadDetails = async () => { //cargo datos extra, en este caso lista de administradores
    try {
      const administratorsData = await getAllAdministrators();
      setAdministrators(Array.isArray(administratorsData) ? administratorsData : []);

    } catch (error) {
      console.error("Error cargando datos ", error);
    }
  };

  useEffect(() => { //Carga la lista una sola vez al iniciar el programa
    loadAd();
    loadDetails();

  }, []);



  const handleSaveAndClose = async () => {
    await loadAd(); //lista de anuncios
    await loadDetails(); //ajusta id a nombre
    setRefreshKey((prev) => prev + 1);

    setAdToEdit(undefined); //limpia la unidad de editar
    setShowForm(false); //limpia formulario

  };

  const handleClose = () => { //cancelar 
    setAdToEdit(undefined); //limpia los datos de sucursal
    setShowForm(false);//esconde el formulario
  };

  const handleEdit = async (ad: Ad) => { //editar
    const confirmar = await AlertConfirm(`¿Desea editar el anuncio ${ad.title}?`);
    if (!confirmar) return;//si no selecciona confirmar cancela 
    setAdToEdit(ad);//pone los datos de la sucursal en sus respectivas casillas
    setShowForm(true);//abre el formulario
  };

  const handleDelete = async (ad: Ad) => {//eliminar
    if (!ad.idAd) return;// sin id no trabaja
    const confirmar = await AlertConfirm(`¿Desea eliminar el anuncio ${ad.title}?`); //alerta de confirmacion
    if (!confirmar) return;//si no selecciona confirmar cancela 
    await deleteAd(ad.idAd!); //señal de eliminar
    AlertWarning("Anuncio eliminado correctamente."); //alert de eliminado correctamente
    await loadAd();//recargar la lista
    await loadDetails();
    setRefreshKey((prev) => prev + 1);

  };

  const geAdministratorName = (idUser?: number) => {
    const a = administrators.find((a) => Number(a.idUser) === Number(idUser));
    return a?.name || `Usuario #${idUser}`; // Si no lo encuentra, pone el ID por defecto
  };

  const transformedAdTable: adTable[] = ad.map((q) => ({
    ...q, // Copia la original intacta 
    administratorName: geAdministratorName(q.idUser),
  }));


  useEffect(() => {
    if (showForm || ad.length === 0) return;

    const tableElement = document.querySelector("#adTable table");
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
  }, [showForm, ad.length, refreshKey]);

  const columns: { key: keyof adTable; label: string }[] = [ //columnas
    { key: "index" as keyof adTable, label: "#" },
    { key: "title", label: "Título" },
    { key: "category", label: "Categoría" },
    { key: "publicationStatus", label: "¿Publicado?" },
    { key: "administratorName", label: "Creador" },

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
                Gestión de Anuncios
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
                <div id="adTable" key={refreshKey}>

                  <TableGeneric

                    data={transformedAdTable}
                    columns={columns}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </div>

              ) : (
                <AdForm
                  onClose={handleClose}
                  onRefresh={handleSaveAndClose}
                  adToEdit={adToEdit}
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

export default AdPage;