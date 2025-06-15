import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormInputProps {
    control: any
    name: string
    label: string
    placeholder: string
    type?: string
}

export function FormInput({ control, name, label, placeholder, type = "text" }: FormInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
            <TextField
                {...field}
                fullWidth
                type={type}
                label={label}
                placeholder={placeholder}
                variant="standard"
                margin="normal"
                error={!!error}
                helperText={error ? error.message : ""}
            />
            )}
        />
    );
}
