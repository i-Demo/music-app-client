export const apiUrl =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api"
        : "https://music-app-r7c8.onrender.com//api";
export const LOCAL_STORAGE_TOKEN_NAME = "music-app-auth";
export const LOCAL_STORAGE_SONG_STATE_NAME = "music-app-song-state";
