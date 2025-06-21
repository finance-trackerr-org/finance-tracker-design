"use client"

import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface CalendarProps {
    startDate : Dayjs | null;
    endDate  : Dayjs | null;
    setStartDate : (value : Dayjs | null) => void;
    setEndDate : (value : Dayjs | null) => void;
    minDate?: Dayjs | null;
    maxDate?: Dayjs | null;
}

function Calendar({startDate, endDate, setStartDate, setEndDate, minDate, maxDate} : CalendarProps) {

    const today = dayjs();
    const minSelectedDate = today.subtract(3, 'month');

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display="flex" alignItems="center" gap={2}>
        <DatePicker
            label="Start Date"
            value={startDate}
            minDate={minDate || minSelectedDate}
            maxDate={endDate || today}
            onChange={(startDate) => setStartDate(startDate)}
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
                fullWidth: true,
                sx: {
                    backgroundColor: 'white',
                    '& .MuiFormLabel-root.Mui-error': {
                        color: 'gray',
                    }
                },
                },
            }}
        />
        <DatePicker
            label="End Date"
            value={endDate}
            minDate={startDate || minSelectedDate}
            maxDate={maxDate || today}
            onChange={(endDate) => setEndDate(endDate)}
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
                fullWidth: true,
                sx: {
                    backgroundColor: 'white',
                    borderColor : 'black', 
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1e40af', // Blue border on focus
                    },
                    '& .MuiFormLabel-root.Mui-error': {
                        color: 'gray',
                    }
                },
                },
            }}
        />
    </Box>
    </LocalizationProvider>
  );
}

export default Calendar;
