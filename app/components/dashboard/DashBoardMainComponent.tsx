"use client";

import React, { useCallback, useState } from 'react'
import Overview from './Overview'
import History  from "../transaction/History"
import MonthSelector from '../ui/MonthSelector';
import dayjs from 'dayjs';
import CategoryFinanceOverview from './CategoryFinanceOverview';
import UserMasterBudgetDialog from './UserMasterBudgetDialog';

function DashBoardMainComponent() {
    const [dates, setDates] = useState<{fromDate : string, toDate : string}>({
        fromDate : dayjs().startOf('month').format('YYYY-MM-DD'),
        toDate : dayjs().endOf('month').format('YYYY-MM-DD'),
    });
    console.log("dashboard from data: ",dates)

    const handleMonthChange = useCallback((fromDate: string, toDate: string) => {
        setDates({ fromDate, toDate });
    }, []);

    return (
        <>
            <div className='flex justify-between pt-2'>
                <UserMasterBudgetDialog />
                <MonthSelector onMonthChange={handleMonthChange} />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4'>
                <Overview dates = {dates}/>
                <CategoryFinanceOverview dates={dates}/>
                <History dates = {dates}/>
            </div>
        </>
    )
}

export default DashBoardMainComponent
