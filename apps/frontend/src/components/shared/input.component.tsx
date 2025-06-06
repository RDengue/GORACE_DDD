export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  onChangeValue?: (value: string) => void;
}

export default function Input({
  label,
  error,
  className = "",
  onChangeValue,
  ...props
}: InputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="text-zinc-400">{label}</label>}
      <input
        {...props}
        className={`border border-zinc-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : ""
        }`}
        onChange={(e) => {
          props.onChange?.(e);
          onChangeValue?.(e.target.value);
        }}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
