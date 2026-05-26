import { useEffect, useState } from "react";
import TableGeneric from "../components/organisms/TableGeneric";
import { deleteSales, getAll } from "../services/SalesService";
import { Sales } from "../models/Sales";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import SalesForm from "../components/organisms/SalesForm";
import ButtonIcon from "../components/molecules/ButtonIcon";

const SalesPage = () => {
    const [catalogs, setCatalogs] = useState<Sales[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedSales, setSelectedSales] = useState<Sales | null>(null);

    const loadCatalogs = async () => {
        const data = await getAll();
        setCatalogs(data);
    };

    useEffect(() => {
        loadCatalogs();
    }, []);

    const handleDelete = async (sales: Sales) => {
        if (!sales.idSales) return;
        const confirmar = await AlertConfirm(`¿Desea eliminar el vehículo ${sales.idSales}?`
        );
        if (!confirmar) return;
        await deleteSales(sales.idSales);
        await loadCatalogs();
    };

    const handleEdit = (sales: Sales) => {
        setSelectedSales(sales);
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
        setSelectedSales(null);
    };

    const handleSaveAndClose = () => {
        loadCatalogs();
        setShowForm(false);
        setSelectedSales(null);
    };

    const columns: { key: keyof Sales; label: string }[] = [
        { key: "idSales", label: "ID" },
        { key: "invoiceNumber", label: "Factura" },
        { key: "transactionDate", label: "Fecha" },
        { key: "paymentMethod", label: "Método de pago" },
        { key: "basePrice", label: "Precio Base ($)" },
        { key: "salesTax", label: "IVA ($)" },
        { key: "totalPayment", label: "Total ($)" },
        { key: "transferCost", label: "Traspaso ($)" },
        { key: "idClient", label: "Cliente" },
        { key: "idAdmin", label: "Administrador" },
        { key: "idCar", label: "Unidad" },
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
                                            setSelectedSales(null);
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
                                <SalesForm
                                    onClose={handleClose}
                                    onRefresh={handleSaveAndClose}
                                    salesToEdit={selectedSales}
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

export default SalesPage;