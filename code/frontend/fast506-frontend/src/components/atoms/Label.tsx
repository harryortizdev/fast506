interface LabelProps {
  label: string;
  color?: string;
}

const Label = ({ label, color }: LabelProps) => {
  return (
    <label style={{ color }}>
      {label}
    </label>
  );
};

export default Label;