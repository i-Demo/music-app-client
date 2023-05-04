import logo from "@assets/images/logo2.svg";
import { Link } from "react-router-dom";
function NotFound() {
    return (
        <div className="bg-primary w-screen h-screen flex flex-col justify-center items-center gap-4">
            <img src={logo} alt="Logo" />
            <h3 className="font-bold mt-8">Không có trang này</h3>
            <p className="mb-8 opacity-60 text-sm">Đã xảy ra lỗi, vui lòng thử lại sau</p>

            <a href="/" className="btn bg-white whitespace-nowrap w-36 hover:scale-105 flex justify-center items-center">
                Trang chủ
            </a>
        </div>
    );
}

export default NotFound;
