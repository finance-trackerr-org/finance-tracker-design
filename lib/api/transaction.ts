export const fetchTransactions = async(data: {usedId : string, fromDate : string, toDate : string}, page : number, size : number) => {
    console.log("data==== ",data);
    const response = await fetch(`http://localhost:8081/api/transaction/get-transactions?page=${page}&size=${size}`,{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFiaGF5LnJAZ21haWwuY29tIiwiaWF0IjoxNzUxODA0Mzc3LCJleHAiOjE3NTI3MDQzNzd9.4DFFA4o8oanlSuZy2DxlhARUizKtdzNyj58qEgGeeRI',
            "userName":'abhay.r@gmail.com'
        },
        body: JSON.stringify(data),
    })

    return await response.json();
}

export const addTransaction = async(formData : FormData) => {
    const response = await fetch(`http://localhost:8081/api/transaction/add-transaction`,{
        method:'post',
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFiaGF5LnJAZ21haWwuY29tIiwiaWF0IjoxNzUxODA0Mzc3LCJleHAiOjE3NTI3MDQzNzd9.4DFFA4o8oanlSuZy2DxlhARUizKtdzNyj58qEgGeeRI',
            "userName":'abhay.r@gmail.com'
        },
        body: formData,
    })

    return await response.json();
}

export const fetchCategories = async(userId: string) => {
    const response = await fetch(`http://localhost:8081/api/category/get-category?userId=${userId}`,{
        method:'get',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFiaGF5LnJAZ21haWwuY29tIiwiaWF0IjoxNzUxODA0Mzc3LCJleHAiOjE3NTI3MDQzNzd9.4DFFA4o8oanlSuZy2DxlhARUizKtdzNyj58qEgGeeRI',
            "userName":'abhay.r@gmail.com'
        }
    })

    return await response.json();
}

export const fetchFinanceOverview = async(data : {userId : string, fromDate : string, toDate : string}) => {
    const response = await fetch(`http://127.0.0.1:8081/api/transaction/finance-overview`,{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFiaGF5LnJAZ21haWwuY29tIiwiaWF0IjoxNzUxODA0Mzc3LCJleHAiOjE3NTI3MDQzNzd9.4DFFA4o8oanlSuZy2DxlhARUizKtdzNyj58qEgGeeRI',
            "userName":'abhay.r@gmail.com'
        },
        body: JSON.stringify(data)
    })

    return await response.json();
}

export const fetchCategoriesTransactionData = async(data : {userId : string, fromDate : string, toDate : string}) => {
    const response = await fetch(`http://127.0.0.1:8081/api/transaction/transactions-by-category`,{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFiaGF5LnJAZ21haWwuY29tIiwiaWF0IjoxNzUxODA0Mzc3LCJleHAiOjE3NTI3MDQzNzd9.4DFFA4o8oanlSuZy2DxlhARUizKtdzNyj58qEgGeeRI',
            "userName":'abhay.r@gmail.com'
        },
        body: JSON.stringify(data)
    })

    return await response.json();
}

export const downloadTransactionAttachment = async(id : number) => {
    const response = await fetch(`http://127.0.0.1:8081/api/file/download/${id}`,{
        method:'get',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFiaGF5LnJAZ21haWwuY29tIiwiaWF0IjoxNzUxODA0Mzc3LCJleHAiOjE3NTI3MDQzNzd9.4DFFA4o8oanlSuZy2DxlhARUizKtdzNyj58qEgGeeRI',
            "userName":'abhay.r@gmail.com'
        }
    })

    return await response;
}
