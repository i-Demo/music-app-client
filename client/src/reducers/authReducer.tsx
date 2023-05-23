export const authReducer = (
    state: any,
    action: { type: string; payload: { isAuthenticated?: boolean; user: object | null } }
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
        case "SET_USER":
            return {
                ...state,
                user,
            };

        default:
            return state;
    }
};
