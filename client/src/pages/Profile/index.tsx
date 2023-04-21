import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import defaultAvatar from "@assets/images/defaultAvatar.webp";
import ModalEditProfile from "./ModalEditProfile";

function Profile() {
    const {
        authState: { user },
    } = useContext(AuthContext);
    const [isShowModal, setIsShowModal] = useState(false);

    const hideProfileModal = () => {
        setIsShowModal(false);
    };

    useEffect(() => {});
    return (
        <div>
            <div className="md:flex w-full gap-8 mt-10">
                <div className="lg:w-[232px] lg:h-[232px] w-48 h-48 rounded-full overflow-hidden">
                    <img src={user.avatar || defaultAvatar} alt="Avatar" />
                </div>
                <div className="flex-1 mt-8">
                    <span className="text-sm font-bold">Hồ sơ</span>
                    <p className="text-5xl font-bold my-2 md:text-6xl">{user.name}</p>
                    <table className="table-fixed w-full border-collapse">
                        <colgroup>
                            <col className="w-1/3" />
                            <col className="w-2/3" />
                        </colgroup>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-4 text-textGray opacity-60">Email</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 text-textGray opacity-60">Gender</td>
                                <td>{user.gender}</td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 text-textGray opacity-60">Ngày sinh</td>
                                <td>
                                    {user.day &&
                                        user.month &&
                                        user.year &&
                                        `${user.day} tháng ${user.month}, ${user.year}`}
                                </td>
                            </tr>
                            <tr className="border-b">
                                <td className="p-4 text-textGray opacity-60">Quốc gia hoặc khu vực</td>
                                <td>Việt Nam</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="w-48">
                        <button
                            className="btn shadow-lg shadow-brown bg-white hover:scale-105 mt-8"
                            onClick={() => setIsShowModal(true)}
                        >
                            Chỉnh sửa hồ sơ
                        </button>
                    </div>
                </div>
            </div>
            {isShowModal && <ModalEditProfile user onClick={hideProfileModal} />}
        </div>
    );
}

export default Profile;
