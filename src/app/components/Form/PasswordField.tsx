import { StyledTextField } from "@/app/styles/styledComponents/StyledComponents.theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type PasswordFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
};


export const PasswordField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder
}: PasswordFieldProps<T>) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <StyledTextField
          {...field}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          size="small"
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};
