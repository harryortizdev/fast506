        interface InputProps {
        name: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        placeholder?: string;
        type?: string;
        disabled?: boolean;
        }

        const Input = ({ name, value, onChange, placeholder, type = "text", disabled }: InputProps) => {
        return (
            <input
            className={`form-control`}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            />
        );
        };

        export default Input;