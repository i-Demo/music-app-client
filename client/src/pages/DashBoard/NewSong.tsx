import { useEffect, useState } from "react";
import { BsChevronRight, BsFillPauseFill, BsFillPlayFill, BsThreeDots } from "react-icons/bs";

function NewSong({ songs }: any) {
    const [newSongsAll, newSongsVietnam, newSongsForeign] = songs;
    const [currentActive, setCurrentActive] = useState({ tab: "all", songs: newSongsAll });

    useEffect(() => {}, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-5">Mới phát hành</h2>
            <div className="relative text-xs">
                <button
                    className={`px-6 py-1 border border-secondary rounded-full uppercase mr-4 ${
                        currentActive.tab === "all" ? "bg-violet-700 border-violet-700" : ""
                    }`}
                    onClick={() => setCurrentActive({ tab: "all", songs: newSongsAll })}
                >
                    Tất cả
                </button>
                <button
                    className={`px-6 py-1 border border-secondary rounded-full uppercase mr-4 ${
                        currentActive.tab === "vietnam" ? "bg-violet-700 border-violet-700" : ""
                    }`}
                    onClick={() => setCurrentActive({ tab: "vietnam", songs: newSongsVietnam })}
                >
                    Việt Nam
                </button>
                <button
                    className={`px-6 py-1 border border-secondary rounded-full uppercase mr-4 ${
                        currentActive.tab === "foreign" ? "bg-violet-700 border-violet-700" : ""
                    }`}
                    onClick={() => setCurrentActive({ tab: "foreign", songs: newSongsForeign })}
                >
                    Quốc tế
                </button>

                <button className="absolute right-0 top-0 uppercase opacity-80 flex gap-2 items-center">
                    <span>Tất cả</span> <BsChevronRight className="text-lg" />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-x-4 xl:gap-x-8 gap-y-2 xl:grid-cols-3 mt-6 min-w-[518px]">
                {currentActive.songs.map((song: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className="group col-span-1 p-[10px] rounded text-sm font-normal flex justify-between items-center bg-[#181818] hover:bg-bgTooltip"
                        >
                            <div className="flex justify-between gap-2 mr-2">
                                <div className="w-[60px] h-[60px] rounded overflow-hidden relative">
                                    <img src={song.image} alt="SongImage" />
                                    <div className="absolute top-0 right-0 bottom-0 left-0 cursor-pointer flex items-center justify-center invisible group-hover:visible bg-bgModal">
                                        <BsFillPlayFill className="text-3xl " />
                                        {/* <BsFillPauseFill /> */}
                                    </div>
                                </div>
                                <div className="overflow-hidden lg:max-w-[200px] lg:group-hover:max-w-[160px] max-w-[160px] group-hover:max-w-[120px]">
                                    <h2 className="font-medium whitespace-nowrap truncate">{song.name}</h2>
                                    <p className="text-xs opacity-50 whitespace-nowrap truncate">{song.artist}</p>
                                    <span className="text-xs opacity-50">{`${
                                        new Date().getDate() - new Date(song.createdAt).getDate()
                                    } ngày trước`}</span>
                                </div>
                            </div>
                            <div className="rounded-full invisible w-[38px] min-w-[38px] h-[38px] flex justify-center items-center cursor-pointer group-hover:visible hover:bg-bgMore">
                                <BsThreeDots className="" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default NewSong;
