import Label from "../atoms/Label";

interface CardProps {
    image: string;
    model: string;
    price: number;
    onCotizar?: () => void;
}

const CardWithButton = ({ image, model, price, onCotizar }: CardProps) => {
    return (
        <div className="card border-0" style={{ width: "11rem" }}>
            <img src={image} className="card-img-top" alt={model} />
            <div
                className="card-body text-center d-flex flex-column"
                style={{ gap: "2px", padding: "8px" }}
            >
                <h6
                    className="card-title"
                    style={{ fontWeight: "bold", marginBottom: "2px", fontSize: "0.8rem" }}
                >
                    <Label label={model} color="#2C3E50" />
                </h6>
                <p className="card-text" style={{ marginBottom: "2px" }}>
                    <Label label="Precio desde" color="#6c757d" />
                    <br />
                    <Label label={`$${price.toLocaleString()}`} color="#6c757d" />
                </p>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onCotizar?.();
                    }}
                    style={{
                        color: "#2C3E50",
                        textDecoration: "none",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                    }}
                >
                    Cotizar
                </a>
            </div>
        </div>
    );
};

export default CardWithButton;