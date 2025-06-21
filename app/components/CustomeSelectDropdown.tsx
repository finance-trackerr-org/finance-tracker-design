import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

interface CustomSelectProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    fullWidth?: boolean;
    placeholder?: string;
}

const CustomSelectDropdown : React.FC<CustomSelectProps> = ({label,value,options,onChange, fullWidth = true, placeholder = "Type to search..."}) => {
    return (
        <Autocomplete
            disablePortal
            options={options}
            value={value}
            onChange={(event,value) => onChange(value || "")}
            sx={{ width: 280, backgroundColor:'white' }}
            renderInput={(params) => 
                <TextField {...params} label={label} placeholder ={placeholder} variant='outlined' />
            }
        />
    )
}

export default CustomSelectDropdown
