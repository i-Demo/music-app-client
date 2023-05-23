import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineEyeInvisible, AiOutlineEye, AiOutlineQuestionCircle } from "react-icons/ai";
// import { AuthContext } from '@authContext';
import { AuthContext } from "../../../contexts/authContext";
import AlertMessage, { TypeAlert } from "../../../components/AlertMessage";

function Register() {
    const [isHide, setIsHide] = useState(true);
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const [alert, setAlert] = useState<TypeAlert | null>(null);
    const { email, password, name } = registerData;
    // Context
    const { registerUser } = useContext(AuthContext);

    // Show password when click icon show
    const showPass = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsHide(!isHide);
    };

    // Two-way binding Register Data
    const onChangeRegisterData = (e: { target: { name: string; value: string } }) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle when clicking register
    const handleRegister = async (e: any) => {
        e.preventDefault();

        try {
            const dataRegister = await registerUser(registerData);
            if (!dataRegister.success) {
                setAlert({ type: "danger", message: dataRegister.message });
            }
        } catch (error) {
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
            <h3 className="text-white text-center font-bold mb-8">
                Sign up for a free <br /> Music account.
            </h3>

            <form onSubmit={handleRegister} method="post" className="w-full">
                <AlertMessage info={alert} />

                <div className="relative">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        value={email}
                        onChange={onChangeRegisterData}
                        className="input"
                    />
                    <span className="absolute top-[10px] right-3 text-xl">
                        <AiOutlineMail />
                    </span>
                </div>
                <div className="relative">
                    <input
                        type={isHide ? "password" : "text"}
                        placeholder="Create a password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeRegisterData}
                        className="input"
                    />
                    <button type="button" onClick={showPass} className="absolute top-[10px] right-3 text-2xl">
                        {isHide && <AiOutlineEyeInvisible />}
                        {!isHide && <AiOutlineEye />}
                    </button>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="What should we call you?"
                        name="name"
                        required
                        value={name}
                        onChange={onChangeRegisterData}
                        className="input"
                    />
                    <span className="absolute top-[10px] right-3 text-xl">
                        <AiOutlineQuestionCircle />
                    </span>
                </div>
                <button type="submit" className="btn bg-btn my-4">
                    Continue
                </button>
            </form>

            <Link to="/" className="my-4 text-tGray font-bold hover:text-white">
                Back
            </Link>

            <Link to="/login" className="mb-12 text-sm text-tGray font-semibold">
                Already account? <span className="underline uppercase text-white">login</span>
            </Link>
        </>
    );
}

export default Register;
