import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type TInput<TFieldValue extends FieldValues> = {
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  register: UseFormRegister<TFieldValue>;
  placeholder: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  formText?: string;
  success?: string;
};

const Input = <TFieldValue extends FieldValues>({
  label,
  name,
  type = "string",
  register,
  onBlur,
  error,
  placeholder,
  formText,
  success,
}: TInput<TFieldValue>) => {
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    // this way to not override on register in the input element
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <div className=" mb-5">
      <label className="block text-blue-500 mb-1">{label}</label>
      <input
        type={type}
        className={error ? "form-input-error" : "form-input"}
        placeholder={placeholder}
        {...register(name)}
        onBlur={onBlurHandler}
        disabled={formText ? true : false}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {formText && <p className="text-sm text-blue-500">{formText}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
    </div>
  );
};

export default Input;
