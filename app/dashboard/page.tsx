import React from 'react'
import SideBar from '../components/SideBar'
import Overview from '../components/dashboard/Overview'
import BudgetOverview from '../components/dashboard/BudgetOverview'
import ExpenseBreakdown from '../components/dashboard/ExpenseBreakdown'
import TransactionHistory from './transactions/history/page'
import { Typography } from '@mui/material'
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Dashboard() {
    const unreadCount = 2;

    return (
        <div className='flex'>
            <SideBar />
            <div className='flex-1 pt-6 pb-6 pr-10 pl-10'>
                <div className='flex justify-between align-baseline'>
                    <div>
                        <Typography variant='h4'>Dashboard</Typography>
                        <Typography variant='subtitle1' sx={{ marginLeft : '1rem' }}>Welcome back, Alex! Here's your financial summary</Typography>
                    </div>
                    <div>
                        <Link href={'/dashboard/notifications'} passHref>
                            <IconButton color='inherit'>
                                <Badge badgeContent={unreadCount} color='error'>
                                    <NotificationsOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Link>
                        <Link href={'/user/user-profile'} passHref>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Link>
                    </div>
                </div>
                <Overview />
                <BudgetOverview />
                <ExpenseBreakdown />
                <TransactionHistory />
            </div>
        </div>
    )
}

export default Dashboard
