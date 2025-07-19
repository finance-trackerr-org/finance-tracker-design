import { getUserCookie } from "../utils/tokenHandler";

export const fetchUserByName = async() => {
    const [token , userName] = getUserCookie();
    const response = await fetch(`http://localhost:8080/api/auth/user?userName=${userName}`,{
        method:'get',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : token || '',
            "userName": userName || ''
        }
    })

    return await response.json();
}
