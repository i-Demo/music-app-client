export const songReducer = (state: object, action: { type: any; payload: {}; }) => {
    const {
        type,
        payload: {},
    } = action;

    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
            };

        default:
            return state;
    }
};
