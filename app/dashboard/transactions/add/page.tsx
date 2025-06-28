import React from 'react'
import DashboardLayout from '../layout';
import TransactionAdd from '@/app/components/transaction/TransactionAdd';

function TransactionHistory() {
    return (
        <>
            <TransactionAdd />
        </>
    )
}

TransactionHistory.getLayout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default TransactionHistory
