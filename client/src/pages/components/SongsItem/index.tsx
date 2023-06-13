import { useContext, useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react";
import SongOptions from "../../../components/SongOptions";
import { AuthContext } from "../../../contexts/authContext";
import { SongContext } from "../../../contexts/songContext";
import moment from "moment";
import ToastMessage from "../../../components/ToastMessage";
import { SlOptions } from "react-icons/sl";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi2";

interface SongsItem {
    songs: Array<object>;
    id: string;
    addedAt?: Array<string>;
    offsetScroll?: number;
    removeSongOfClient?: any;
}
function SongsItem({ songs, id, addedAt = [], offsetScroll = 380, removeSongOfClient }: SongsItem) {
    const { authState, authDispatch } = useContext(AuthContext);
    const { songState, pauseSongDispatch, setSongDispatch, likeSong } = useContext(SongContext);
    const songsTitle = useRef<HTMLDivElement>(null);
    const [toast, setToast] = useState<JSX.Element | null>(null);

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
        // Add event when scroll
        const dashboard = document.querySelector(".dashboard") as HTMLElement;
        const handleScroll = () => {
            if (songsTitle.current) {
                if (dashboard.scrollTop > offsetScroll) {
                    songsTitle.current.style.position = "absolute";
                    songsTitle.current.style.backgroundColor = "#181818";
                    songsTitle.current.style.padding = "0 48px";
                } else {
                    songsTitle.current.style.position = "static";
                    songsTitle.current.style.backgroundColor = "transparent";
                    songsTitle.current.style.padding = "0 16px";
                }
            }
        };
        dashboard.addEventListener("scroll", handleScroll);
        () => {
            dashboard.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (toast) {
            timer = setTimeout(() => setToast(null), 3000);
        }
        return () => clearTimeout(timer);
    }, [toast]);
    return (
        <div>
            <div className="pl-4 lg:px-8 text-sm text-tGray">
                <div className="h-9 mb-6">
                    <div
                        ref={songsTitle}
                        className="h-9 px-4 flex items-center justify-between gap-4 text-sm border-b border-secondary top-16 right-0 left-0 z-[1]"
                    >
                        <div className="w-4">#</div>
                        <div className="w-[65%] md:w-[40%] lg:w-[35%]">Tiêu đề</div>
                        <div className="md:w-[30%] md:max-w-[150px] lg:w-[25%] lg:max-w-[25%] hidden md:block">
                            Album
                        </div>
                        <div className="hidden lg:block grow">Ngày thêm</div>
                        <div className="w-[30%] md:w-[20%] lg:w-[15%] flex justify-center">
                            <HiOutlineClock />
                        </div>
                    </div>
                </div>
                {songs.map((song: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className={`group flex items-center justify-between gap-4 px-4 h-14 rounded hover:bg-[#313131] hover:text-white max-w-full ${
                                songState.song._id === song._id && songState.listSongsId === id ? "bg-bgTooltip" : ""
                            }`}
                            onDoubleClick={() => setSongDispatch(song, songs, id)}
                        >
                            <div className="w-4 relative">
                                <span
                                    className={`group-hover:invisible ${
                                        songState.song._id === song._id && songState.listSongsId === id
                                            ? "invisible"
                                            : "visible"
                                    }`}
                                >
                                    {index + 1}
                                </span>
                                <div className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer invisible group-hover:visible flex items-center justify-center">
                                    {songState.isPlaying &&
                                        songState.song._id === song._id &&
                                        songState.listSongsId === id && (
                                            <div
                                                className="text-3xl visible w-full h-full flex items-center justify-center"
                                                onClick={() => pauseSongDispatch()}
                                            >
                                                <img
                                                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                                                    alt="Play"
                                                    className="w-6"
                                                />
                                            </div>
                                        )}
                                    {(songState.listSongsId !== id ||
                                        songState.song._id !== song._id ||
                                        !songState.isPlaying) && (
                                        <Tippy
                                            content={`Phát ${song.name} của ${song.artist}`}
                                            delay={[200, 0]}
                                            className="tooltip text-xs"
                                        >
                                            <div
                                                className={`${
                                                    songState.song._id === song._id && songState.listSongsId === id
                                                        ? "visible"
                                                        : ""
                                                }`}
                                                onClick={() => setSongDispatch(song, songs, id)}
                                            >
                                                <BsFillPlayFill className="text-2xl" />
                                            </div>
                                        </Tippy>
                                    )}
                                </div>
                            </div>
                            <div className="w-[65%] md:w-[40%] lg:w-[35%] truncate flex gap-4">
                                <div className="flex items-center">
                                    <img
                                        src={song.image}
                                        alt="SongImage"
                                        className="w-10 min-w-[40px] h-10 object-cover"
                                    />
                                </div>
                                <div className="pr-4 truncate max-w-[220px] md:max-w-[120px] lg:max-w-[250px]">
                                    <Tippy
                                        content={song.name}
                                        placement="top-start"
                                        delay={[200, 0]}
                                        className="tooltip text-xs"
                                    >
                                        <p
                                            className={`text-sm lg:text-base whitespace-nowrap truncate cursor-pointer hover:underline ${
                                                songState.song._id === song._id && songState.listSongsId === id
                                                    ? "text-btn"
                                                    : "text-white"
                                            }`}
                                        >
                                            {song.name}
                                        </p>
                                    </Tippy>
                                    <span className="text-">{song.artist}</span>
                                </div>
                            </div>

                            <div className="md:w-[30%] md:max-w-[150px] lg:w-[25%] lg:max-w-[250px] hidden md:block truncate">
                                <span className="cursor-pointer hover:underline">{song.name}</span>
                            </div>

                            {addedAt.length !== 0 && (
                                <div className="hidden lg:block grow group-hover:text-tGray">{`${moment(
                                    addedAt[index]
                                ).fromNow()}`}</div>
                            )}

                            <div className="w-[30%] md:w-[20%] lg:w-[15%] flex justify-around">
                                <Tippy
                                    content={
                                        authState.user.likedSongs.findIndex(
                                            (songInfo: { id: string }) => songInfo.id === song._id
                                        ) !== -1
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
                                        {authState.user.likedSongs.findIndex(
                                            (songInfo: { id: string }) => songInfo.id === song._id
                                        ) !== -1 ? (
                                            <AiFillHeart className="text-xl text-btn" />
                                        ) : (
                                            <AiOutlineHeart className="text-xl" />
                                        )}
                                    </button>
                                </Tippy>
                                <span className="group-hover:text-tGray">{convertTime(song.duration)}</span>
                                <SongOptions
                                    idPlaylist={id}
                                    idSong={song._id}
                                    index={index}
                                    removeSongOfClient={removeSongOfClient}
                                >
                                    <Tippy content="Khác" delay={[200, 0]} className="tooltip">
                                        <button
                                            className="opacity-70 hover:opacity-100 invisible group-hover:visible"
                                            onDoubleClick={(e) => e.stopPropagation()}
                                        >
                                            <SlOptions className="text-base" />
                                        </button>
                                    </Tippy>
                                </SongOptions>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ToastMessage content={toast} />
        </div>
    );
}

export default SongsItem;
