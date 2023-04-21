import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";

type PrivateRouteType = {
    children: JSX.Element;
};
const PrivateRoute = ({ children }: PrivateRouteType) => {
    const {
        authState: { isAuthLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (isAuthLoading) return <Loading />;

    return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};
export default PrivateRoute;
