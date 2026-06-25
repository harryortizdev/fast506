import Input from "../atoms/Input";
import Label from "../atoms/Label";

interface FormFieldProps {
  label: string;
  labelColor?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  inputClassName?: string;
}

const FormField = ({ label, labelColor, name, value, onChange, onBlur, placeholder, type, disabled, inputClassName }: FormFieldProps) => {
  return (
    <div>
      <Label label={label} color={labelColor} />
      <Input
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        className={inputClassName}
      />
    </div>
  );
};

export default FormField;