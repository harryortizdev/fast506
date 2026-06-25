import Label from "../atoms/Label";
import Icon from "../atoms/Icon";
import React from "react";

interface ButtonIconProps {
  label: string;
  color?: string;
  onClick: () => void;
  backgroundColor?: string;
  hoverColor?: string;
  icon: React.ReactNode;
  className: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const ButtonIcon = ({
  label,
  color,
  onClick,
  backgroundColor,
  hoverColor,
  icon,
  className,
  style,
  disabled = false,
}: ButtonIconProps) => {
  return (
    <button
      className={className}
      style={{
        backgroundColor,
        border: "none",
        ...style
      }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={e => {
        if (disabled) return;
        e.currentTarget.style.backgroundColor = hoverColor ?? "#2C3E50";
      }}
      onMouseLeave={e => {
        if (disabled) return;
        e.currentTarget.style.backgroundColor = backgroundColor ?? "#5E6572";
      }}
    >
      <div className="d-flex align-items-center justify-content-center gap-2">
        <Icon icon={icon} />
        <Label label={label} color={color} />
      </div>
    </button>
  );
};

export default ButtonIcon;