export const apiUrl =
    process.env.NODE_ENV !== "production" ? "http://localhost:5000/api" : "https://demo-music.vercel.app/api";
export const LOCAL_STORAGE_TOKEN_NAME = "music-app-auth";
export const LOCAL_STORAGE_SONG_STATE_NAME = "music-app-song-state";
