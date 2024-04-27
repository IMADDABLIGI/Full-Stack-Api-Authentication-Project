import { React, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import {jwtDecode} from "jwt-decode"
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

function ProtectedRoute(children) {
  
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => { // This function will be responsible for refreshing the token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const resp = await api.post("/api/token/refresh/", { refresh: refreshToken,});
            if (resp.status === 200){ //Successfull
                localStorage.setItem(ACCESS_TOKEN, resp.data.access)
                setIsAuthorized(true)
            }
            else
                setIsAuthorized(false)
        } 
        catch (err) {
            console.log(err)
            setIsAuthorized(false)
        }
    }
    
    const auth = async () => { // Check if the Token needs to be refresh 
        const token = localStorage.getItem(ACCESS_TOKEN)

        if (!token){
            setIsAuthorized(false)
            return;
        }
        const decode = jwtDecode(token) // Check Token expiration
        const tokenExpiration = decode.exp // in seconds
        const nowDate = Date.now() / 1000
        if (tokenExpiration < nowDate)
            await refreshToken();
        else
            setIsAuthorized(true);
    }
    if (isAuthorized === null)
        return <div> Loading...</div>
    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute
 