export const songReducer = (state: object, action: { type: string; payload: any }) => {
    const {
        type,
        payload: { song, songs },
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

        default:
            return state;
    }
};
