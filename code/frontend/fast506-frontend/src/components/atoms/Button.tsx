import Label from "../atoms/Label";
import React from "react";

interface ButtonProps {
  label: string;
  color?: string;
  onClick: () => void;
  backgroundColor?: string;
  hoverColor?: string;
  className: string;
  style?: React.CSSProperties;
  disabled?: boolean; // <-- 1. Agregado a la interfaz como opcional
}

const Button = ({
  label,
  color,
  onClick,
  backgroundColor,
  hoverColor,
  className,
  style,
  disabled = false // <-- 2. Recibido aquí con un valor por defecto
}: ButtonProps) => {
  return (
    <button
      className={className}
      style={{
        backgroundColor,
        border: "none",
        ...style
      }}
      onClick={onClick}
      disabled={disabled} 
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = hoverColor ?? "#2C3E50";
        }
      }}
      onMouseLeave={e => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = backgroundColor ?? "#5E6572";
        }
      }}
    >
      <div className="d-flex align-items-center justify-content-center gap-2">
        <Label label={label} color={color} />
      </div>
    </button>
  );
};

export default Button;