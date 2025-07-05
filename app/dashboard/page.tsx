import React from 'react'
import { Typography } from '@mui/material'
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardLayout from './layout'
import DashBoardMainComponent from '../components/dashboard/DashBoardMainComponent'

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
            <DashBoardMainComponent />
        </>
    )
}

Dashboard.getLayout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard
