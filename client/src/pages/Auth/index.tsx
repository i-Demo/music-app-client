import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import logo from "@assets/images/logo.svg";
import Welcome from "./Welcome";
import Login from "./Login";
import Register from "./Register";
import Loading from "../../components/Loading";

function Auth({ authRoute }: { authRoute: string }) {
    const {
        authState: { isAuthLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (isAuthLoading) {
        return (
            <div className="flex justify-center items-center w-screen h-screen">
                <Loading />
            </div>
        );
    } else if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    let body = (
        <>
            {authRoute === "welcome" && <Welcome />}
            {authRoute === "login" && <Login />}
            {authRoute === "register" && <Register />}
        </>
    );

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-600 w-screen h-screen">
            <div
                key={authRoute}
                className="fixed top-0 left-0 bottom-0 right-0 max-w-[480px] h-fit m-auto px-16 flex flex-col items-center bg-primary flex-nowrap animate-auth-slip"
            >
                <div className="">
                    <img className="my-12" src={logo} alt="Logo" />
                </div>
                {body}
            </div>
        </div>
    );
}

export default Auth;
