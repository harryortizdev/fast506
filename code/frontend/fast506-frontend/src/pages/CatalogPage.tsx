import { useEffect, useState } from "react";
import TableGeneric from "../components/organisms/TableGeneric";
import { deleteCatalog, getAll } from "../services/CatalogService";
import { Catalog } from "../models/Catalog";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import CatalogForm from "../components/organisms/CatalogForm";
import ButtonIcon from "../components/molecules/ButtonIcon";

const CatalogPage = () => {
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);

    const loadCatalogs = async () => {
        const data = await getAll();
        setCatalogs(data);
    };

    useEffect(() => {
        loadCatalogs();
    }, []);

    const handleDelete = async (catalog: Catalog) => {
        if (!catalog.idCatalog) return;
        const confirmar = await AlertConfirm(`¿Desea eliminar el vehículo ${catalog.idCatalog}?`
        );
        if (!confirmar) return;
        await deleteCatalog(catalog.idCatalog);
        await loadCatalogs();
    };

    const handleEdit = (catalog: Catalog) => {
        setSelectedCatalog(catalog);
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
        setSelectedCatalog(null);
    };

    const handleSaveAndClose = () => {
        loadCatalogs();
        setShowForm(false);
        setSelectedCatalog(null);
    };

    const columns: { key: keyof Catalog; label: string }[] = [
        { key: "idCatalog", label: "ID" },
        { key: "carName", label: "Nombre" },
        { key: "brandName", label: "Marca" },
        { key: "bodyWork", label: "Carrocería" },
        { key: "basePrice", label: "Precio Base" },
        { key: "yearManufacture", label: "Año" },
        { key: "transmission", label: "Transmisión" },
        { key: "fuelType", label: "Combustible" },
        { key: "engineSize", label: "Cilindraje" },
    ];

    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "#EEF1EF"
            }}
        >
            <Navbar />
            <main style={{ flex: 1, backgroundColor: "#EEF1EF" }}>
                <div className="container-fluid container-md mt-3 mt-md-4 mb-4 px-2 px-md-4">
                    <div className="card shadow-sm border-0">
                        <div
                            className="card-header d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-2"
                            style={{ backgroundColor: "#2C3E50" }}>
                            <h5
                                className="mb-0 text-center text-md-start"
                                style={{ color: "#EEF1EF" }}>
                                Catálogo de Vehículos
                            </h5>
                            {!showForm && (
                                <div className="d-flex justify-content-center justify-content-md-end">
                                    <ButtonIcon
                                        label="Nuevo"
                                        onClick={() => {
                                            setSelectedCatalog(null);
                                            setShowForm(true);
                                        }}
                                        icon={<i className="bi bi-plus-circle" />}
                                        className="btn w-100 w-sm-auto d-flex align-items-center justify-content-center gap-2"
                                        backgroundColor="#5E6572"
                                        hoverColor="#2C3E50"
                                        color="#EEF1EF"
                                        style={{ border: "none" }}
                                    />
                                </div>
                            )}
                        </div>
                        <div
                            className="card-body p-2 p-md-4"
                            style={{ backgroundColor: "#EEF1EF" }}
                        >
                            {!showForm ? (
                                <TableGeneric
                                    data={catalogs}
                                    columns={columns}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            ) : (
                                <CatalogForm
                                    onClose={handleClose}
                                    onRefresh={handleSaveAndClose}
                                    catalogToEdit={selectedCatalog}
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

export default CatalogPage;