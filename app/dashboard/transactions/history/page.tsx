import React from 'react'
import DashboardLayout from '../layout';
import History  from "../../../components/transaction/History"

function TransactionHistory() {
    return (
        <>
            <History />
        </>
    )
}

TransactionHistory.getLayout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default TransactionHistory
