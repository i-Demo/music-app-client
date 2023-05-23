import { useContext, useState, useEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import { AuthContext } from "../../contexts/authContext";
import { SongContext } from "../../contexts/songContext";
import ToastMessage from "../ToastMessage";
import AddToPPlaylistOption from "./AddToPlaylistOption";
import { AiFillFolderAdd, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdOutlinePlaylistRemove } from "react-icons/md";

interface SongOptionsType {
    children: JSX.Element;
    idPlaylist?: string;
    idSong: string;
    index: number;
    removeSongOfClient?: any;
}
function SongOptions({ children, idPlaylist = "", idSong, index, removeSongOfClient }: SongOptionsType) {
    const { authState, authDispatch } = useContext(AuthContext);
    const { likeSong, removeSong } = useContext(SongContext);
    const [visible, setVisible] = useState(false);
    const [toast, setToast] = useState<JSX.Element | null>(null);

    const handleClickLikeSong = async (idSong: string) => {
        setVisible(false);
        try {
            const responseData = await likeSong(idSong);
            if (responseData.success) {
                responseData.message === "Added song to your liked songs"
                    ? setToast(
                          <span className="text-sm font-semibold">
                              Đã thêm vào <span className="font-extrabold">Bài hát đã thích</span> của bạn
                          </span>
                      )
                    : setToast(
                          <span className="text-sm font-semibold">
                              Đã xoá khỏi <span className="font-extrabold">Bài hát đã thích</span> của bạn
                          </span>
                      );
                authDispatch(responseData.user);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleRemoveSong = async () => {
        setVisible(false);
        const response = await removeSong(idPlaylist, idSong);
        if (response.success) {
            removeSongOfClient && removeSongOfClient(index);
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
            <Tippy
                interactive
                visible={visible}
                onClickOutside={() => setVisible(false)}
                offset={[0, 12]}
                delay={[0, 0]}
                placement="bottom-start"
                render={(attrs) => (
                    <div className="tooltip flex flex-col p-1 min-w-[196px] min-h-max" tabIndex={-1} {...attrs}>
                        <button
                            className="menu justify-start cursor-pointer"
                            onClick={() => handleClickLikeSong(idSong)}
                        >
                            {authState.user.likedSongs.findIndex((song: { id: string }) => song.id === idSong) !==
                            -1 ? (
                                <>
                                    <AiFillHeart className="text-xl text-btn" />
                                    <span>Xoá khỏi Yêu Thích</span>
                                </>
                            ) : (
                                <>
                                    <AiOutlineHeart className="text-xl" />
                                    <span>Lưu vào Yêu Thích</span>
                                </>
                            )}
                        </button>

                        {authState.user.myPlaylists.findIndex((playlist: any) => playlist._id === idPlaylist) === -1 ? (
                            <AddToPPlaylistOption setVisible={setVisible} songId={idSong} setToast={setToast}>
                                <button
                                    className="menu justify-start cursor-pointer"
                                    onDoubleClick={(e) => e.stopPropagation()}
                                >
                                    <AiFillFolderAdd className="text-xl" />
                                    <span>Thêm vào</span>
                                </button>
                            </AddToPPlaylistOption>
                        ) : (
                            <button
                                className="menu justify-start cursor-pointer"
                                onDoubleClick={(e) => e.stopPropagation()}
                                onClick={handleRemoveSong}
                            >
                                <MdOutlinePlaylistRemove className="text-xl" />
                                <span>Xoá khỏi danh sách phát này</span>
                            </button>
                        )}
                    </div>
                )}
            >
                <div onClick={() => setVisible(!visible)}>{children}</div>
            </Tippy>
            <ToastMessage content={toast} />
        </>
    );
}

export default SongOptions;
