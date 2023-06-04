import { useContext, useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import { SongContext } from "../../../contexts/songContext";
import { AuthContext } from "../../../contexts/authContext";
import PlaylistOptions from "../PlaylistOptions";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import ToastMessage from "../../../components/ToastMessage";

interface ActionSidebarType {
    songs: Array<object>;
    id: string;
    playlist?: object;
    setIsShowModalUpdate?: any;
}
function ActionSidebar({ songs, id, playlist, setIsShowModalUpdate }: ActionSidebarType) {
    const { songState, playSongDispatch, pauseSongDispatch, setSongDispatch } = useContext(SongContext);
    const { authState, togglePlaylist } = useContext(AuthContext);
    const [toast, setToast] = useState<JSX.Element | null>(null);
    
    // Add/Remove Playlist to/from library
    const handleTogglePlaylist = async () => {
        const response = await togglePlaylist(id);
        if (response.success) {
            response.message === "Added playlist to library"
                ? setToast(
                      <span className="text-sm font-semibold">
                          Đã lưu vào <span className="font-extrabold">Thư viện</span>
                      </span>
                  )
                : setToast(
                      <span className="text-sm font-semibold">
                          Đã xoá khỏi <span className="font-extrabold">Thư viện</span>
                      </span>
                  );
        }
    };
    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (toast) {
            timer = setTimeout(() => setToast(null), 3000);
        }
        return () => clearTimeout(timer);
    }, [toast]);

    return (
        <>
            <div className="spaceContent flex gap-8 items-center">
                {songs.length !== 0 && (
                    <>
                        {songState.isPlaying && songState.listSongsId === id && (
                            <button
                                className="text-primary bg-btn rounded-full w-14 h-14 flex justify-center items-center hover:scale-105"
                                onClick={() => pauseSongDispatch()}
                            >
                                <MdOutlinePause className="text-4xl" />
                            </button>
                        )}
                        {(!songState.isPlaying || songState.listSongsId !== id) && (
                            <button
                                className="text-primary bg-btn rounded-full w-14 h-14 flex justify-center items-center hover:scale-105"
                                onClick={
                                    songState.listSongsId === id
                                        ? () => playSongDispatch()
                                        : () => setSongDispatch(songs[0], songs, id)
                                }
                            >
                                <MdPlayArrow className="text-4xl" />
                            </button>
                        )}
                        {playlist && !authState.user.myPlaylists.some((myPlaylist: any) => myPlaylist._id === id) && (
                            <Tippy
                                content={
                                    authState.user.playlists.includes(id) ? "Xoá khỏi thư viện" : "Lưu vào thư viện"
                                }
                                delay={[200, 0]}
                                className="tooltip"
                            >
                                <button className="opacity-90 hover:opacity-100" onClick={handleTogglePlaylist}>
                                    {authState.user.playlists.includes(id) ? (
                                        <AiFillHeart className="text-4xl text-btn" />
                                    ) : (
                                        <AiOutlineHeart className="text-4xl" />
                                    )}
                                </button>
                            </Tippy>
                        )}
                    </>
                )}

                {playlist && (
                    <PlaylistOptions
                        playlist={playlist}
                        setIsShowModalUpdate={setIsShowModalUpdate}
                        handleTogglePlaylist={handleTogglePlaylist}
                        setToast={setToast}
                    >
                        <Tippy content="Tuỳ chọn khác" delay={[200, 0]} className="tooltip">
                            <button className="opacity-70 hover:opacity-100">
                                <SlOptions className="text-2xl" />
                            </button>
                        </Tippy>
                    </PlaylistOptions>
                )}
            </div>
            <ToastMessage content={toast} />
        </>
    );
}

export default ActionSidebar;
