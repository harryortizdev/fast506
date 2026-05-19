import { useEffect, useState } from "react";
import TableGeneric from "../components/organisms/TableGeneric";
import { deleteCatalog, getAll } from "../services/CatalogService";
import { Catalog } from "../models/Catalog";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";

const CatalogPage = () => {
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);

    const loadCatalogs = async () => {
        const data = await getAll();
        console.log(data);
        setCatalogs(data);
    };

    useEffect(() => {
        loadCatalogs();
    }, []);

    const handleDelete = async (catalog: Catalog) => {// cuando presiono el boton eliminar
        if (!catalog.idCatalog) return;//  si no tiene id no haga nada
        const confirmar = await AlertConfirm(`¿Desea eliminar el vehículo ${catalog.idCatalog}?`);//confirmación del usuario
        if (!confirmar) return;//si cancela no hago nada
        await deleteCatalog(catalog.idCatalog!);//envia la señal al backend de eliminar
        await loadCatalogs();//recargo la lista 
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
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#EEF1EF" }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <div className="container-fluid container-md mt-3 mt-md-4 mb-4 px-2 px-md-4">
                    <div className="card shadow-sm border-0">
                        <div
                            className="card-header"
                            style={{ backgroundColor: "#2C3E50" }}
                        >
                            <h5 className="mb-0 text-center text-md-start" style={{ color: "#EEF1EF" }}>
                                Catálogo de Vehículos
                            </h5>
                        </div>
                        <div className="card-body p-2 p-md-4" style={{ backgroundColor: "#EEF1EF" }}>
                            <TableGeneric
                                data={catalogs}
                                columns={columns}
                                onDelete={handleDelete}
                                onEdit={() => { }}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CatalogPage;