import { Link } from "react-router-dom";
import logo from "@assets/images/logo.svg";
import { AiOutlineHome, AiOutlineSearch, AiFillHeart } from "react-icons/ai";
import { FiMusic, FiStar } from "react-icons/fi";
import { MdMusicVideo, MdFeaturedPlayList } from "react-icons/md";
import NavItem from "./NavItem";

function Sidebar() {
    return (
        <nav className="w-60 bg-primary h-full min-h-0">
            <div className="h-full flex flex-col pt-2">
                <Link to="/dashboard" className="w-full">
                    <img src={logo} alt="Logo" className="pr-5 mb-5" />
                </Link>

                <div>
                    <nav>
                        <NavItem to="/dashboard" icon={<AiOutlineHome className="text-2xl" />} title="Trang Chủ" />
                        <NavItem to="/search" icon={<AiOutlineSearch className="text-2xl" />} title="Tìm Kiếm" />
                        <NavItem to="/newPublish" icon={<FiMusic className="text-2xl" />} title="Nhạc Mới" />
                        <NavItem to="/top100" icon={<FiStar className="text-2xl" />} title="Top 100" />
                        <NavItem to="/mv" icon={<MdMusicVideo className="text-2xl" />} title="MV" />
                    </nav>
                </div>

                <hr className="mx-6 mt-2 border-secondary" />

                <div className="overflow-y-auto scrollbar">
                    <div className="px-6 my-4 font-bold">Thư Viện</div>
                    <nav className="px-2 mb-4">
                        <NavItem
                            to="/library/favorite"
                            icon={<AiFillHeart className="text-2xl text-brown" />}
                            title="Yêu Thích"
                        />
                        <NavItem
                            to="/library/playlist"
                            icon={<MdFeaturedPlayList className="text-2xl" />}
                            title="Playlist"
                        />
                    </nav>
                    <ul className="px-6 flex flex-col gap-2">
                        <li className="">Playlist 1</li>
                        <li>Playlist 2</li>
                        <li>Playlist 3</li>
                        <li>Playlist 4</li>
                        <li>Playlist 3</li>
                        <li>Playlist 3</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 4</li>
                        <li>Playlist 48</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
