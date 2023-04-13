import logo from "@assets/images/logo.svg";
import { Link } from "react-router-dom";
import Welcome from "./Welcome";
import Login from "./Login";
import Register from "./Register";

function Auth({ authRoute }: { authRoute: string }) {
    let body = (
        <>
            {authRoute === "welcome" && <Welcome />}
            {authRoute === "login" && <Login />}
            {authRoute === "register" && <Register />}
        </>
    );
    return (
        <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r w-screen h-screen">
            <div className="fixed top-0 left-0 bottom-0 right-0 max-w-[480px] h-fit m-auto px-16 flex flex-col items-center bg-primary flex-nowrap animate-auth-slip">
                <div className="">
                    <img className="my-12" src={logo} alt="Logo" />
                </div>
                {body}
            </div>
        </div>
    );
}

export default Auth;
