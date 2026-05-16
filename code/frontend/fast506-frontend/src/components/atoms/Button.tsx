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
}

const Button = ({
  label,
  color,
  onClick,
  backgroundColor,
  hoverColor,
  className,
  style
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
      onMouseEnter={e =>
        (e.currentTarget.style.backgroundColor = hoverColor ?? "#2C3E50")
      }
      onMouseLeave={e =>
        (e.currentTarget.style.backgroundColor = backgroundColor ?? "#5E6572")
      }
    >
      <div className="d-flex align-items-center justify-content-center gap-2">
        <Label label={label} color={color} />
      </div>
    </button>
  );
};

export default Button;