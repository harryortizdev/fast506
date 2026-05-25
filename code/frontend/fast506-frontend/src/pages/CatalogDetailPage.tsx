import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Catalog } from ".././models/Catalog";
import { getCatalogById } from ".././services/CatalogService";

const CatalogDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [catalog, setCatalog] = useState<Catalog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getCatalogById(Number(id))
                .then(setCatalog)
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div className="spinner-border" style={{ color: "#1A2633" }} />
            </div>
        );
    }

    if (!catalog) return null;

    const whatsappNumber = "50600000000"; // ← cambia por tu número
    const whatsappMsg = encodeURIComponent(`Hola, me interesa el ${catalog.carName}`);

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>

            {/* Imagen full screen */}
            <div
                style={{
                    width: "100%",
                    height: "clamp(280px, 60vw, 680px)",
                    overflow: "hidden",
                    backgroundColor: "#f5f5f5",
                }}
            >
                <img
                    src={`http://localhost:8080/${catalog.image}`}
                    alt={catalog.carName}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Info + contacto */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "24px",
                    padding: "clamp(20px, 4vw, 48px) clamp(20px, 6vw, 80px)",
                }}
            >
                {/* Nombre y precio */}
                <div>
                    <h1
                        style={{
                            fontSize: "clamp(24px, 4vw, 42px)",
                            fontWeight: 700,
                            color: "#1A2633",
                            margin: 0,
                        }}
                    >
                        {catalog.carName}
                    </h1>
                    <p style={{ color: "#777", marginTop: "8px", fontSize: "clamp(14px, 2vw, 18px)" }}>
                        Precio desde{" "}
                        <strong style={{ color: "#1A2633" }}>
                            ${catalog.basePrice.toLocaleString()}
                        </strong>
                    </p>
                </div>

                {/* Cuadro de contacto */}
                <div
                    style={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        padding: "24px",
                        minWidth: "220px",
                        maxWidth: "300px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}
                >
                    <p
                        style={{
                            fontWeight: 600,
                            color: "#1A2633",
                            fontSize: "15px",
                            margin: 0,
                            textAlign: "center",
                        }}
                    >
                        Contáctanos
                    </p>

                    <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            backgroundColor: "#25D366",
                            color: "#fff",
                            borderRadius: "4px",
                            padding: "10px 0",
                            textDecoration: "none",
                            fontWeight: 500,
                            fontSize: "14px",
                            transition: "0.3s",
                        }}
                    >
       
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                    </a>

      
                    <button
                        style={{
                            backgroundColor: "#1A2633",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "10px 0",
                            fontWeight: 500,
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "0.3s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2C3E50")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1A2633")}
                        onClick={() => console.log(`Cotizar: ${catalog.carName}`)}
                    >
                        Cotizar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CatalogDetailPage;