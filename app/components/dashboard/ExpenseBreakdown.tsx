"use client";

import { colors, Typography } from '@mui/material'
import React from 'react'

function ExpenseBreakdown() {
    const total_spent = 2360
    const expense_breakdown = [
        {
            category : 'Housing',
            value : 35,
            color : '#3B82F6'
        },
        {
            category : 'Food',
            value : 25,
            color : '#22C55E'
        },
        {
            category : 'Transportation',
            value : 15,
            color : '#EAB308'
        },
        {
            category : 'Entertainment',
            value : 12,
            color : '#A855F7'
        },
        {
            category : 'Utilities',
            value : 5,
            color : '#EF4444'
        }
    ]
    return (
        <div className='flex bg-white flex-col p-6 rounded-sm shadow'>
            <Typography variant='h2' sx={{ font:'revert', paddingBottom:'1rem' }}>Expense Breakdown</Typography>
            <Typography sx={{ color:'gray' }}>Where your money grows</Typography>
            <div className='flex w-full justify-center'>
                <div className='flex justify-center items-center w-35 h-35 rounded-full border-2'>
                    <div>
                        <Typography variant='h5'>${ total_spent }</Typography>
                        <Typography variant='caption' sx={{ color:'gray' }}>Total Spent</Typography>
                    </div>
                </div>
            </div>
            {expense_breakdown.map((item : any, index : number) => (
                <div key={index} className='flex justify-between items-center w-full p-1'>
                    <div className='flex items-center gap-2'>
                        <div className='w-3 h-3 rounded-full' style={{ backgroundColor : item.color }}></div>
                        <Typography variant='body2'>{ item.category }</Typography>
                    </div>
                    <Typography variant='body2'>{ item.value }%</Typography>
                </div>
            ))}
    </div>
    )
}

export default ExpenseBreakdown
