import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import defaultAvatar from "@assets/images/defaultAvatar.png";
import ModalEditProfile from "./ModalEditProfile";
import { average } from "color.js";
import Header from "../../components/Header";
import PlaylistItem from "../components/PlaylistItem";
import { Link } from "react-router-dom";

function Profile() {
    const {
        authState: { user },
        getPlaylists,
    } = useContext(AuthContext);
    const [isShowModal, setIsShowModal] = useState(false);
    const [publicPlaylists, setPublicPlaylists] = useState([]);
    const avatar = user.avatar || defaultAvatar;

    // Call Api get first 5 Public Playlists of User
    const callGetPlaylists = async () => {
        const idPublicPlaylists = user.publicPlaylists.slice(0, 5);
        const data = await getPlaylists({ _id: idPublicPlaylists });
        if (data.success) {
            const userPlaylists = idPublicPlaylists.map((playlistId: string) => {
                const index = data.playlists.findIndex((playlist: any) => playlist._id === playlistId);
                return data.playlists[index];
            });
            setPublicPlaylists(userPlaylists);
        }
    };

    // Function render gender to Vietnamese
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

    // Change font-size according text length
    const getFontSize = (textLength: any) => {
        let fontSize = "md:text-[4rem] md:leading-[4rem] lg:text-[5rem] lg:leading-[5rem]";
        if (textLength >= 20) {
            fontSize = "lg:text-[4rem] lg:leading-[4rem]";
        }
        return fontSize;
    };
    useEffect(() => {
        const profileHeader = document.querySelector(".profileHeader") as HTMLElement;
        average(`${avatar}`, { format: "hex" }).then((color) => {
            if (profileHeader) {
                profileHeader.style.backgroundColor = `${color}`;
                profileHeader.style.boxShadow = `0 50px 200px ${color}`;
            }
        });
    }, [avatar]);
    useEffect(() => {
        callGetPlaylists();
    }, []);

    return (
        <div>
            <Header offsetBg={212} offsetContent={212}>
                <div className="text-2xl font-bold">{user.name}</div>
            </Header>
            <div className="profileHeader h-[340px] px-4 pt-[124px] lg:px-8 lg:pt-[84px] pb-6 flex gap-8 text-xs md:text-sm">
                <div
                    className="lg:min-w-[232px] lg:h-[232px] w-48 h-48 min-w-[192px] overflow-hidden shadow-[0_20px_50px_rgba(0,_0,_0,_0.7)] rounded-full cursor-pointer"
                    onClick={showProfileModal}
                >
                    <img src={avatar} alt="Avatar" className=" object-cover lg:w-[232px] lg:h-[232px] w-48 h-48" />
                </div>
                <div className="flex flex-col justify-end gap-2">
                    <span className="text-sm font-bold">Hồ sơ</span>
                    <p
                        className={`font-bold my-2 cursor-pointer text-5xl ${getFontSize(user.name.length)}`}
                        onClick={showProfileModal}
                    >
                        {user.name}
                    </p>

                    <button
                        className="text-primary text-sm md:text-base h-10 min-h-[40px] w-32 rounded-full font-semibold opacity-90 hover:opacity-100 shadow-lg shadow-brown bg-transparent bg-white hover:scale-105"
                        onClick={showProfileModal}
                    >
                        Sửa hồ sơ
                    </button>
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
            </div>
            <div className="spaceContent">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold mb-5">Playlist Công Khai</h2>
                    {user.publicPlaylists.length > 5 && (
                        <Link to={`/user/${user._id}/public-playlists`} className="opacity-60 font-bold">
                            Hiện tất cả
                        </Link>
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-1 auto-rows-[0] overflow-y-hidden gap-3 md:gap-4 lg:gap-6">
                    {publicPlaylists.map((item: any, index) => (
                        <PlaylistItem key={index} playlist={item} />
                    ))}
                </div>
            </div>

            {isShowModal && <ModalEditProfile showUpdateModal={setIsShowModal} onClick={hideProfileModal} />}
        </div>
    );
}
export default Profile;
