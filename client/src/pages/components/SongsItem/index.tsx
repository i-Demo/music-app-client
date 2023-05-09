import { useContext, useEffect, useRef } from "react";
import Tippy from "@tippyjs/react";
import TippyHeadless from "../../../components/TippyHeadless";
import { AuthContext } from "../../../contexts/authContext";
import { SongContext } from "../../../contexts/songContext";
import { SlOptions } from "react-icons/sl";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import moment from "moment";
import { HiOutlineClock } from "react-icons/hi2";

interface SongsItem {
    songs: Array<object>;
    addedAt: Array<string>;
}
function SongsItem({ songs, addedAt }: SongsItem) {
    const { authState, authDispatch } = useContext(AuthContext);
    const { songState, pauseSongDispatch, setSongDispatch, likeSong } = useContext(SongContext);
    const newSongsRowTitle = useRef<HTMLDivElement>(null);

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
            authDispatch(responseData.user);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // Add event when scroll
        const dashboard = document.querySelector(".dashboard") as HTMLElement;
        const handleScroll = () => {
            if (newSongsRowTitle.current) {
                if (dashboard.scrollTop > 408) {
                    newSongsRowTitle.current.style.position = "absolute";
                    newSongsRowTitle.current.style.backgroundColor = "#181818";
                    newSongsRowTitle.current.style.padding = "0 48px";
                } else {
                    newSongsRowTitle.current.style.position = "static";
                    newSongsRowTitle.current.style.backgroundColor = "transparent";
                    newSongsRowTitle.current.style.padding = "0 16px";
                }
            }
        };
        dashboard.addEventListener("scroll", handleScroll);
        () => {
            dashboard.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div>
            <div
                ref={newSongsRowTitle}
                className="newSongsRowTitle flex items-center justify-between gap-4 px-4 h-9 text-sm border-b border-secondary mb-6 top-16 right-0 left-0 z-10"
            >
                <div className="w-4">#</div>
                <div className="w-[65%] md:w-[40%] lg:w-[35%]">Tiêu đề</div>
                <div className="md:w-[30%] md:max-w-[150px] lg:w-[25%] lg:max-w-[25%] hidden md:block">Album</div>
                <div className="hidden lg:block grow">Ngày thêm</div>
                <div className="w-[30%] md:w-[20%] lg:w-[15%] flex justify-center">
                    <HiOutlineClock />
                </div>
            </div>
            {songs.map((song: any, index: number) => {
                return (
                    <div
                        key={index}
                        className={`group flex items-center justify-between gap-4 px-4 h-14 rounded hover:bg-[#313131] hover:text-white ${
                            songState.song._id === song._id && songState.listSongsId === "favorite"
                                ? "bg-bgTooltip"
                                : ""
                        }`}
                        onDoubleClick={() => setSongDispatch(song, songs, "favorite")}
                    >
                        <div className="w-4 relative">
                            <span
                                className={`group-hover:invisible ${
                                    songState.song._id === song._id && songState.listSongsId === "favorite"
                                        ? "invisible"
                                        : "visible"
                                }`}
                            >
                                {index + 1}
                            </span>
                            <div className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer invisible group-hover:visible flex items-center justify-center">
                                {songState.isPlaying &&
                                    songState.song._id === song._id &&
                                    songState.listSongsId === "favorite" && (
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
                                {(songState.listSongsId !== "favorite" ||
                                    songState.song._id !== song._id ||
                                    !songState.isPlaying) && (
                                    <Tippy
                                        content={`Phát ${song.name} của ${song.artist}`}
                                        delay={[0, 0]}
                                        className="tooltip text-xs"
                                    >
                                        <div
                                            className={`${
                                                songState.song._id === song._id && songState.listSongsId === "favorite"
                                                    ? "visible"
                                                    : ""
                                            }`}
                                            onClick={() => setSongDispatch(song, songs, "favorite")}
                                        >
                                            <BsFillPlayFill className="text-2xl" />
                                        </div>
                                    </Tippy>
                                )}
                            </div>
                        </div>
                        <div className="w-[65%] md:w-[40%] lg:w-[35%] flex gap-4">
                            <div className="flex items-center">
                                <img src={song.image} alt="SongImage" className="w-10 min-w-[40px] h-10 object-cover" />
                            </div>
                            <div className="pr-4 truncate max-w-[220px] md:max-w-[120px] lg:max-w-[250px]">
                                <Tippy
                                    content={song.name}
                                    placement="top-start"
                                    delay={[200, 0]}
                                    className="tooltip text-xs"
                                >
                                    <p className="text-white text-sm lg:text-base whitespace-nowrap truncate cursor-pointer hover:underline">
                                        {song.name}
                                    </p>
                                </Tippy>
                                <span>{song.artist}</span>
                            </div>
                        </div>

                        <div className="md:w-[30%] md:max-w-[150px] lg:w-[25%] lg:max-w-[25%] hidden md:block truncate">
                            <span className="cursor-pointer hover:underline">{song.name}</span>
                        </div>

                        <div className="hidden lg:block grow group-hover:text-tGray">{`${moment(
                            addedAt[index]
                        ).fromNow()}`}</div>

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
                            <TippyHeadless idSong={song._id}>
                                <Tippy content="Khác" delay={[200, 0]} className="tooltip">
                                    <button className="opacity-70 hover:opacity-100 invisible group-hover:visible">
                                        <SlOptions className="text-base" />
                                    </button>
                                </Tippy>
                            </TippyHeadless>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default SongsItem;
