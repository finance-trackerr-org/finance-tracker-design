"use client";

import React, { useCallback, useState } from 'react'
import Overview from './Overview'
import History  from "../transaction/History"
import MonthSelector from '../MonthSelector';
import dayjs from 'dayjs';
import CategoryFinanceOverview from './CategoryFinanceOverview';

function DashBoardMainComponent() {
    const [dates, setDates] = useState<{fromDate : string, toDate : string}>({
        fromDate : dayjs().startOf('month').format('YYYY-MM-DD'),
        toDate : dayjs().endOf('month').format('YYYY-MM-DD'),
    });

    const handleMonthChange = useCallback((fromDate: string, toDate: string) => {
        setDates({ fromDate, toDate });
    }, []);

    return (
        <>
            <MonthSelector onMonthChange={handleMonthChange} />
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4'>
                <Overview dates = {dates}/>
                <CategoryFinanceOverview dates={dates}/>
                <History />
            </div>
        </>
    )
}

export default DashBoardMainComponent
