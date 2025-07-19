"use client";

import { IconButton, Typography } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';

function MonthSelector({onMonthChange} : any) {
    const [currentMonth ,setCurrentMonth] = useState(dayjs().startOf('month'));

    useEffect(() => {
        const fromDate = currentMonth.startOf('month').format('YYYY-MM-DD');
        const toDate = currentMonth.endOf('month').format('YYYY-MM-DD');
        onMonthChange(fromDate, toDate);
    }, [currentMonth, onMonthChange]);

    const handlePrev = () => setCurrentMonth(prev => prev.subtract(1, "month"));
    const handleNext = () => setCurrentMonth(prev => prev.add(1, "month"));

    return (
        <div className='flex justify-end items-center'>
            <IconButton onClick={handlePrev} 
                sx={{
                    backgroundColor: '#e0e0e0',
                    borderRadius: '0',
                    '&:hover': {
                        backgroundColor: '#cfcfcf',
                        transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                }}
            >
                <ChevronLeft />
            </IconButton>
            <Typography variant='h6'
                sx={{
                    minWidth: 180,
                    minHeight : 40,
                    textAlign: 'center',
                    fontWeight: 500,
                    fontSize: '1.25rem',
                    color: '#333',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                }}
            >{currentMonth.format('MMMM YYYY')}</Typography>
            <IconButton onClick={handleNext}
                sx={{
                    backgroundColor: '#e0e0e0',
                    borderRadius: '0',
                    '&:hover': {
                        backgroundColor: '#cfcfcf',
                        transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                }}
            >
                <ChevronRight />
            </IconButton>
        </div>
    )
}

export default MonthSelector
