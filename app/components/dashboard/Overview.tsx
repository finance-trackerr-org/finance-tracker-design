"use client";

import React, { useEffect, useState } from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Typography } from '@mui/material';

import { fetchFinanceOverview } from '@/lib/api/transaction';
import { useSnackbarQueue } from '@/app/hooks/useSnackbarQueue';

interface FinanceOverview {
    income : number | null;
    previous_income : number | null;
    balance : number | null;
    previous_balance : number | null;
    expense : number | null;
    previous_expense  : number | null;
    upcoming_bill_days : number | null;
    upcoming_bills : number | null;
}

interface DateProps {
    dates : {fromDate : string, toDate : string}
}

function IsValidNumber(current_value: any, previous_value: any) {
    const isValid = typeof current_value === 'number' && typeof previous_value === 'number';

    const value_diff = (current_value != null && previous_value != null && isValid)
        ? current_value - previous_value
        : '-';

    let value_achieved: boolean | string = '-';
    if (value_diff !== '-') value_achieved = value_diff > 0;

    return [value_diff, value_achieved];
}

function Overview({dates} : DateProps) {
    const finance_overview_default = {
        balance: null,
        previous_balance: null,
        income: null,
        previous_income: null,
        expense: null,
        previous_expense: null,
        upcoming_bill_days:null,
        upcoming_bills : null
    };
    console.log("overview dates : ",dates)

    const [overviewData, setOverviewData] = useState<FinanceOverview>(finance_overview_default);

    const { enqueueSnackbar, SnackbarRenderer } = useSnackbarQueue();

    async function fetchOverview(fromDate : string, toDate : string, userId : string | null) {
        try{
            const requestBody : any = {
                userId : userId,
                fromDate : fromDate,
                toDate : toDate
            }
            console.log("request===",requestBody)
            const res : any = await fetchFinanceOverview(requestBody)
            if(res.status != 'OK'){
                enqueueSnackbar({ severity: 'error', message: res.message });
                if(res.errors){
                    if(typeof res.errors == 'string') {
                        enqueueSnackbar({ severity: 'error', message: res.errors });
                    }else{
                        for(let error of res.errors){
                            enqueueSnackbar({ severity: 'error', message: error });
                    }
                }
            }
            setOverviewData(finance_overview_default)
        }else{
            enqueueSnackbar({ severity: 'success', message: res.message });
            setOverviewData(res.data)
        }
        }catch(err : any){
            enqueueSnackbar({ severity: 'error', message: 'Something went wrong' });
        }
    }

    useEffect(() => {
        fetchOverview(dates.fromDate,dates.toDate,localStorage.getItem('userId'))
    },[dates])

    const [balance_diff, balance_achieved] = IsValidNumber(overviewData.balance, overviewData.previous_balance);
    const [expense_diff, expense_achieved] = IsValidNumber(overviewData.expense, overviewData.previous_expense);
    const [income_diff, income_achieved] = IsValidNumber(overviewData.income, overviewData.previous_income);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-2 gap-4'>
            <div className='bg-white rounded-xl pt-4 p-6 shadow flex flex-col justify-between min-w-[12rem]'>
                <div className='flex justify-between w-full'>
                    <Typography variant="subtitle1" sx={{ color: 'gray', display:'flex', alignItems:'end' }} >Total Balance</Typography>
                    <div className='bg-blue-700 text-white p-2 rounded-md'>
                        <MonetizationOnIcon fontSize='large'/>
                    </div>
                </div>
                <Typography variant='h5' className='font-black'>${ overviewData.balance }</Typography>
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
                <Typography variant='h5' className='font-black'>${ overviewData.expense }</Typography>
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
                <Typography variant='h5' className='font-black'>${ overviewData.income }</Typography>
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
                <Typography variant='h5' className='font-black'>${ overviewData.upcoming_bills }</Typography>
                <Typography variant='caption'>Next { overviewData.upcoming_bill_days } days</Typography>
            </div>
            <SnackbarRenderer />
        </div>
    )
}

export default Overview
