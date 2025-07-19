export const registerUser = async(data: {firstname : string, lastname : string, email : string, password : string, role : string}) => {
    const response = await fetch('http://localhost:8080/api/auth/register',{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // console.log("response  ==",await response.json());

    return await response.json();
}

export const loginUser = async(data: {email : string, password : string}) => {
    const response = await fetch('http://localhost:8080/api/auth/login',{
        method:'post',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return await response.json();
}
