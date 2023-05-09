import { createContext, useEffect, useReducer } from "react";
import setAuthToken from "../untils/setAuthToken";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl } from "./variables";

interface AuthContextType {
    // loadUser: () => Promise<any>;
    registerUser: (userData: object) => Promise<any>;
    loginUser: (userData: object) => Promise<any>;
    logoutUser: () => void;
    updateProfile: (data: object) => Promise<any>;
    authState: any;
    authDispatch: (user: any) => void;
}
export const AuthContext = createContext({} as AuthContextType);

type Props = {
    children: JSX.Element;
};
function AuthContextProvider({ children }: Props) {
    const [authState, dispatch] = useReducer(authReducer, {
        isAuthLoading: true,
        isAuthenticated: false,
        user: null,
    });
    console.log(authState)

    const authDispatch = (user: any) => {
        dispatch({
            type: "SET_AUTH",
            payload: {
                isAuthenticated: true,
                user: user,
            },
        });
    };
    const notAuthDispatch = () => {
        dispatch({
            type: "SET_AUTH",
            payload: {
                isAuthenticated: false,
                user: null,
            },
        });
    };

    // Authenticate user
    const loadUser = async () => {
        if (!localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) {
            setAuthToken(null);
            notAuthDispatch();
        } else {
            setAuthToken(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME));
            try {
                const response = await axios.get(`${apiUrl}/auth`);
                if (response.data.success) {
                    authDispatch(response.data.user);
                }
            } catch (error: any) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                setAuthToken(null);
                notAuthDispatch();
            }
        }
    };

    // Register
    const registerUser = async (userData: object) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userData);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
                setAuthToken(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME));
                authDispatch(response.data.user);
            }
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // Login
    const loginUser = async (userData: object) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userData);
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
                setAuthToken(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME));
                authDispatch(response.data.user);
            }
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);
        notAuthDispatch();
    };

    // Update profile user
    const updateProfile = async (dataProfile: object) => {
        try {
            const response = await axios.put(`${apiUrl}/auth/update-profile`, dataProfile);
            if (response.data.success) {
                authDispatch(response.data.user);
                return response.data;
            }
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    const authContextData = { registerUser, loginUser, logoutUser, updateProfile, authState, authDispatch };

    useEffect(() => {
        loadUser();
    }, []);
    return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
