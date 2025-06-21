'use client';

import React from 'react'
import { Typography, LinearProgress } from '@mui/material';

function BudgetOverview() {
    const categories_overview : any = [
        {
            category : 'Housing',
            spent : 1200,
            budget : 1600,
            color : '#3B82F6'
        },
        {
            category : 'Food',
            spent : 400,
            budget : 800,
            color : '#22C55E'
        },
        {
            category : 'Transportation',
            spent : 200,
            budget : 500,
            color : '#EAB308'
        },
        {
            category : 'Entertainment',
            spent : null,
            budget : 400,
            color : '#A855F7'
        },
        {
            category : 'Utilities',
            spent : null,
            budget : null,
            color : '#EF4444'
        }
    ]

    for (let data of categories_overview) {
        const budget = typeof(data['budget']) == 'number' ? data['budget'] : null
        const spent = typeof(data['spent']) == 'number' ? data['spent'] : null
        const progress = (budget !== null && spent !== null && spent!==0) ? (spent / budget * 100) : 0
        data.progress = progress.toFixed(0)
        data.spent = data.spent != null ? data.spent : '-'
        data.budget = data.budget != null ? data.budget : '-'
    }
    console.log(categories_overview)
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
            {categories_overview.map((list : any) => (
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
        </div>
    )
}

export default BudgetOverview
