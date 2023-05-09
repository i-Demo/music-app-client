import { useContext, useEffect, useRef, useState } from "react";
import Tippy from "@tippyjs/react";
import moment from "moment";
import "moment/dist/locale/vi";
import { SongContext } from "../../contexts/songContext";
import { HiOutlineClock } from "react-icons/hi2";
import { SlHeart, SlOptions } from "react-icons/sl";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import TippyHeadless from "../../components/TippyHeadless";
import { AuthContext } from "../../contexts/authContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface dataSongsType {
    newSongsAll: [];
    newSongsVietnam: [];
    newSongsKorea: [];
    newSongsUsUk: [];
}
function NewPublish() {
    const [isLoading, setIsLoading] = useState(true);
    const newSongsRowTitle = useRef<HTMLDivElement>(null);
    let dataSongs = useRef<dataSongsType>({
        newSongsAll: [],
        newSongsVietnam: [],
        newSongsKorea: [],
        newSongsUsUk: [],
    });
    const { songState, getNewSongs, setSongDispatch, playSongDispatch, pauseSongDispatch, likeSong } =
        useContext(SongContext);
    const { authState, authDispatch } = useContext(AuthContext);
    const [currentActive, setCurrentActive] = useState({ tab: "all", songs: dataSongs.current.newSongsAll });

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
        Promise.all([
            getNewSongs({ limit: 50 }),
            getNewSongs({ country: "vietnam", limit: 50 }),
            getNewSongs({ country: "korea", limit: 50 }),
            getNewSongs({ country: "us-uk", limit: 50 }),
        ]).then((data) => {
            const [newSongsAll, newSongsVietnam, newSongsKorea, newSongsUsUk] = data;
            dataSongs.current = { ...dataSongs.current, newSongsAll, newSongsVietnam, newSongsKorea, newSongsUsUk };
            currentActive.songs = newSongsAll;
            setIsLoading(false);
        });

        // Add event when scroll
        const dashboard = document.querySelector(".dashboard") as HTMLElement;
        const handleScroll = () => {
            if (newSongsRowTitle.current) {
                if (dashboard.scrollTop > 104) {
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

    if (isLoading) return <Loading />;
    return (
        <div>
            <Header offsetBg={0} offsetContent={0}>
                <div className="flex text-sm font-bold">
                    <button
                        className={`px-4 py-2 rounded whitespace-nowrap ${
                            currentActive.tab === "all" ? "bg-[#333] border-none" : ""
                        }`}
                        onClick={() => setCurrentActive({ tab: "all", songs: dataSongs.current.newSongsAll })}
                    >
                        Tất cả
                    </button>
                    <button
                        className={`px-4 py-2 rounded whitespace-nowrap ${
                            currentActive.tab === "vietnam" ? "bg-[#333] border-none" : ""
                        }`}
                        onClick={() => setCurrentActive({ tab: "vietnam", songs: dataSongs.current.newSongsVietnam })}
                    >
                        Việt Nam
                    </button>
                    <button
                        className={`px-4 py-2 rounded whitespace-nowrap ${
                            currentActive.tab === "korea" ? "bg-[#333] border-none" : ""
                        }`}
                        onClick={() => setCurrentActive({ tab: "korea", songs: dataSongs.current.newSongsKorea })}
                    >
                        Hàn Quốc
                    </button>
                    <button
                        className={`px-4 py-2 rounded whitespace-nowrap ${
                            currentActive.tab === "us-uk" ? "bg-[#333] border-none" : ""
                        }`}
                        onClick={() => setCurrentActive({ tab: "us-uk", songs: dataSongs.current.newSongsUsUk })}
                    >
                        US-UK
                    </button>
                </div>
            </Header>

            <div>
                <div className="spaceContent flex gap-8 mt-16">
                    <div className="">
                        {songState.isPlaying &&
                            songState.listSongsId.split(" ")[0] === "newPublish" &&
                            songState.listSongsId.split(" ")[1] === `${currentActive.tab}` && (
                                <button
                                    className="text-primary bg-btn rounded-full w-14 h-14 flex justify-center items-center hover:scale-105"
                                    onClick={() => pauseSongDispatch()}
                                >
                                    <MdOutlinePause className="text-4xl" />
                                </button>
                            )}
                        {(!songState.isPlaying ||
                            songState.listSongsId.split(" ")[0] !== "newPublish" ||
                            songState.listSongsId.split(" ")[1] !== `${currentActive.tab}`) && (
                            <button
                                className="text-primary bg-btn rounded-full w-14 h-14 flex justify-center items-center hover:scale-105"
                                onClick={
                                    songState.listSongsId === `newPublish ${currentActive.tab}`
                                        ? () => playSongDispatch()
                                        : () =>
                                              setSongDispatch(
                                                  currentActive.songs.slice(0, 1)[0],
                                                  currentActive.songs,
                                                  `newPublish ${currentActive.tab}`
                                              )
                                }
                            >
                                <MdPlayArrow className="text-4xl" />
                            </button>
                        )}
                    </div>

                    <Tippy content="Lưu vào thư viện" delay={[200, 0]} className="tooltip">
                        <button className="opacity-70 hover:opacity-100">
                            <SlHeart className="text-3xl font-bold" />
                        </button>
                    </Tippy>

                    <Tippy content="Khác" delay={[200, 0]} className="tooltip">
                        <button className="opacity-70 hover:opacity-100">
                            <SlOptions className="text-2xl" />
                        </button>
                    </Tippy>
                </div>

                <div className="px-8 text-sm text-tGray">
                    <div
                        ref={newSongsRowTitle}
                        className="newSongsRowTitle flex items-center justify-between gap-4 px-4 h-9 text-sm border-b border-secondary mb-6 top-16 right-0 left-0 z-10"
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

                    {currentActive.songs.map((song: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className={`group flex items-center justify-between gap-4 px-4 h-14 rounded hover:bg-[#313131] hover:text-white ${
                                    songState.song._id === song._id &&
                                    songState.listSongsId === `newPublish ${currentActive.tab}`
                                        ? "bg-bgTooltip"
                                        : ""
                                }`}
                                onDoubleClick={() =>
                                    setSongDispatch(song, currentActive.songs, `newPublish ${currentActive.tab}`)
                                }
                            >
                                <div className="w-4 relative">
                                    <span
                                        className={`group-hover:invisible ${
                                            songState.song._id === song._id &&
                                            songState.listSongsId === `newPublish ${currentActive.tab}`
                                                ? "invisible"
                                                : "visible"
                                        }`}
                                    >
                                        {index + 1}
                                    </span>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer invisible group-hover:visible flex items-center justify-center">
                                        {songState.isPlaying &&
                                            songState.song._id === song._id &&
                                            songState.listSongsId === `newPublish ${currentActive.tab}` && (
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
                                        {(songState.listSongsId !== `newPublish ${currentActive.tab}` ||
                                            songState.song._id !== song._id ||
                                            !songState.isPlaying) && (
                                            <Tippy
                                                content={`Phát ${song.name} của ${song.artist}`}
                                                delay={[0, 0]}
                                                className="tooltip text-xs"
                                            >
                                                <div
                                                    className={`${
                                                        songState.song._id === song._id &&
                                                        songState.listSongsId === `newPublish ${currentActive.tab}`
                                                            ? "visible"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setSongDispatch(
                                                            song,
                                                            currentActive.songs,
                                                            `newPublish ${currentActive.tab}`
                                                        )
                                                    }
                                                >
                                                    <BsFillPlayFill className="text-2xl" />
                                                </div>
                                            </Tippy>
                                        )}
                                    </div>
                                </div>
                                <div className="w-[65%] md:w-[40%] lg:w-[35%] flex gap-4">
                                    <div className="flex items-center">
                                        <img
                                            src={song.image}
                                            alt="SongImage"
                                            className="w-10 min-w-[40px] h-10 object-cover"
                                        />
                                    </div>
                                    <div className="pr-4 truncate max-w-[250px] md:max-w-[120px] lg:max-w-[250px]">
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
                                    song.createdAt
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
            </div>
        </div>
    );
}

export default NewPublish;
