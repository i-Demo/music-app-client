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
    getUser: (userId: string) => Promise<any>;
    updateProfile: (data: object) => Promise<any>;
    authState: any;
    authDispatch: (user: any) => void;
    getPlaylists: (params: object) => Promise<any>;
    createPlaylist: (playlistData: object) => Promise<any>;
    editPlaylist: (idPlaylist: string, playlistData: object) => Promise<any>;
    deletePlaylist: (idPlaylist: string) => Promise<any>;
    togglePublic: (idPlaylist: string) => Promise<any>;
    togglePlaylist: (idPlaylist: string) => Promise<any>;
}
export const AuthContext = createContext({} as AuthContextType);

type Props = {
    children: JSX.Element;
};
function AuthContextProvider({ children }: Props) {
    const [authState, dispatch] = useReducer(authReducer, {
        isAuthLoading: true,
        isAuthenticated: false,
        user: {},
    });
    console.log(authState);

    const authDispatch = (user: object) => {
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

    // Get User by Id
    const getUser = async (userId: string) => {
        try {
            const response = await axios.get(`${apiUrl}/auth/${userId}`);
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // Update profile user
    const updateProfile = async (dataProfile: object) => {
        try {
            const response = await axios.put(`${apiUrl}/auth/update-profile`, dataProfile);
            if (response.data.success) {
                await axios.put(`${apiUrl}/playlists/user-update`, {
                    myPlaylists: response.data.user.myPlaylists,
                    userName: response.data.user.name,
                    userAvatar: response.data.user.avatar,
                });
                authDispatch(response.data.user);
                return response.data;
            }
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // Get Playlists
    const getPlaylists = async (params: object) => {
        try {
            const response = await axios.get(`${apiUrl}/playlists`, { params: params });
            if (response.data.success) {
                return response.data;
            }
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };
    // Create Playlist
    const createPlaylist = async (playlistData: object) => {
        try {
            const response = await axios.post(`${apiUrl}/playlists`, playlistData);
            authDispatch(response.data.user);
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };
    // Edit Playlist
    const editPlaylist = async (idPlaylist: string, playlistData: object) => {
        try {
            const response = await axios.put(`${apiUrl}/playlists/edit/${idPlaylist}`, playlistData);
            authDispatch(response.data.user);
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };
    // Delete Playlist by Id
    const deletePlaylist = async (idPlaylist: string) => {
        try {
            const response = await axios.delete(`${apiUrl}/playlists/${idPlaylist}`);
            authDispatch(response.data.user);
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };
    // Toggle public of Playlist in User Profile
    const togglePublic = async (idPlaylist: string) => {
        try {
            const response = await axios.put(`${apiUrl}/playlists/toggle-public/${idPlaylist}`);
            authDispatch(response.data.user);
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };
    // Add/Remove Playlist to/from Library
    const togglePlaylist = async (idPlaylist: string) => {
        try {
            const response = await axios.put(`${apiUrl}/playlists/toggle-playlist/${idPlaylist}`);
            authDispatch(response.data.user);
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    const authContextData = {
        registerUser,
        loginUser,
        logoutUser,
        getUser,
        updateProfile,
        authState,
        authDispatch,
        getPlaylists,
        createPlaylist,
        editPlaylist,
        deletePlaylist,
        togglePublic,
        togglePlaylist,
    };

    useEffect(() => {
        loadUser();
    }, []);
    return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
