import { Ad } from "../../models/Ad";

interface CarouselForAdsProps {
    ads: Ad[],
    id: string;
}

const CarouselForAds = ({ ads, id }: CarouselForAdsProps) => {
    if (!ads || ads.length === 0) {
        return (
            <div className="text-center p-4 bg-light rounded shadow-sm">
                <p className="mb-0 text-muted">No hay anuncios disponibles en este momento.</p>
            </div>
        );
    }

    return (
        <div
            id={id}
            className="carousel slide  mx-auto my-3 shadow rounded "
            data-bs-ride="carousel"
            style={{ maxWidth: "900px", overflow: "hidden" }}
        >

            <div className="carousel-indicators" style={{ filter: "invert(1) brightness(0)" }}>
                {ads.map((_, index) => (
                    <button
                        key={`indicator-${index}`}
                        type="button"
                        data-bs-target={`#${id}`}
                         data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="carousel-inner">
                {ads.map((item, index) => {
                    const imageUrl = item.image?.startsWith("http")
                        ? item.image
                        : `http://localhost:8080/${item.image}`;

                    return (
                        <div
                            key={item.idAd || `slide-${index}`}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                            <img
                                src={imageUrl}
                                className="d-block w-100"
                                alt={item.title}
                                style={{
                                    height: "550px", // Altura fija idéntica para todas las imágenes
                                    objectPosition: "center" //foco del recorte
                                }}
                            />

                        </div>
                    );
                })}
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" style={{ filter: "invert(1)" }}></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" style={{ filter: "invert(1)" }}></span>
                <span className="visually-hidden">Next</span>
            </button>

        </div>
    );
};

export default CarouselForAds;