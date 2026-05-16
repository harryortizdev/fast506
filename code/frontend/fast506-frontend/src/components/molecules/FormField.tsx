import Input from "../atoms/Input";
import Label from "../atoms/Label";

interface FormFieldProps {
  label: string;
  labelColor?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

const FormField = ({ label, labelColor, name, value, onChange, placeholder, type, disabled }: FormFieldProps) => {
  return (
    <div>
      <Label label={label} color={labelColor} />
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
      />
    </div>
  );
};

export default FormField;