export const fetchTransactions = async(data: {usedId : string, fromDate : string, toDate : string}, page : number, size : number) => {
    console.log("data==== ",data);
    const response = await fetch(`http://localhost:8081/api/transaction/get-transactions?page=${page}&size=${size}`,{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFiaGF5LnJAZ21haWwuY29tIiwiaWF0IjoxNzUxMDQ3NzM0LCJleHAiOjE3NTEwNDg2MzR9.qtOM2pJU56XjhlEkxsKqApgm_uLfeHcE9AZJVOEMLzE',
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
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFiaGF5LnJAZ21haWwuY29tIiwiaWF0IjoxNzUxMDQ3NzM0LCJleHAiOjE3NTEwNDg2MzR9.qtOM2pJU56XjhlEkxsKqApgm_uLfeHcE9AZJVOEMLzE',
            "userName":'abhay.r@gmail.com'
        },
        body: formData,
    })

    return await response.json();
}

export const fetchCategories = async(userId : string) => {
    const response = await fetch(`http://localhost:8081/api/category/get-category?userId=${userId}`,{
        method:'get',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInN1YiI6ImFiaGF5LnJAZ21haWwuY29tIiwiaWF0IjoxNzUxMDQ3NzM0LCJleHAiOjE3NTEwNDg2MzR9.qtOM2pJU56XjhlEkxsKqApgm_uLfeHcE9AZJVOEMLzE',
            "userName":'abhay.r@gmail.com'
        }
    })

    return await response.json();
}
