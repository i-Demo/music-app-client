import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import Header from "../../components/Header";
import PlaylistItem from "../components/PlaylistItem";
import Loading from "../../components/Loading";
import ModalCreatePlaylist from "../components/ModalCreatePlaylist";
import { MdAddCircleOutline } from "react-icons/md";

function Library() {
    const [isLoading, setIsLoading] = useState(true);
    const [isShowModal, setIsShowModal] = useState(false);
    const [currentTab, setCurrentTab] = useState("playlists");
    const { authState, getPlaylists } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    // Call Api get All Playlists of User
    const callGetPlaylists = async () => {
        const data = await getPlaylists({ _id: authState.user.playlists });
        if (data.success) {
            const userPlaylists = authState.user.playlists.map((playlistId: string) => {
                const index = data.playlists.findIndex((playlist: any) => playlist._id === playlistId);
                return data.playlists[index];
            });
            setData(userPlaylists);
            setIsLoading(false);
        } else {
            navigate("/error");
        }
    };

    useEffect(() => {
        if (authState.user.playlists.length !== 0) {
            callGetPlaylists();
        } else {
            setIsLoading(false);
        }
    }, [authState.user.playlists]);

    if (isLoading) return <Loading />;
    return (
        <div>
            <Header offsetBg={0} offsetContent={0}>
                <div className="flex text-sm font-bold">
                    <button
                        className={`px-4 py-2 rounded whitespace-nowrap leading-7 ${
                            currentTab === "playlists" ? "bg-[#333] border-none" : ""
                        } `}
                        onClick={() => setCurrentTab("playlists")}
                    >
                        Playlists
                    </button>
                    <button
                        className={`px-4 py-2 rounded whitespace-nowrap leading-7 ${
                            currentTab === "albums" ? "bg-[#333] border-none" : ""
                        } `}
                        onClick={() => setCurrentTab("albums")}
                    >
                        Albums
                    </button>
                </div>
            </Header>
            <div className="spaceContent mt-16 min-w-[486px]">
                <div className="text-xl font-extrabold mb-4 flex gap-8">
                    <span>Playlist</span>
                    <Tippy content="Tạo Playlist mới" placement="bottom" className="tooltip">
                        <button className="text-3xl" onClick={() => setIsShowModal(true)}>
                            <MdAddCircleOutline />
                        </button>
                    </Tippy>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
                    <Link
                        to="/collection/favorite"
                        className="backgroundLinear col-span-2 p-5 rounded-md flex flex-col justify-end min-h-[256px]"
                    >
                        <p className="text-3xl font-bold mb-4">Bài hát đã thích</p>
                        <span className="text-sm font-bold">{`${authState.user.likedSongs.length} bài hát đã thích`}</span>
                    </Link>
                    {data.length === 0 && (
                        <button
                            onClick={() => setIsShowModal(true)}
                            className="col-span-1 p-4 bg-bgTooltip rounded-md border border-secondary flex flex-col justify-center items-center hover:text-violet-400 min-h-[256px] max-w-[196px]"
                        >
                            <div className="text-3xl mb-2">
                                <MdAddCircleOutline />
                            </div>
                            <span>Tạo playlist mới</span>
                        </button>
                    )}
                    {data.map((item: any, index) => (
                        <PlaylistItem key={index} playlist={item} />
                    ))}
                </div>
            </div>
            {isShowModal && <ModalCreatePlaylist setIsShowModal={setIsShowModal} />}
        </div>
    );
}

export default Library;
