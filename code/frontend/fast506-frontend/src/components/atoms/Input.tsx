        interface InputProps {
        name: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
        placeholder?: string;
        type?: string;
        disabled?: boolean;
        className?: string;
        }

        const Input = ({ name, value, onChange, onBlur, placeholder, type = "text", disabled, className }: InputProps) => {
        return (
            <input
            className={`form-control ${className || ""}`.trim()}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            />
        );
        };

        export default Input;