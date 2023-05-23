import axios from "axios";
import { createContext, useReducer, useEffect, useLayoutEffect } from "react";
import { songReducer } from "../reducers/songReducer";
import { LOCAL_STORAGE_SONG_STATE_NAME, apiUrl } from "./variables";

interface songContextType {
    getNewSongs: (data: object) => Promise<any>;
    songState: any;
    setSongDispatch: (song: object, songs: object[], listSongsId?: string) => void;
    playSongDispatch: () => void;
    pauseSongDispatch: () => void;
    repeatSongDispatch: (repeat: string) => void;
    randomSongDispatch: () => void;
    likeSong: (songId: string) => Promise<any>;
    likedSongs: () => Promise<any>;
    getSongsOfPlaylist: (id: string) => Promise<any>;
    addSong: (playlistId: string, songId: string) => Promise<any>;
    removeSong: (playlistId: string, songId: string) => Promise<any>;
}
export const SongContext = createContext({} as songContextType);

type Props = {
    children: JSX.Element;
};

function SongContextProvider({ children }: Props) {
    const [songState, dispatch] = useReducer(songReducer, {
        isPlaying: false,
        repeat: "none",
        isRandom: false,
        song: "",
        songs: [],
        listSongsId: "",
        songsRandom: [],
    });

    console.log(songState);

    const setSongDispatch = (song: object, songs: object[], listSongsId = "") => {
        if (songState.isRandom && songState.songs !== songs) {
            const temp = songs.slice(0);
            const shuffledArray = temp.sort((a: any, b: any) => 0.5 - Math.random());
            shuffledArray.splice(shuffledArray.indexOf(song), 1);
            shuffledArray.unshift(song);
            songState.songsRandom = shuffledArray;
        } else if (!songState.isRandom) {
            songState.songsRandom = [];
        }
        const songInfo = {
            song: song,
            songs: songs,
            listSongsId: listSongsId,
        };
        localStorage.setItem(LOCAL_STORAGE_SONG_STATE_NAME, JSON.stringify(songInfo));
        dispatch({
            type: "SET_SONG",
            payload: songInfo,
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

    const repeatSongDispatch = (repeat: string) => {
        dispatch({
            type: "SET_REPEAT",
            payload: {
                repeat: repeat,
            },
        });
    };

    // Function create array songs random
    const shuffle = () => {
        const temp = songState.songs.slice(0);
        const shuffledArray = temp.sort((a: any, b: any) => 0.5 - Math.random());
        shuffledArray.splice(shuffledArray.indexOf(songState.song), 1);
        shuffledArray.unshift(songState.song);
        songState.songsRandom = shuffledArray;
    };

    const randomSongDispatch = () => {
        if (!songState.isRandom) {
            shuffle();
        } else {
            songState.songsRandom = [];
        }
        dispatch({
            type: "SET_RANDOM",
            payload: {},
        });
    };

    // CALL API getNewSongs
    const getNewSongs = async (data: object) => {
        try {
            const response = await axios.get(`${apiUrl}/songs/new-song`, { params: data });
            return response.data.songs;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // CALL API like-song
    const likeSong = async (songId: string) => {
        try {
            const response = await axios.put(`${apiUrl}/songs/like-song`, { songId: songId });
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // CALL API Get all song liked
    const likedSongs = async () => {
        try {
            const response = await axios.get(`${apiUrl}/songs/liked-songs`);
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // CALL API get songs of playlist
    const getSongsOfPlaylist = async (id: string) => {
        try {
            const response = await axios.get(`${apiUrl}/playlists/${id}`);
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // CALL API add song to playlist
    const addSong = async (playlistId: string, songId: string) => {
        try {
            const response = await axios.put(`${apiUrl}/playlists/add-song`, {
                playlistId: playlistId,
                songId: songId,
            });
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // CALL API remove song from playlist
    const removeSong = async (playlistId: string, songId: string) => {
        try {
            const response = await axios.put(`${apiUrl}/playlists/remove-song`, {
                playlistId: playlistId,
                songId: songId,
            });
            return response.data;
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_SONG_STATE_NAME)) {
            const storageSong = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SONG_STATE_NAME) || "{}");
            setSongDispatch(storageSong.song, storageSong.songs, storageSong.listSongsId);
            pauseSongDispatch();
        }
    }, []);

    const songContextData = {
        likeSong,
        getNewSongs,
        likedSongs,
        songState,
        setSongDispatch,
        playSongDispatch,
        pauseSongDispatch,
        repeatSongDispatch,
        randomSongDispatch,
        getSongsOfPlaylist,
        addSong,
        removeSong,
    };
    return <SongContext.Provider value={songContextData}>{children}</SongContext.Provider>;
}

export default SongContextProvider;
