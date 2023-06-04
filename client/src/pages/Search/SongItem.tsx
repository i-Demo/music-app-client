import { useContext, useState, useEffect } from "react";
import { SongContext } from "../../contexts/songContext";
import Tippy from "@tippyjs/react";
import TippyHeadless from "@tippyjs/react/headless";

import { BsFillPlayFill } from "react-icons/bs";
import { AuthContext } from "../../contexts/authContext";
import ToastMessage from "../../components/ToastMessage";
import { AiFillFolderAdd, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import SongOptions from "../../components/SongOptions";
import { SlOptions } from "react-icons/sl";
import AddToPPlaylistOption from "../../components/SongOptions/AddToPlaylistOption";

interface SongItemType {
    song: any;
    songs: [];
}
function SongItem({ song, songs }: SongItemType) {
    const { authState, authDispatch } = useContext(AuthContext);
    const { songState, pauseSongDispatch, setSongDispatch, likeSong } = useContext(SongContext);
    const [toast, setToast] = useState<JSX.Element | null>(null);
    const [visible, setVisible] = useState(false);

    // Convert Time Song from Number to "00:00"
    const convertTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);
        const stringTime = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        return stringTime;
    };
    // Handle Like Song
    const handleClickLikeSong = async (idSong: string) => {
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
    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (toast) {
            timer = setTimeout(() => setToast(null), 3000);
        }
        return () => clearTimeout(timer);
    }, [toast]);

    return (
        <div
            className={`group flex items-center justify-between gap-4 text-sm text-tGray px-4 h-14 rounded hover:bg-[#313131] hover:text-white ${
                songState.song._id === song._id && songState.listSongsId === song._id ? "bg-bgTooltip" : ""
            }`}
            onDoubleClick={() => setSongDispatch(song, [song], song._id)}
        >
            <div className="w-[65%] flex gap-4">
                <div className="flex items-center relative">
                    <img src={song.image} alt="SongImage" className="w-10 min-w-[40px] h-10 object-cover" />
                    <div className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer invisible group-hover:visible flex items-center justify-center">
                        {songState.isPlaying &&
                            songState.song._id === song._id &&
                            songState.listSongsId === song._id && (
                                <div
                                    className="text-3xl visible w-full h-full flex items-center justify-center"
                                    onClick={() => pauseSongDispatch()}
                                >
                                    <img
                                        src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                                        alt="Play"
                                        className="w-4"
                                    />
                                </div>
                            )}
                        {(songState.listSongsId !== song._id ||
                            songState.song._id !== song._id ||
                            !songState.isPlaying) && (
                            <Tippy
                                content={`Phát ${song.name} của ${song.artist}`}
                                delay={[200, 0]}
                                className="tooltip text-xs"
                            >
                                <div
                                    className={`${
                                        songState.song._id === song._id && songState.listSongsId === song._id
                                            ? "visible"
                                            : ""
                                    }`}
                                    onClick={() => setSongDispatch(song, [song], song._id)}
                                >
                                    <BsFillPlayFill className="text-2xl" />
                                </div>
                            </Tippy>
                        )}
                    </div>
                </div>
                <div className="pr-4 truncate max-w-[220px] md:max-w-[120px] lg:max-w-[250px]">
                    <Tippy content={song.name} placement="top-start" delay={[200, 0]} className="tooltip text-xs">
                        <p
                            className={`text-sm lg:text-base whitespace-nowrap truncate cursor-pointer hover:underline ${
                                songState.song._id === song._id && songState.listSongsId === song._id
                                    ? "text-btn"
                                    : "text-white"
                            }`}
                        >
                            {song.name}
                        </p>
                    </Tippy>
                    <span>{song.artist}</span>
                </div>
            </div>

            <div className="w-[30%] flex justify-around">
                <Tippy
                    content={
                        authState.user.likedSongs.findIndex((songInfo: { id: string }) => songInfo.id === song._id) !==
                        -1
                            ? "Xoá khỏi thư viện"
                            : "Lưu vào thư viện"
                    }
                    delay={[200, 0]}
                    className="tooltip"
                >
                    <button
                        className="opacity-70 hover:opacity-100 invisible group-hover:visible"
                        onClick={() => handleClickLikeSong(song._id)}
                        onDoubleClick={(e) => e.stopPropagation()}
                    >
                        {authState.user.likedSongs.findIndex((songInfo: { id: string }) => songInfo.id === song._id) !==
                        -1 ? (
                            <AiFillHeart className="text-xl text-btn" />
                        ) : (
                            <AiOutlineHeart className="text-xl" />
                        )}
                    </button>
                </Tippy>
                <span className="group-hover:text-tGray">{convertTime(song.duration)}</span>
                <TippyHeadless
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
                                onClick={() => handleClickLikeSong(song._id)}
                            >
                                {authState.user.likedSongs.findIndex(
                                    (likeSong: { id: string }) => likeSong.id === song._id
                                ) !== -1 ? (
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

                            <AddToPPlaylistOption setVisible={setVisible} songId={song._id} setToast={setToast}>
                                <button
                                    className="menu justify-start cursor-pointer"
                                    onDoubleClick={(e) => e.stopPropagation()}
                                >
                                    <AiFillFolderAdd className="text-xl" />
                                    <span>Thêm vào</span>
                                </button>
                            </AddToPPlaylistOption>
                        </div>
                    )}
                >
                    <div onClick={() => setVisible(!visible)}>
                        <Tippy content="Khác" delay={[200, 0]} className="tooltip">
                            <button
                                className="opacity-70 hover:opacity-100 invisible group-hover:visible"
                                onDoubleClick={(e) => e.stopPropagation()}
                            >
                                <SlOptions className="text-base" />
                            </button>
                        </Tippy>
                    </div>
                </TippyHeadless>
            </div>
            <ToastMessage content={toast} />
        </div>
    );
}

export default SongItem;
