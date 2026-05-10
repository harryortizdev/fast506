interface ButtonNew {
  label: string;
  onClick: () => void;
}

const ButtonNew = ({ label, onClick }: ButtonNew) => {
  return (
    <button
      className="btn mb-3"
      style={{ backgroundColor: "#5E6572 ", color: "#EEF1EF ", border: "none" }}
      onClick={onClick}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2C3E50")}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#5E6572 ")}
    >
      {label} <i className="bi bi-plus-circle-fill"></i>
    </button>
  );
};

export default ButtonNew;