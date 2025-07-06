'use client';

import React from 'react'
import { Typography, LinearProgress } from '@mui/material';

interface BudgetOverviewData {
    category : string,
    spent : number,
    budget : number,
    color : string
}

interface BudgetOverviewProps {
    budgetOverviewData: BudgetOverviewData[];
}

function BudgetOverview(props  : BudgetOverviewProps) {
    const { budgetOverviewData } = props
    const categoryOverview : any = []

    for (let data of budgetOverviewData) {
        const budget = typeof(data['budget']) == 'number' ? data['budget'] : null
        const spent = typeof(data['spent']) == 'number' ? data['spent'] : null
        const progress = (budget !== null && spent !== null && spent!==0) ? (spent > budget ? 100 : (spent / budget * 100)) : 0
        const categoryOverviewData = {
            progress : progress.toFixed(0),
            spent : data.spent != null ? data.spent : '-',
            budget : data.budget != null ? data.budget : '-',
            category : data['category'],
            color : data['color'],
        }
        categoryOverview.push(categoryOverviewData)
    }

    return (
        <div className='bg-white rounded-lg p-5'>
            <Typography variant='h2' sx={{ font:'revert' }}>Budget Overview</Typography>
            <div className='flex mt-5 justify-between mb-2'>
                <Typography variant='subtitle2' sx={{ color:'gray' }}>Monthly Budget</Typography>
                <div className='flex gap-4'>
                    <div className='flex gap-2 align-middle'>
                        <div className='w-[1rem] h-[1rem] bg-blue-200 rounded-full'></div>
                        <Typography variant='caption' sx={{ color:'gray' }}>Budget</Typography>
                    </div>
                    <div className='flex gap-2 align-middle'>
                        <div className='w-[1rem] h-[1rem] bg-blue-500 rounded-full'></div>
                        <Typography variant='caption' sx={{ color:'gray' }}>Spent</Typography>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-around flex-1'>
                {categoryOverview.length > 0 && categoryOverview.map((list : any) => (
                    <div className='flex flex-col mb-3' key={list.category}>
                        <div className='flex justify-between'>
                            <Typography fontWeight='semi-bold'>{list.category}</Typography>
                            <Typography color='text.secondary'>${list.spent.toLocaleString()} / ${list.budget.toLocaleString()}</Typography>
                        </div>
                        <LinearProgress 
                            variant='determinate'
                            value = {list.progress}
                            sx={{
                                height: 6,
                                borderRadius : 5,
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 5,
                                    backgroundColor: list.color
                                },
                                backgroundColor:'#DBEAFE',
                            }}
                        />
                    </div>
                ))}
                { categoryOverview.length == 0 && 
                    <Typography variant="h5" align="center" paddingTop='2rem'>No data found</Typography>
                }
            </div>
        </div>
    )
}

export default BudgetOverview
