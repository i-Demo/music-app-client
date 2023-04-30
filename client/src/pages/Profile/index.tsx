import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import defaultAvatar from "@assets/images/defaultAvatar.png";
import ModalEditProfile from "./ModalEditProfile";
import { average } from "color.js";

function Profile() {
    const {
        authState: { user },
    } = useContext(AuthContext);
    const [isShowModal, setIsShowModal] = useState(false);
    const avatar = user.avatar || defaultAvatar;

    const renderGender = (gender: any) => {
        if (gender === "male") {
            return "Nam";
        } else if (gender === "female") {
            return "Nữ";
        } else if (gender === "other") {
            return "Khác";
        }
        return "";
    };

    const showProfileModal = () => {
        setIsShowModal(true);
    };

    const hideProfileModal = () => {
        setIsShowModal(false);
    };

    useEffect(() => {
        const profileHeader = document.querySelector(".profileHeader") as HTMLElement;
        average(`${avatar}`, { format: "hex" }).then((color) => {
            if (profileHeader) {
                profileHeader.style.backgroundColor = `${color}`;
                profileHeader.style.boxShadow = `0 50px 200px ${color}`;
            }
        });
    });
    return (
        <div>
            <div className="spaceHeader profileHeader flex flex-col md:flex-row gap-12 pl-14 ">
                <div
                    className="lg:w-[232px] lg:h-[232px] w-48 h-48 min-w-[192px] rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,_0,_0,_0.7)] cursor-pointer"
                    onClick={showProfileModal}
                >
                    <img
                        src={avatar}
                        alt="Avatar"
                        className=" object-cover lg:w-[232px] lg:h-[232px] w-48 h-48"
                    />
                </div>
                <div className="flex flex-col flex-wrap justify-end md:gap-4 pb-4">
                    <span className="text-sm font-bold">Hồ sơ</span>
                    <p className="text-7xl font-bold my-2 md:text-8xl cursor-pointer" onClick={showProfileModal}>
                        {user.name}
                    </p>
                </div>
            </div>
            <div className="spaceContent w-2/3 mx-auto">
                <table className="w-full border-collapse">
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
                            <td className="p-4 text-textGray opacity-60">Giới tính</td>
                            <td>{renderGender(user.gender)}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-4 text-textGray opacity-60">Ngày sinh</td>
                            <td>{user.birthday}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-4 text-textGray opacity-60">Quốc gia hoặc khu vực</td>
                            <td>Việt Nam</td>
                        </tr>
                    </tbody>
                </table>
                <div className="w-full mt-4 flex justify-end">
                    <button
                        className="btn shadow-lg shadow-brown bg-white hover:scale-105 mt-8 w-48"
                        onClick={showProfileModal}
                    >
                        Chỉnh sửa hồ sơ
                    </button>
                </div>
            </div>

            {isShowModal && <ModalEditProfile showUpdateModal={setIsShowModal} onClick={hideProfileModal} />}
        </div>
    );
}

export default Profile;