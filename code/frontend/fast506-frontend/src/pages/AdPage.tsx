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




const AdPage = () => {
  const [ad, setAd] = useState<Ad[]>([]); //guarda la lista de anuncios
  const [showForm, setShowForm] = useState(false); //formulario off
  const [adToEdit, setAdToEdit] = useState<Ad | undefined>(undefined); //resguarda el anuncio


  const loadAd = async () => {
    const data = await getAll();//pide lista anuncios
    setAd(data);//las setea
  };

  useEffect(() => { //Carga la lista una sola vez al iniciar el programa
    loadAd();
  }, []);

  const handleSaveAndClose = async () => {
    await loadAd(); //lista de anuncios
    setAdToEdit(undefined); //limpia la unidad de editar
    setShowForm(false); //limpia formulario
  };

  const handleClose = () => { //cancelar 
    setAdToEdit(undefined); //limpia los datos de sucursal
    setShowForm(false);//esconde el formulario
  };

  const handleEdit = (ad: Ad) => { //editar
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
  };


  const columns: { key: keyof Ad; label: string }[] = [ //columnas
    { key: "idAd", label: "ID" },
    { key: "title", label: "Título" },
    { key: "category", label: "Categoria" },
    { key: "publicationStatus", label: "¿Publicado?" },
    { key: "idUser", label: "Creador" },

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
                <TableGeneric
                  data={ad}
                  columns={columns}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
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