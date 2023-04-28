import axios from "axios";
import { createContext, useReducer } from "react";
import { songReducer } from "../reducers/songReducer";
import { apiUrl } from "./variables";

interface songContextType {
    getNewSong: (data: object) => Promise<any>;
    songState: any;
    setSongDispatch: (song: object, songs: object[]) => void;
    playSongDispatch: () => void;
    pauseSongDispatch: () => void;
}
export const SongContext = createContext({} as songContextType);

type Props = {
    children: JSX.Element;
};

function SongContextProvider({ children }: Props) {
    const [songState, dispatch] = useReducer(songReducer, {
        isPlaying: false,
        song: "",
        songs: [],
    });

    console.log(songState);

    const setSongDispatch = (song: object, songs: object[]) => {
        dispatch({
            type: "SET_SONG",
            payload: {
                song: song,
                songs: songs,
            },
        });
    };

    const playSongDispatch = () => {
        dispatch({
            type: "SET_PLAY",
            payload: {},
        });
    };

    const pauseSongDispatch = () => {
        dispatch({
            type: "SET_PAUSE",
            payload: {},
        });
    };

    const getNewSong = async (data: object) => {
        try {
            const response = await axios.get(`${apiUrl}/songs/new-song`, { params: data });
            if (response.data.success) return response.data.songs;
        } catch (error: any) {
            console.log(error);
            return { success: false, message: error.message };
        }
    };

    const songContextData = { getNewSong, songState, setSongDispatch, playSongDispatch, pauseSongDispatch };
    return <SongContext.Provider value={songContextData}>{children}</SongContext.Provider>;
}

export default SongContextProvider;
