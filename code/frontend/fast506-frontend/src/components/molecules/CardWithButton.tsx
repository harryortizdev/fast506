import Label from "../atoms/Label";
import Image from "../atoms/Image";
import { useNavigate } from "react-router-dom";
import { key } from "ionicons/icons";


interface CardProps {
    image: string;
    model: string;
    price: number;
    onCotizar?: () => void;
}


const CardWithButton = ({ image, model, price, onCotizar }: CardProps) => {
    const navigate = useNavigate();

    return (
        <div className="card border-0" style={{ width: "11rem", backgroundColor: "#EEF1EF" }}>
            <img
                src={image}
                className="card-img-top"
                alt={model}
                style={{ objectFit: "contain", height: "100px" }}
            />
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
                    onClick={onCotizar}

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