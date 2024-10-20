import { createContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

const ProfileContext = createContext();

export default ProfileContext;

export const ProtectedRoute = ({ child }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const resp = await api.post("/api/token/refresh/", { refresh: refreshToken });
            if (resp.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, resp.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (err) {
            console.log(err);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
            setIsAuthorized(false);
            console.log("No Authorization");
            return;
        }

        const decode = jwtDecode(token);
        const tokenExpiration = decode.exp; // in seconds
        const nowDate = Date.now() / 1000;

        if (tokenExpiration < nowDate) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    const userInfoData = {
        userData,
        setUserData,
    };

    return (
        <ProfileContext.Provider value={userInfoData}>
            {isAuthorized ? child : <Navigate to="/login" />}
        </ProfileContext.Provider>
    );
}

// export default ProtectedRoute;