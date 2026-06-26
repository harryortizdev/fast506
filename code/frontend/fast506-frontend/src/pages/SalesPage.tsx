import { useEffect, useState } from "react";
import TableGeneric from "../components/organisms/TableGeneric";
import { deleteSales, getAll } from "../services/SalesService";
import { Sales } from '../models/Sales';
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import AlertConfirm from "../components/atoms/AlertConfirm";
import SalesForm from "../components/organisms/SalesForm";
import ButtonIcon from "../components/molecules/ButtonIcon";
import { Administrator } from "../models/Administrator";
import { Client } from "../models/Client";
import { Unit } from "../models/Unit";
import { getAll as getAllClients } from "../services/ClientService";
import { getAll as getAllUnits } from "../services/UnitService";
import { getAll as getAllAdmins } from "../services/AdministratorService";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import { useAuth } from "../context/AuthContext";

type SalesTable = Sales & {
    transactionDateFormatted: string;      // Para el día/mes/año
    clientName: string;           // Para el nombre de la persona
    carName: string;            // Para el nombre del vehículo
    adminName: string;         // Para el nombre del admin
};

const SalesPage = () => {
    const { hasPermission } = useAuth();
    const canCreate = hasPermission("sales", "create");
    const canEdit = hasPermission("sales", "update");
    const canDelete = hasPermission("sales", "delete");

    const [sales, setSales] = useState<Sales[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedSales, setSelectedSales] = useState<Sales | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);


    const [clients, setClients] = useState<Client[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [admins, setAdmins] = useState<Administrator[]>([]);

    const loadCatalogs = async () => {
        const data = await getAll();
        setSales(data);
    };

    const loadDetails = async () => {
        try {
            const clientsData = await getAllClients();
            setClients(Array.isArray(clientsData) ? clientsData : []);

            const unitsData = await getAllUnits();
            setUnits(Array.isArray(unitsData) ? unitsData : []);

            const adminsData = await getAllAdmins();
            setAdmins(Array.isArray(adminsData) ? adminsData : []);
        } catch (error) {
            console.error("Error cargando datos ", error);
        }
    };

    useEffect(() => {
        loadCatalogs();
        loadDetails();
    }, []);

    useEffect(() => {
    if (showForm || sales.length === 0) return;

    const tableElement = document.querySelector("#salesTable table");
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
  }, [showForm, sales.length, refreshKey]);

    const handleDelete = async (sales: Sales) => {
        if (!sales.idSales) return;
        const confirmar = await AlertConfirm(`¿Desea eliminar la venta ${sales.invoiceNumber}?`);
        if (!confirmar) return;
        await deleteSales(sales.idSales);
        await loadCatalogs();
        await loadDetails();
        setRefreshKey((prev) => prev + 1);

    };

    const handleEdit = async (sales: Sales) => {
        const confirmar = await AlertConfirm(`¿Desea editar la venta ${sales.invoiceNumber}?`);
        if (!confirmar) return;
        setSelectedSales(sales);
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
        setSelectedSales(null);
    };

    const handleSaveAndClose = async () => {
        loadCatalogs();
        setShowForm(false);
        setSelectedSales(null);
        loadDetails();
        setRefreshKey((prev) => prev + 1);

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

        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };

    const getClientName = (idUser?: number) => {
        const c = clients.find((c) => Number(c.idUser) === Number(idUser));
        return c?.name || `Usuario #${idUser}`; // Si no lo encuentra, pone el ID por defecto
    };

    const getUnitName = (idCar?: number) => {
        const u = units.find((c) => Number(c.idCar) === Number(idCar));
        return u?.carName + " " + u?.transmission + " " + u?.fuelType || `Unidad #${idCar}`;
    };

    const getAdminName = (idUser?: number) => {
        const a = admins.find((a) => Number(a.idUser) === Number(idUser));
        return a?.name || `Usuario #${idUser}`; // Si no lo encuentra, pone el ID por defecto
    };

    const transformedSales: SalesTable[] = sales.map((q) => ({
        ...q, // Copia la cotización original intacta (¡así no se rompe el Editar!)
        transactionDateFormatted: formatDate(q.transactionDate),
        clientName: getClientName(q.idClient),
        carName: getUnitName(q.idCar),
        adminName: getAdminName(q.idAdmin ?? undefined),
    }));


    const columns: { key: keyof SalesTable; label: string }[] = [
        { key: "index" as keyof SalesTable, label: "#" },
        { key: "invoiceNumber", label: "Factura" },
        { key: "transactionDateFormatted", label: "Fecha" },
        { key: "paymentMethod", label: "Método de pago" },
        { key: "basePrice", label: "Precio Base ($)" },
        { key: "salesTax", label: "IVA ($)" },
        { key: "totalPayment", label: "Total ($)" },
        { key: "transferCost", label: "Traspaso ($)" },
        { key: "salesStatus", label: "Estado" },
        { key: "clientName", label: "Cliente" },
        { key: "adminName", label: "Administrador" },
        { key: "carName", label: "Unidad" },
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
                                Venta de Vehículo
                            </h5>
                            {!showForm && canCreate && (
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
                                <div id="salesTable" key={refreshKey}>

                                    <TableGeneric
                                        data={transformedSales}
                                        columns={columns}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                        canEdit={canEdit}
                                        canDelete={canDelete}
                                    />
                                </div>

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