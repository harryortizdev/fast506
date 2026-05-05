interface ButtonNew{
  label: string;
  onClick: () => void;
}

const ButtonNew = ({ label, onClick }: ButtonNew) => {
  return (
    <button className="btn btn-primary mb-3" onClick={onClick}>
      + {label}
    </button>
  );
};

export default ButtonNew;