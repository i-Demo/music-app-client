import { useContext } from "react";
import Tippy from "@tippyjs/react";
import { SongContext } from "../../../contexts/songContext";
import { AuthContext } from "../../../contexts/authContext";
import PlaylistOptions from "../PlaylistOptions";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";

interface ActionSidebarType {
    songs: Array<object>;
    id: string;
    playlist?: object;
    setIsShowModalUpdate?: any;
}
function ActionSidebar({ songs, id, playlist, setIsShowModalUpdate }: ActionSidebarType) {
    const { songState, playSongDispatch, pauseSongDispatch, setSongDispatch } = useContext(SongContext);
    const { authState } = useContext(AuthContext);
    return (
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
                    {playlist && !authState.user.myPlaylists.some((playlist: any) => playlist._id === id) && (
                        <Tippy
                            content={
                                authState.user.likedSongs.findIndex((songInfo: { id: string }) => {}) !== -1
                                    ? "Xoá khỏi thư viện"
                                    : "Lưu vào thư viện"
                            }
                            delay={[200, 0]}
                            className="tooltip"
                        >
                            <button className="opacity-70 hover:opacity-100 mx-8" onClick={() => {}}>
                                {authState.user.likedSongs.findIndex((songInfo: { id: string }) => {}) !== -1 ? (
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
                <PlaylistOptions playlist={playlist} setIsShowModalUpdate={setIsShowModalUpdate}>
                    <Tippy content="Tuỳ chọn khác" delay={[200, 0]} className="tooltip">
                        <button className="opacity-70 hover:opacity-100">
                            <SlOptions className="text-2xl" />
                        </button>
                    </Tippy>
                </PlaylistOptions>
            )}
        </div>
    );
}

export default ActionSidebar;
