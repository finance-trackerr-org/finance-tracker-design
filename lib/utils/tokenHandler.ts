// utils/auth.ts
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import * as jose from 'jose'

export const setUserCookies = (token: string) => {
    const decode :any =  jwt.decode(token)
    const cookieUserName = decode.sub;
    const exp = decode.exp;
    const expDate = new Date(exp * 1000)
    const tokenBearer = 'Bearer ' + token

    Cookies.set('token', tokenBearer, { expires: expDate })
    Cookies.set('userName', cookieUserName, { expires: expDate })
}

export const getUserCookie = () => {
    const token = Cookies.get('token');
    const userName = Cookies.get('userName');

    return [token, userName];
}

export const removeCookie = () => {
    Cookies.remove('token');
    Cookies.remove('userName');
}

export const decodeToken = async (token : string | undefined) => {
    const secret = Buffer.from(process.env.TOKEN_SECRET!, 'base64');
    if (!(secret instanceof Uint8Array) || secret.length === 0) {
        console.error('JWT_SECRET is not defined in environment variables.')
        return false;
    }
    if(!token || !token.startsWith('Bearer')) return false
    try {
        const tokenBearerTrailing = token.replace('Bearer ', '');
        await jose.jwtVerify(tokenBearerTrailing, secret, { algorithms: ['HS256'] });
        return true
    } catch (err) {
        console.error('Token verification failed:', err)
        return false
    }
}
