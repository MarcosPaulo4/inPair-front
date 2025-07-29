import { StyledTextField } from "@/app/styles/styledComponents/StyledComponents.theme";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  label?: string;
};

export const FormField = <T extends FieldValues>({
  control,
  name,
  type = "text",
  placeholder,
  label
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <StyledTextField
          {...field}
          type={type}
          variant="filled"
          label={label}
          placeholder={placeholder}
          size="small"
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};
