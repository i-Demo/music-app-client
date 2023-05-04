import { useContext, useEffect, useRef } from "react";
import Tippy from "@tippyjs/react";
import moment from "moment";
import "moment/dist/locale/vi";
import { average } from "color.js";
import { SongContext } from "../../contexts/songContext";
import { HiOutlineClock } from "react-icons/hi2";
import { SlHeart, SlOptions } from "react-icons/sl";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import NewSongsImage from "@assets/images/new-songs.png";
import Header from "../../components/Header";

function NewPublish() {
    const newSongsPageRef = useRef<HTMLDivElement>(null);
    const { songState, setSongDispatch, playSongDispatch, pauseSongDispatch, repeatSongDispatch, randomSongDispatch } =
        useContext(SongContext);

    useEffect(() => {


        // Get dominant to render background color
        average(`${NewSongsImage}`, { format: "hex" }).then((color) => {
            if (newSongsPageRef.current) {
                newSongsPageRef.current.style.backgroundColor = `${color}`;
                newSongsPageRef.current.style.boxShadow = `0 50px 200px ${color}`;
            }
        });

        // Add event when scroll
        const dashboard = document.querySelector(".dashboard") as HTMLElement;
        const newSongsRowTitle = document.querySelector(".newSongsRowTitle") as HTMLElement;
        const handleScroll = () => {
            if (dashboard.scrollTop > 340) {
                newSongsRowTitle.style.position = "absolute";
                newSongsRowTitle.style.backgroundColor = "#181818";
                newSongsRowTitle.style.padding = "0 48px";
            } else {
                newSongsRowTitle.style.position = "static";
                newSongsRowTitle.style.backgroundColor = "transparent";
                newSongsRowTitle.style.padding = "0 16px";
            }
        };
        dashboard.addEventListener("scroll", handleScroll);

        () => {
            dashboard.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <Header offsetHeight={212}>
                <div className="text-2xl font-bold flex items-center gap-4">
                    <div>
                        {songState.isPlaying && (
                            <button
                                className="text-primary bg-btn rounded-full w-12 h-12 flex justify-center items-center hover:scale-105"
                                onClick={() => pauseSongDispatch()}
                            >
                                <MdOutlinePause className="text-4xl" />
                            </button>
                        )}
                        {!songState.isPlaying && (
                            <button
                                className="text-primary bg-btn rounded-full w-12 h-12 flex justify-center items-center hover:scale-105"
                                onClick={songState.songs.length !== 0 ? () => playSongDispatch() : () => {}}
                            >
                                <MdPlayArrow className="text-4xl" />
                            </button>
                        )}
                    </div>
                    <span>Nhạc mới</span>
                </div>
            </Header>
            <div className="spaceHeader flex gap-8" ref={newSongsPageRef}>
                <div className="lg:w-[232px] lg:h-[232px] w-48 h-48 min-w-[192px] overflow-hidden shadow-[0_20px_50px_rgba(0,_0,_0,_0.7)] cursor-pointer">
                    <img
                        src={NewSongsImage}
                        alt="Avatar"
                        className="object-cover lg:w-[232px] lg:h-[232px] w-48 h-48"
                    />
                </div>
                <div className="flex flex-col justify-end text-xs md:text-sm">
                    <span className="font-bold ">Playlist</span>
                    <h2 className="mb-8 text-4xl lg:text-8xl font-extrabold font-sans tracking-tighter">Nhạc Mới</h2>
                    <p className="font-normal opacity-70">
                        Nhún nhảy theo những giai điệu mới toanh từ nghệ sĩ và đĩa đơn mới dành cho bạn. Cập nhật hàng
                        ngày.
                    </p>
                    <p className="mt-2">
                        {`bài hát,`} <span className="opacity-70">khoảng 3 giờ</span>
                    </p>
                </div>
            </div>
            <div>
                <div className="spaceContent flex gap-8">
                    <div className="">
                        {songState.isPlaying && (
                            <button
                                className="text-primary bg-btn rounded-full w-14 h-14 flex justify-center items-center hover:scale-105"
                                onClick={() => pauseSongDispatch()}
                            >
                                <MdOutlinePause className="text-4xl" />
                            </button>
                        )}
                        {!songState.isPlaying && (
                            <button
                                className="text-primary bg-btn rounded-full w-14 h-14 flex justify-center items-center hover:scale-105"
                                onClick={songState.songs.length !== 0 ? () => playSongDispatch() : () => {}}
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
                    <div className="newSongsRowTitle flex items-center justify-between gap-4 px-4 h-9 text-sm border-b border-secondary mb-6 top-16 right-0 left-0 z-10">
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

                    <div className="group flex items-center justify-between gap-4 px-4 h-14 rounded hover:bg-[#313131] hover:text-white">
                        <div className="w-4 relative">
                            <span className="group-hover:invisible">1</span>
                            <div className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer invisible group-hover:visible flex items-center justify-center">
                                {songState.isPlaying && songState.song._id === 1 && (
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
                                {(songState.song._id !== 1 || !songState.isPlaying) && (
                                    <Tippy
                                        content="Phát nếu lúc đó của tlinh"
                                        delay={[0, 0]}
                                        className="tooltip text-xs"
                                    >
                                        <div
                                            className={`${songState.song._id === 1 ? "visible" : ""}`}
                                            onClick={() => {}}
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
                                    src={NewSongsImage}
                                    alt="SongImage"
                                    className="w-10 min-w-[40px] h-10 object-cover"
                                />
                            </div>
                            <div className="pr-4 truncate max-w-[250px] md:max-w-[120px] lg:max-w-[250px]">
                                <Tippy
                                    content="nếu lúc đó"
                                    placement="top-start"
                                    delay={[200, 0]}
                                    className="tooltip text-xs"
                                >
                                    <p className="text-white text-sm lg:text-base whitespace-nowrap truncate cursor-pointer hover:underline">
                                        nếu lúc đó sssssssssssssssssssssssssssss
                                    </p>
                                </Tippy>
                                <span>tlinh, 2pillz ssssssssssssssssssssssssssssssssssss</span>
                            </div>
                        </div>

                        <div className="md:w-[30%] md:max-w-[150px] lg:w-[25%] lg:max-w-[25%] hidden md:block truncate">
                            <span className="cursor-pointer hover:underline">
                                nếu lúc đó ssssssssssssssssssssssssssssssssss
                            </span>
                        </div>

                        <div className="hidden lg:block grow group-hover:text-tGray">{`${moment().fromNow()}`}</div>

                        <div className="w-[30%] md:w-[20%] lg:w-[15%] flex justify-around">
                            <Tippy content="Lưu vào thư viện" delay={[200, 0]} className="tooltip">
                                <button className="opacity-70 hover:opacity-100 invisible group-hover:visible">
                                    <SlHeart className="text-lg font-bold" />
                                </button>
                            </Tippy>
                            <span className="group-hover:text-tGray">4:24</span>
                            <Tippy content="Khác" delay={[200, 0]} className="tooltip">
                                <button className="opacity-70 hover:opacity-100 invisible group-hover:visible">
                                    <SlOptions className="text-base" />
                                </button>
                            </Tippy>
                        </div>
                    </div>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                    <h2>ssssss</h2>
                </div>
            </div>
        </div>
    );
}

export default NewPublish;
