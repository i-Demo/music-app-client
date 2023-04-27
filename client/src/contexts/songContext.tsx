import axios from "axios";
import { createContext, useReducer } from "react";
import { songReducer } from "../reducers/songReducer";
import { apiUrl } from "./variables";

interface songContextType {
    getNewSong: (data: object) => Promise<any>;
    songState: any;
}
export const SongContext = createContext({} as songContextType);

type Props = {
    children: JSX.Element;
};

function SongContextProvider({ children }: Props) {
    const [songState, dispatch] = useReducer(songReducer, {
        song: "",
        songs: [],
    });

    const getNewSong = async (data: object) => {
        try {
            const response = await axios.get(`${apiUrl}/songs/new-song`, { params: data });
            if (response.data.success) return response.data.songs;
        } catch (error: any) {
            console.log(error);
            return { success: false, message: error.message };
        }
    };

    const songContextData = { getNewSong, songState };
    return <SongContext.Provider value={songContextData}>{children}</SongContext.Provider>;
}

export default SongContextProvider;
