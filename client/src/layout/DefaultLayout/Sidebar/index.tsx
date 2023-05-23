import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/images/logo.svg";
import { AiOutlineHome, AiOutlineSearch, AiFillHeart } from "react-icons/ai";
import { FiMusic, FiStar } from "react-icons/fi";
import { MdAdd, MdLibraryMusic } from "react-icons/md";
import NavItem from "./NavItem";
import Playlists from "./Playlists";
import ModalCreatePlaylist from "../../../pages/components/ModalCreatePlaylist";

function Sidebar() {
    const [isShowModal, setIsShowModal] = useState(false);
    const handleCreatePlaylist = (e: any) => {
        e.preventDefault();
        setIsShowModal(true);
    };
    return (
        <nav className="w-48 md:w-60 bg-primary h-full min-h-0">
            <div className="h-full flex flex-col pt-2 mx-1">
                <Link to="/dashboard" className="w-full">
                    <img src={logo} alt="Logo" className="pr-5 mb-5" />
                </Link>

                <nav>
                    <div className="rounded-md bg-bgPlayingBar">
                        <NavItem to="/dashboard" icon={<AiOutlineHome className="text-2xl" />} title="Trang Chủ" />
                        <NavItem to="/search" icon={<AiOutlineSearch className="text-2xl" />} title="Tìm Kiếm" />
                        <NavItem to="/newPublish" icon={<FiMusic className="text-2xl" />} title="Nhạc Mới" />
                        <NavItem to="/top100" icon={<FiStar className="text-2xl" />} title="Top 100" />
                    </div>
                    <div className="rounded-md bg-bgPlayingBar my-2">
                        <NavItem
                            to="/library"
                            icon={<MdLibraryMusic className="text-2xl" />}
                            title="Thư Viện"
                            content={
                                <button className="text-2xl opacity-60 hover:opacity-80" onClick={handleCreatePlaylist}>
                                    <MdAdd />
                                </button>
                            }
                        />
                        <div className="pl-2">
                            <NavItem
                                to="/collection/favorite"
                                icon={<AiFillHeart className="text-2xl text-brown" />}
                                title="Yêu Thích"
                            />
                        </div>
                    </div>
                </nav>

                <hr className="mx-4 mb-2 border-secondary opacity-60" />
                <div className="overflow-y-auto scrollbar rounded-md bg-bgPlayingBar">
                    <Playlists />
                </div>
            </div>
            {isShowModal && <ModalCreatePlaylist setIsShowModal={setIsShowModal} />}
        </nav>
    );
}

export default Sidebar;
