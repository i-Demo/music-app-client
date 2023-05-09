import logo from "@assets/images/logo2.svg";
function Error({ error }: any) {
    return (
        <div className="bg-primary w-screen h-screen flex flex-col justify-center items-center gap-4">
            <img src={logo} alt="Logo" />
            <h3 className="font-bold mt-8">Đã xảy ra lỗi, vui lòng thử lại sau</h3>
            {/* <p className="mb-8 opacity-60 text-sm">{error}</p> */}
            <a
                href="/"
                className="btn bg-white whitespace-nowrap w-36 hover:scale-105 flex justify-center items-center"
            >
                Trang chủ
            </a>
        </div>
    );
}

export default Error;
