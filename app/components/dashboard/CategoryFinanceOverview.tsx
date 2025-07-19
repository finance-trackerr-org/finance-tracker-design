"use client";

import React, { useEffect, useState } from 'react'
import BudgetOverview from './BudgetOverview'
import ExpenseBreakdown from './ExpenseBreakdown'
import { fetchCategoriesTransactionData } from '@/lib/api/transaction';
import { CATEGORIES_COLOR } from '../../constants/data';
import { useSnackbarQueue } from '@/app/hooks/useSnackbarQueue';

interface Transaction {
    date: string;
    amount: number;
    attachment: string | null;
    description: string;
    category: string;
    type: 'INCOME' | 'EXPENSE';
}

interface CategoryTransactionMap {
    [category: string]: Transaction[];
}

interface CategoriesFinanceOverviewMap {
    categoryAmount: {
      [category: string]: {
        spent : number,
        budget : number
      };
    };
    categoryPercentage: {
      [category: string]: number;
    };
    categoryTransactions: CategoryTransactionMap;
}

interface BudgetOverviewData {
    category : string,
    spent : number,
    budget : number,
    color : string
}

interface ExpenseBreakDownData {
    category : string,
    percentage : number,
    color : string
}

interface ExpenseBreakDownMap {
    totalSpent : number | null;
    expenseBreakdownData: ExpenseBreakDownData[];
}

interface DateProps {
    dates : {fromDate : string, toDate : string}
}

function CategoryFinanceOverview({dates} : DateProps) {
    const [budgetOverviewData, setBudgetOverviewData] = useState<BudgetOverviewData[]>([]);
    const [expenseBreakdownData, setExpenseBreakdownData] = useState<ExpenseBreakDownMap>({
        totalSpent : null,
        expenseBreakdownData : []
    });
    const { enqueueSnackbar, SnackbarRenderer } = useSnackbarQueue();

    function transformData(categoriesTransactionData : CategoriesFinanceOverviewMap){
        try{
            const categoryAmountData : any = []
            const expenseBreakDownData : any = []
            const categoryAmount = 'categoryAmount' in  categoriesTransactionData ? categoriesTransactionData['categoryAmount'] : null;
            const expenseBreakDown = 'categoryPercentage' in  categoriesTransactionData ? categoriesTransactionData['categoryPercentage'] : null;
            type CategoryKey = keyof typeof CATEGORIES_COLOR;
            let totalSpent = 0;
            for(let category in categoryAmount) {
                if(category != null && category.toUpperCase() in CATEGORIES_COLOR) {
                    const categoryUpper = category.toUpperCase() as CategoryKey
                    totalSpent += 'spent' in categoryAmount[category] ? categoryAmount[category]['spent'] : 0
                    categoryAmountData.push({
                        category : category,
                        color : CATEGORIES_COLOR[categoryUpper],
                        spent : categoryAmount[category]['spent'],
                        budget : categoryAmount[category]['budget']
                    })
                    expenseBreakDownData.push({
                        category : category,
                        color : CATEGORIES_COLOR[categoryUpper],
                        percentage : expenseBreakDown !=null && expenseBreakDown[category]!= null ? expenseBreakDown[category] : null
                    })
                }
            }
            return {'categoryAmountData' : categoryAmountData, 'totalSpent' : totalSpent, 'expenseBreakdownData' : expenseBreakDownData}
        }catch(err : any){
            enqueueSnackbar({ severity: 'error', message: 'Something went wrong' });
            return {'categoryAmountData' : [], 'totalSpent' : null, 'expenseBreakdownData' : []}
        }
    }

    async function fetchCategoriesTransactions(fromDate : string, toDate : string, userId : string | null) {
        try{
            const requestBody : any = {
                userId : userId,
                fromDate : fromDate,
                toDate : toDate
            }
            const res : any = await fetchCategoriesTransactionData(requestBody)
            if(res.status != 'OK') {
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
            setBudgetOverviewData([])
            setExpenseBreakdownData({ 'totalSpent' : null,  'expenseBreakdownData' : []})
        }else {
            enqueueSnackbar({ severity: 'success', message: res.message });
            const {categoryAmountData, totalSpent, expenseBreakdownData} = transformData(res.data)
            setBudgetOverviewData(categoryAmountData)
            setExpenseBreakdownData({ 'totalSpent' : totalSpent,  'expenseBreakdownData' : expenseBreakdownData})
        }
        }catch(err : any){
            enqueueSnackbar({ severity: 'error', message: 'Something went wrong' });
        }
    }
    
    useEffect(() => {
        fetchCategoriesTransactions(dates.fromDate,dates.toDate,localStorage.getItem('userId'))
    },[dates])
    
    return (
        <>
            <BudgetOverview budgetOverviewData = {budgetOverviewData} />
            <ExpenseBreakdown expenseBreakdown = {expenseBreakdownData} />
            <SnackbarRenderer />
        </>
    )
}

export default CategoryFinanceOverview
