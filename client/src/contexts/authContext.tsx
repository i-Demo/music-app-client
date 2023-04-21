import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl } from "./variables";
import setAuthToken from "../untils/setAuthToken";
import { authReducer } from "../reducers/authReducer";

interface AuthContextType {
    // loadUser: () => Promise<any>;
    registerUser: (userData: object) => Promise<any>;
    loginUser: (userData: object) => Promise<any>;
    logoutUser: () => void;
    authState: any;
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

    const authDispatch = (response: any) => {
        dispatch({
            type: "SET_AUTH",
            payload: {
                isAuthenticated: true,
                user: response.data.user,
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
                    authDispatch(response);
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
                authDispatch(response);
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
                authDispatch(response);
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

    const authContextData = { registerUser, loginUser, logoutUser, authState };

    useEffect(() => {
        loadUser();
    }, []);
    return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
