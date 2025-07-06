"use client";

import { colors, Typography } from '@mui/material'
import React from 'react'

interface ExpenseBreakDownData {
    category : string,
    percentage : number,
    color : string
}

interface ExpenseBreakDownMap {
    totalSpent : number | null;
    expenseBreakdownData: ExpenseBreakDownData[];
}

interface ExpenseBreakdownProps {
    expenseBreakdown: ExpenseBreakDownMap;
}

function ExpenseBreakdown( { expenseBreakdown } :  ExpenseBreakdownProps) {
    const { totalSpent, expenseBreakdownData } = expenseBreakdown

    return (
        <div className='flex bg-white flex-col p-6 rounded-sm shadow'>
            <Typography variant='h2' sx={{ font:'revert', paddingBottom:'1rem' }}>Expense Breakdown</Typography>
            <Typography sx={{ color:'gray' }}>Where your money grows</Typography>
            <div className='flex w-full justify-center'>
                <div className='flex justify-center items-center w-35 h-35 rounded-full border-2'>
                    <div>
                        <Typography variant='h5'>${ totalSpent }</Typography>
                        <Typography variant='caption' sx={{ color:'gray' }}>Total Spent</Typography>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-around flex-1'>
                {expenseBreakdownData.length > 0 && expenseBreakdownData.map((item : any, index : number) => (
                    <div key={index} className='flex justify-between items-center w-full p-1'>
                        <div className='flex items-center gap-2'>
                            <div className='w-3 h-3 rounded-full' style={{ backgroundColor : item.color }}></div>
                            <Typography variant='body2'>{ item.category }</Typography>
                        </div>
                        <Typography variant='body2'>{ item.percentage }%</Typography>
                    </div>
                ))}
                { expenseBreakdownData.length == 0 && 
                    <Typography variant="h5" align="center" alignItems='center' paddingTop='2rem'>No data found</Typography>
                }
            </div>
    </div>
    )
}

export default ExpenseBreakdown
