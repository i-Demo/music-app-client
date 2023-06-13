import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AuthContext } from "../../../contexts/authContext";
import AlertMessage, { TypeAlert } from "../../../components/AlertMessage";
import Loading from "../../../components/Loading";

function Login() {
    const [isHide, setIsHide] = useState(true);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = loginData;
    const [alert, setAlert] = useState<TypeAlert | null>(null);
    const { loginUser } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(false);

    // Two-way binding Register Data
    const onChangeLoginData = (e: { target: { name: string; value: string } }) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    // Show password when click icon show
    const showPass = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsHide(!isHide);
    };

    // Handle when clicking registers
    const handleLogin = async (e: any) => {
        e.preventDefault();
        setIsLogin(true);
        try {
            const dataLogin = await loginUser(loginData);
            if (!dataLogin.success) {
                setAlert({ type: "danger", message: dataLogin.message });
                setIsLogin(false);
            }
        } catch (error) {
            // setAlert({ type: "danger", message: error.message });
            setIsLogin(false);
            console.log(error);
        }
    };

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (alert) {
            timer = setTimeout(() => setAlert(null), 3000);
        }
        return () => clearTimeout(timer);
    }, [alert]);

    return (
        <>
            <h3 className="text-white text-center font-bold mb-8">Log in to continue.</h3>

            <form onSubmit={handleLogin} method="post" className="w-full">
                <AlertMessage info={alert} />
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        value={email}
                        onChange={onChangeLoginData}
                        className="input"
                    />
                    <span className="absolute top-[10px] right-3 text-xl">
                        <AiOutlineMail />
                    </span>
                </div>
                <div className="relative">
                    <input
                        type={isHide ? "password" : "text"}
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginData}
                        className="input"
                    />
                    <button type="button" onClick={showPass} className="absolute top-[10px] right-3 text-2xl">
                        {isHide && <AiOutlineEyeInvisible />}
                        {!isHide && <AiOutlineEye />}
                    </button>
                </div>
                <a href="#" className="text-sm underline text-tGray hover:text-white">
                    Reset Password
                </a>
                {isLogin ? (
                    <div className="my-8">
                        <Loading />
                    </div>
                ) : (
                    <button type="submit" className="btn bg-white hover:scale-105 my-8">
                        Log in
                    </button>
                )}
            </form>

            <Link to="/register" className="mb-12 text-sm text-tGray font-semibold">
                Don't have an account? <span className="underline uppercase text-white">signup</span>
            </Link>
        </>
    );
}

export default Login;
