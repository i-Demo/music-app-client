export const songReducer = (state: any, action: { type: string; payload: any }) => {
    const {
        type,
        payload: { song, songs, repeat },
    } = action;

    switch (type) {
        case "SET_SONG":
            return {
                ...state,
                isPlaying: true,
                song,
                songs,
            };
        case "SET_PLAY":
            return {
                ...state,
                isPlaying: true,
            };
        case "SET_PAUSE":
            return {
                ...state,
                isPlaying: false,
            };
        case "SET_REPEAT":
            return {
                ...state,
                repeat: repeat,
            };
        case "SET_RANDOM":
            return {
                ...state,
                isRandom: !state.isRandom,
            };
        default:
            return state;
    }
};
