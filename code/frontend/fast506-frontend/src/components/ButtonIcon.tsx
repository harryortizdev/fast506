interface ButtonIconProps {
  label: string;
  onClick: () => void;
  icon: string; // Nueva propiedad para el símbolo
}

const ButtonIcon = ({ label, onClick, icon }: ButtonIconProps) => {
  return (
    <button
      className="btn mb-3"
      style={{ backgroundColor: "#5E6572 ", color: "#EEF1EF ", border: "none" }}
      onClick={onClick}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2C3E50")}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#5E6572 ")}
    >
      {label} <i className={`bi ${icon}`}></i>
    </button>
  );
};

export default ButtonIcon;