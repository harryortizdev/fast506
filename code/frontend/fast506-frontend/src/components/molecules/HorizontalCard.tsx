import Label from "../atoms/Label";
import "../../index.css";
import { NavLink } from "react-router-dom";

interface HorizontalCardProps {
    image: string;
    title: string;
    description: string;
    to: string;
}

const HorizontalCard = ({ image, title, description, to }: HorizontalCardProps) => {
    return (
        <div
            className="card fast-card-lift "
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#1A2633",
                overflow: "hidden",
                height: "200px"
            }}
        >
            <div style={{ width: "280px", flexShrink: 0 }}>
                <img
                    src={image}
                    alt={title}
                    style={{ width: "100%", objectFit: "fill" }}
                />
            </div>

            <div className="card-body d-flex justify-content-between align-items-center">
                <div className=" ms-3 me-3">
                    <h2 className="fw-bold">
                        <Label label={title} color="#A9B4C2" />
                    </h2>

                    
                    <h4 className="mb-0">
                        <Label label={description} color="#EEF1EF" />
                    </h4>
                </div>

                <NavLink
                    to={to}
                    className="btn btn-outline-light text-nowrap ms-3 fw-bold"
                    style={{ borderRadius: "4px" }}
                >
                    Ver más →
                </NavLink>
            </div>
        </div>
    );
};

export default HorizontalCard;