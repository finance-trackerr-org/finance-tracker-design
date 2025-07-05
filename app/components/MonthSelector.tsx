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
    const handleNext = () => setCurrentMonth(prev => prev.subtract(1, "month"));

    return (
        <div className='flex justify-end items-center'>
            <IconButton onClick={handlePrev} sx={{ backgroundColor:'gray', }} >
                <ChevronLeft />
            </IconButton>
            <Typography variant='h6' sx={{ minWidth: 180, minHeight:40, textAlign: 'center', backgroundColor:'white' }}>{currentMonth.format('MMMM YYYY')}</Typography>
            <IconButton onClick={handleNext} >
                <ChevronRight />
            </IconButton>
        </div>
    )
}

export default MonthSelector
