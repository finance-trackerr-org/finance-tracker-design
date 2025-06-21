"use client";

import React from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { map } from 'zod';
import { Typography } from '@mui/material';

function IsValidNumber(current_value: any, previous_value: any) {
    const isValid = typeof current_value === 'number' && typeof previous_value === 'number';

    const value_diff = (current_value != null && previous_value != null && isValid)
        ? current_value - previous_value
        : '-';

    let value_achieved: boolean | string = '-';
    if (value_diff !== '-') value_achieved = value_diff > 0;

    return [value_diff, value_achieved];
}


function Overview() {
    const finance_overview = {
        balance: 125630.90,
        previous_balance: 1050.50,
        income: '-',
        previous_income: 6500.0,
        expense: 3680.50,
        previous_expense: '-',
        upcoming_bill_days:7,
        upcoming_bills : 2350.0
    };

    const [balance_diff, balance_achieved] = IsValidNumber(finance_overview.balance, finance_overview.previous_balance);
    const [expense_diff, expense_achieved] = IsValidNumber(finance_overview.expense, finance_overview.previous_expense);
    const [income_diff, income_achieved] = IsValidNumber(finance_overview.income, finance_overview.previous_income);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-2 gap-4'>
            <div className='bg-white rounded-xl pt-4 p-6 shadow flex flex-col justify-between min-w-[12rem]'>
                <div className='flex justify-between w-full'>
                    <Typography variant="subtitle1" sx={{ color: 'gray', display:'flex', alignItems:'end' }} >Total Balance</Typography>
                    <div className='bg-blue-700 text-white p-2 rounded-md'>
                        <MonetizationOnIcon fontSize='large'/>
                    </div>
                </div>
                <Typography variant='h5' className='font-black'>${ finance_overview.balance }</Typography>
                {balance_achieved!='-' && <div className='flex items-center mt-3 text-sm'>
                    { balance_achieved ? <TrendingUpIcon className='text-green-500' fontSize='small' /> : <TrendingDownIcon className='text-red-500' fontSize='small'/> }
                    <Typography className={balance_achieved ? "text-green-500 ml-1" : "text-red-500 ml-1"}>{ balance_diff }</Typography>
                </div>}
                {balance_achieved=='-' && <div className='flex items-center mt-2 text-sm'>
                    <Typography>{ balance_diff }</Typography>
                </div>}
            </div>
            <div className='bg-white rounded-xl pt-4 p-6 shadow flex flex-col justify-between min-w-[12rem]'>
                <div className='flex justify-between w-full'>
                    <Typography variant="subtitle1" sx={{ color: 'gray', display:'flex', alignItems:'end' }}>Total Expenses</Typography>
                    <div className='bg-red-700 text-white p-2 rounded-md'>
                        <TrendingUpIcon />
                    </div>
                </div>
                <Typography variant='h5' className='font-black'>${ finance_overview.expense }</Typography>
                { expense_achieved!='-' && <div className='flex items-center mt-3 text-sm'>
                    { expense_achieved ? <TrendingUpIcon className='text-green-500' fontSize='small' /> : <TrendingDownIcon className='text-red-500' fontSize='small'/> }
                    <Typography className={expense_achieved ? "text-green-500 ml-1" : "text-red-500 ml-1"}>{ expense_diff }</Typography>
                </div>}
                { expense_achieved=='-' && <div className='flex items-center mt-2 text-sm'>
                    <Typography>{ expense_diff }</Typography>
                </div>}
            </div>
            <div className='bg-white rounded-xl pt-4 p-6 shadow flex flex-col justify-between min-w-[12rem]'>
                <div className='flex justify-between w-full'>
                    <Typography variant="subtitle1" sx={{ color: 'gray', display:'flex', alignItems:'end' }}>Total Income</Typography>
                    <div className='bg-green-700 text-white p-2 rounded-md'>
                        <TrendingDownIcon />
                    </div>
                </div>
                <Typography variant='h5' className='font-black'>${ finance_overview.income }</Typography>
                {income_achieved!='-' && <div className='flex items-center mt-3 text-sm'>
                    { income_achieved ? <TrendingUpIcon className='text-green-500' fontSize='small' /> : <TrendingDownIcon className='text-red-500' fontSize='small'/> }
                    <Typography className={income_achieved ? "text-green-500 ml-1" : "text-red-500 ml-1"}>{ income_diff }</Typography>
                </div>}
                {income_achieved=='-' && <div className='flex items-center mt-2 text-sm'>
                    <Typography>{ income_diff }</Typography>
                </div>}
            </div>
            <div className='bg-white rounded-xl pt-4 p-6 shadow flex flex-col justify-between min-w-[12rem]'>
                <div className='flex justify-between w-full'>
                    <Typography variant="subtitle1" sx={{ color: 'gray', display:'flex', alignItems:'end' }}>Upcoming Bills</Typography>
                    <div className='bg-purple-700 text-white p-2 rounded-md'>
                        <CreditCardIcon />
                    </div>
                </div>
                <Typography variant='h5' className='font-black'>${ finance_overview.upcoming_bills }</Typography>
                <Typography variant='caption'>Next { finance_overview.upcoming_bill_days } days</Typography>
            </div>
        </div>
    )
}

export default Overview
