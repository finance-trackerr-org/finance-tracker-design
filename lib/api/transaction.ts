import { getUserCookie } from "../utils/tokenHandler";

export const fetchTransactions = async(data: {fromDate : string, toDate : string}, page : number, size : number) => {
    const [token , userName] = getUserCookie();
    const response = await fetch(`http://localhost:8081/api/transaction/get-transactions?page=${page}&size=${size}`,{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : token || '',
            "userName": userName || ''
        },
        body: JSON.stringify(data),
    })

    return await response.json();
}

export const addTransaction = async(formData : FormData) => {
    const [token , userName] = getUserCookie();
    const response = await fetch(`http://localhost:8081/api/transaction/add-transaction`,{
        method:'post',
        headers:{
            'Authorization' : token || '',
            "userName": userName || ''
        },
        body: formData,
    })

    return await response.json();
}

export const fetchCategories = async(userId: string) => {
    const [token , userName] = getUserCookie();
    const response = await fetch(`http://localhost:8081/api/category/get-category?userId=${userId}`,{
        method:'get',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : token || '',
            "userName": userName || ''
        }
    })

    return await response.json();
}

export const fetchFinanceOverview = async(data : {userId : string, fromDate : string, toDate : string}) => {
    const [token , userName] = getUserCookie();
    const response = await fetch(`http://127.0.0.1:8081/api/transaction/finance-overview`,{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : token || '',
            "userName": userName || ''
        },
        body: JSON.stringify(data)
    })

    return await response.json();
}

export const fetchCategoriesTransactionData = async(data : {userId : string, fromDate : string, toDate : string}) => {
    const [token , userName] = getUserCookie();
    const response = await fetch(`http://127.0.0.1:8081/api/transaction/transactions-by-category`,{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : token || '',
            "userName": userName || ''
        },
        body: JSON.stringify(data)
    })

    return await response.json();
}

export const downloadTransactionAttachment = async(id : number) => {
    const [token , userName] = getUserCookie();
    const response = await fetch(`http://127.0.0.1:8081/api/file/download/${id}`,{
        method:'get',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : token || '',
            "userName": userName || ''
        }
    })

    return await response;
}

export const addUserMasterBudget = async(data : { userId : string, totalBalance : number,date : String, categoryPricing : Object }) => {
    const [token , userName] = getUserCookie();
    const response = await fetch(`http://localhost:8081/api/transaction/add-user-budgets`,{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : token || '',
            "userName": userName || ''
        },
        body: JSON.stringify(data),
    })

    return await response.json();
}