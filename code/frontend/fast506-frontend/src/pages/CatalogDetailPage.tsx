import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Catalog } from "../models/Catalog";
import { getCatalogById, getColorByCatalog } from "../services/CatalogService";

import Footer from "../components/organisms/Footer";
import Navbar from "../components/organisms/Navbar";

import ButtonIcon from "../components/molecules/ButtonIcon";

import Image from "../components/atoms/Image";
import Label from "../components/atoms/Label";
import Icon from "../components/atoms/Icon";

const CatalogDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [catalog, setCatalog] = useState<Catalog | null>(null);
    const [loading, setLoading] = useState(true);
    const [colors, setColors] = useState<string[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(false);

        getCatalogById(Number(id))
            .then((data) => {
                if (!data) {
                    setError(true);
                    return;
                }
                setCatalog(data);
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));

        getColorByCatalog(Number(id))
            .then((data) => setColors(data.map((c) => c.color)))
            .catch(() => setColors([]));

    }, [id]);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div className="spinner-border" style={{ color: "#1A2633" }} />
            </div>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />

                <div style={{
                    minHeight: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "#EEF1EF"
                }}>
                    <i className="bi bi-emoji-frown" style={{ fontSize: "4rem", color: "#1A2633" }} />

                    <h2 style={{ color: "#1A2633" }}>
                        Ups... algo salió mal
                    </h2>

                    <p style={{ color: "#5E6572" }}>
                        No se encontró el vehículo que estás buscando
                    </p>

                </div>

                <Footer />
            </>
        );
    }
    if (!catalog) return null;

    const whatsappNumber = "50661186130";
    const whatsappMsg = encodeURIComponent(`Hola, me interesa el ${catalog.carName}`);

    const specs = [
        { icon: "bi bi-car-front", label: "Marca", value: catalog.brandName },
        { icon: "bi bi-body-text", label: "Carrocería", value: catalog.bodyWork },
        { icon: "bi bi-calendar", label: "Año", value: catalog.yearManufacture },
        { icon: "bi bi-gear", label: "Transmisión", value: catalog.transmission },
        { icon: "bi bi-fuel-pump", label: "Combustible", value: catalog.fuelType },
        { icon: "bi bi-speedometer2", label: "Motor", value: catalog.engineSize },
    ];

    const getColor = (color: string) => {
        const value = color.toLowerCase();
        if (value.includes("blanco")) return "white";
        if (value.includes("negro")) return "black";
        if (value.includes("gris")) return "gray";
        if (value.includes("azul")) return "blue";
        if (value.includes("rojo")) return "red";
        if (value.includes("verde")) return "green";
        if (value.includes("plateado")) return "silver";
        if (value.includes("cafe") || value.includes("marron")) return "brown";
        return "lightgray";
    };

    return (
        <>
            <Navbar />

            <div style={{ minHeight: "100vh", backgroundColor: "#EEF1EF" }}>

                <div style={{
                    width: "100%",
                    maxHeight: "500px",
                    overflow: "hidden",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Image
                        src={`http://localhost:8080/${catalog.image}`}
                        alt={catalog.carName}
                        style={{
                            width: "100%",
                            maxWidth: "900px",
                            height: "auto",
                            objectFit: "contain",
                            objectPosition: "center",
                        }}
                    />
                </div>

                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "clamp(16px, 4vw, 48px) clamp(16px, 6vw, 80px)",
                }}>

                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "24px",
                        marginBottom: "32px",
                    }}>
                        <div>
                            <h1 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 700, color: "#1A2633", margin: 0 }}>
                                <Label label={catalog.carName} color="#1A2633" />
                            </h1>
                            <p style={{ color: "#777", marginTop: "8px", fontSize: "clamp(14px, 2vw, 18px)" }}>
                                <Label label="Desde " color="#777" />
                                <strong>
                                    <Label label={`$${catalog.basePrice.toLocaleString()}`} color="#1A2633" />
                                </strong>
                            </p>
                        </div>

                        <div style={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            padding: "24px",
                            minWidth: "220px",
                            maxWidth: "300px",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            backgroundColor: "#A9B4C2",
                        }}>
                            <p style={{ fontWeight: 600, color: "#1A2633", fontSize: "15px", margin: 0, textAlign: "center" }}>
                                <Label label="Contáctanos" color="#1A2633" />
                            </p>

                            <ButtonIcon
                                label="WhatsApp"
                                color="#EEF1EF"
                                backgroundColor="#25D366"
                                hoverColor="#1ebe57"
                                className="btn w-100"
                                style={{ borderRadius: "4px", padding: "10px 0" }}
                                icon={
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                }
                                onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`, "_blank")}
                            />

                            <ButtonIcon
                                label="Cotizar"
                                color="#EEF1EF"
                                backgroundColor="#1A2633"
                                hoverColor="#2C3E50"
                                className="btn w-100"
                                style={{ borderRadius: "4px", padding: "10px 0" }}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-tag" viewBox="0 0 16 16">
                                    <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0" />
                                    <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z" />
                                </svg>}
                                onClick={() => navigate("/quotation", { state: { idCatalog: Number(id) } })}

                            />

                            <ButtonIcon
                                label="Testdrive"

                                color="#1A2633"
                                backgroundColor="#EEF1EF"
                                hoverColor="#A9B4C2 "

                                className="btn w-100"
                                style={{ borderRadius: "4px", padding: "10px 0" }}
                                icon={ <i  className="bi bi-cone-striped"/>}
                                onClick={() => navigate("/testdrive", { state: { carName: catalog.carName } })}

                            />

                            <ButtonIcon
                                label="Comprar"
                                color="#EEF1EF"
                                backgroundColor="#1A2633"
                                hoverColor="#2C3E50"
                                className="btn w-100"
                                style={{ borderRadius: "4px", padding: "10px 0" }}
                                icon={<i className="bi bi-cart2 text-white  " />}
                                onClick={() => navigate("/catalog/client/sales", { state: { idCatalog: catalog.idCatalog } })}
                            />
                        </div>
                    </div>

                    <h2 style={{ color: "#1A2633", fontWeight: 700, marginBottom: "16px", fontSize: "clamp(20px, 3vw, 28px)" }}>
                        <Label label="Colores" color="#1A2633" />
                    </h2>
                    <div className="colors-container" style={{ marginBottom: "32px" }}>
                        {colors.map((color, index) => (
                            <button
                                key={index}
                                className="color-button"
                                style={{ backgroundColor: getColor(color) }}
                                title={color}
                            />
                        ))}
                    </div>

                    <h2 style={{ color: "#1A2633", fontWeight: 700, marginBottom: "16px", fontSize: "clamp(20px, 3vw, 28px)" }}>
                        <Label label="Especificaciones" color="#1A2633" />
                    </h2>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                        gap: "16px",
                        marginBottom: "32px",
                    }}>
                        {specs.map((spec, index) => (
                            <div key={index} style={{
                                backgroundColor: "#EEF1EF",
                                borderRadius: "8px",
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                                border: "1px solid #1A2633",
                            }}>
                                <Icon icon={<i className={spec.icon} style={{ fontSize: "22px", color: "#1A2633" }} />} />
                                <Label label={spec.label} color="#5E6572" />
                                <strong>
                                    <Label label={String(spec.value)} color="#1A2633" />
                                </strong>
                            </div>
                        ))}
                    </div>

                    {catalog.technicalDescription && (
                        <div style={{
                            backgroundColor: "#EEF1EF",
                            borderRadius: "8px",
                            padding: "24px",
                            border: "1px solid #1A2633",
                        }}>
                            <h3 style={{ color: "#1A2633", fontWeight: 600, marginBottom: "12px", fontSize: "18px" }}>
                                <Label label="Descripción técnica" color="#1A2633" />
                            </h3>
                            <Label label={catalog.technicalDescription} color="#555" />
                        </div>
                    )}

                </div>
            </div>

            <Footer />
        </>
    );
};

export default CatalogDetailPage;