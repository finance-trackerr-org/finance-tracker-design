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
import DashboardLayout from './layout'

function Dashboard() {
    const unreadCount = 2;

    return (
        <>
            <div className='flex justify-between align-baseline'>
                <div>
                    <Typography variant='h4'>Dashboard</Typography>
                    <Typography variant='subtitle1' sx={{ marginLeft : '0.5rem' }}>Welcome back, Alex! Here's your financial summary</Typography>
                </div>
                <div>
                    <Link href={'/dashboard/notifications'} passHref>
                        <IconButton color='inherit' size="large">
                            <Badge badgeContent={unreadCount} color='error'>
                                <NotificationsOutlinedIcon fontSize="large" />
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
                            <AccountCircle fontSize="large" />
                        </IconButton>
                    </Link>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-4'>
                <Overview />
                <BudgetOverview />
                <ExpenseBreakdown />
                <TransactionHistory />
            </div>
        </>
    )
}

Dashboard.getLayout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard
