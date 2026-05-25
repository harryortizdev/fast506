import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Catalog } from "../../models/Catalog";
import { getAll } from "../../services/CatalogService";
import Label from "../atoms/Label";
import Image from "../atoms/Image";

const Carousel = () => {
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAll();
                setCatalogs(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const settings = {
        infinite: true,
        centerMode: true,
        centerPadding: "420px",
        slidesToShow: 1,
        speed: 500,
        arrows: true,
        dots: true,
        beforeChange: (_: number, next: number) => {
            setActiveSlide(next);
        },
        responsive: [
            { breakpoint: 1440, settings: { centerPadding: "320px" } },
            { breakpoint: 1200, settings: { centerPadding: "220px" } },
            { breakpoint: 992, settings: { centerPadding: "140px", arrows: false } },
            { breakpoint: 768, settings: { centerPadding: "60px", arrows: false } },
            { breakpoint: 576, settings: { centerPadding: "20px", arrows: false } },
        ],
    };

    return (
        <div
            style={{
                width: "100%",
                padding: "40px 0 100px 0",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#EEF1EF ",
            }}
        >
            <Slider {...settings}>
                {catalogs.map((catalog, index) => {
                    const isActive = index === activeSlide;
                    const isHovered = hoveredId === catalog.idCatalog;

                    return (
                        <div key={catalog.idCatalog}>
                            <div style={{ position: "relative", height: "520px" }}>


                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "260px",
                                        marginTop: "20px",
                                        position: "relative",
                                        cursor: isActive ? "pointer" : "default",
                                    }}
                                    onMouseEnter={() => isActive && setHoveredId(catalog.idCatalog)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => isActive && navigate(`/catalog/detail/${catalog.idCatalog}`)}
                                >
                                    <Image
                                        src={`http://localhost:8080/${catalog.image}`}
                                        alt={catalog.carName}
                                        style={{
                                            width: isActive ? "min(540px, 90vw)" : "min(320px, 70vw)",
                                            opacity: isActive ? 1 : 0.25,
                                            transition: "all 0.4s ease",
                                            objectFit: "contain",
                                            filter: isActive ? "none" : "grayscale(20%)",
                                        }}
                                    />

                                    {isActive && isHovered && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "8px",
                                                transition: "0.3s",
                                            }}
                                        >
                                            <button
                                                style={{
                                                    backgroundColor: "#1A2633",
                                                    color: "#fff",
                                                    border: "none",
                                                    padding: "12px 36px",
                                                    borderRadius: "4px",
                                                    fontSize: "15px",
                                                    fontWeight: 500,
                                                    cursor: "pointer",
                                                    letterSpacing: "0.5px",
                                                }}
                                            >
                                                Ver detalle
                                            </button>
                                        </div>
                                    )}
                                </div>


                                {isActive && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "260px",
                                            left: 0,
                                            width: "100%",
                                            textAlign: "center",
                                            padding: "0 20px",
                                        }}
                                    >
                                        <h2
                                            style={{
                                                fontSize: window.innerWidth < 768 ? "28px" : "38px",
                                                fontWeight: 700,
                                                color: "#2C3E50",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <Label label={catalog.carName} color="#2C3E50" />
                                        </h2>

                                         <p style={{ marginBottom: "10px" }}>
                                            <Label
                                                label={String(catalog.yearManufacture)}
                                                color="#5E6572 "
                                            />
                                        </p>

                                        <p style={{ marginBottom: "10px" }}>
                                            <Label
                                                label={catalog.transmission + " - " + catalog.fuelType}
                                                color="#5E6572 "
                                            />
                                        </p>
                                       
                                        <p style={{ marginBottom: "10px" }}>
                                            <Label
                                                label="Precio desde"
                                                color="#5E6572 "
                                            />
                                        </p>

                                        <h3
                                            style={{
                                                fontWeight: 500,
                                                marginBottom: "25px",
                                                fontSize: window.innerWidth < 768 ? "22px" : "28px",
                                            }}
                                        >
                                            <Label
                                                label={`$${catalog.basePrice.toLocaleString()}`}
                                                color="#555"
                                            />
                                        </h3>

                                        <button
                                            style={{
                                                backgroundColor: "#5E6572",
                                                color: "#fff",
                                                border: "none",
                                                padding: window.innerWidth < 768 ? "10px 40px" : "12px 80px",
                                                borderRadius: "3px",
                                                fontSize: window.innerWidth < 768 ? "14px" : "16px",
                                                cursor: "pointer",
                                                transition: "0.3s",
                                            }}
                                        >
                                            Cotizar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </Slider>

            <style>{`
                .slick-list { overflow: visible !important; }
                .slick-track { display: flex; align-items: center; }
                .slick-slide { transition: all 0.4s ease; }
                .slick-prev { left: 50px; z-index: 20; }
                .slick-next { right: 50px; z-index: 20; }
                .slick-prev:before, .slick-next:before { color: #5E6572; font-size: 38px; }
                .slick-dots { bottom: -55px; }
                .slick-dots li button:before { color: #5E6572; opacity: 1; font-size: 11px; }
                .slick-dots li.slick-active button:before { color: #2C3E50; }
                @media (max-width: 992px) { .slick-prev, .slick-next { display: none !important; } }
                @media (max-width: 768px) { .slick-dots { bottom: -40px; } }
            `}</style>
        </div>
    );
};

export default Carousel;