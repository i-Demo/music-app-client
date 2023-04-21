export const authReducer = (
    state: object,
    action: { type: string; payload: { isAuthenticated: boolean; user: object | null } }
) => {
    const {
        type,
        payload: { isAuthenticated, user },
    } = action;

    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
                isAuthLoading: false,
                isAuthenticated,
                user,
            };

        default:
            return state;
    }
};
