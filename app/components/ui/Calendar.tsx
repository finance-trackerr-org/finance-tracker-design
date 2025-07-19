"use client";

import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, SxProps } from '@mui/material';
import { Dayjs } from 'dayjs';

interface CustomDatePickerProps {
  label?: string;
  value?: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
  minDate?: Dayjs | null;
  maxDate?: Dayjs | null;
  error? : boolean;
}

const CustomDatePicker = ({ label, value, onChange, minDate, maxDate,error=false }: CustomDatePickerProps) => {
    return (
        <DatePicker 
        label={label}
        value={value}
        onChange={onChange}
        minDate={minDate ?? undefined}
        maxDate={maxDate ?? undefined}
        sx={{
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black !important',
            },
            '&.Mui-error fieldset': {
                borderColor: 'black !important',
            },
            },
        }}
        slotProps={{
            textField: {
            error : error,
            fullWidth: true,
            sx: {
                backgroundColor: 'white',
                '& .MuiFormLabel-root.Mui-error': {
                color: 'gray',
                },
            },
            },
        }}
        />
    );
};

export default CustomDatePicker;
