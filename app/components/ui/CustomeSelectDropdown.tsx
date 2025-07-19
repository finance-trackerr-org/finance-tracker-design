import { Autocomplete, TextField, TextFieldVariants } from '@mui/material'
import React from 'react'

interface CustomSelectProps {
    value: string;
    options: string[];
    onChange: (value: string) => void;
    variant : TextFieldVariants;
    error?:boolean;
    label?: string;
    fullWidth?: boolean;
    placeholder?: string;
}

const CustomSelectDropdown : React.FC<CustomSelectProps> = ({label,value,options,onChange,variant,error=false, fullWidth = true, placeholder = "Select a field..."}) => {
    return (
        <Autocomplete
            disablePortal
            options={options}
            value={value}
            onChange={(event,value) => onChange(value || "")}
            sx={{ width: 280, backgroundColor:'white' }}
            fullWidth = {fullWidth}
            renderInput={(params) => 
                <TextField {...params} label={label} placeholder ={placeholder} variant={variant} error={error} />
            }
        />
    )
}

export default CustomSelectDropdown
