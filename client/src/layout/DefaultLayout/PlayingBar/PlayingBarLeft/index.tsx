import { useContext } from "react";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import { SlHeart, SlOptions } from "react-icons/sl";
import defaultSongImage from "@assets/images/defaultSongImage.png";
import { SongContext } from "../../../../contexts/songContext";

function PlayingBarLeft() {
    const {
        songState: { song },
    } = useContext(SongContext);
    return (
        <div className="min-w-[180px] w-[30%] max-w-[30%] flex justify-start items-center gap-4 pr-4">
            <div>
                <img src={song.image || defaultSongImage} alt="SongImage" className="min-w-[56px] w-14 h-14" />
            </div>
            <div className="text-sm flex flex-col gap-1 min-w-0 overflow-hidden">
                <Link to="" className="hover:underline " title={song.name}>
                    <p className="whitespace-nowrap text-ellipsis hover:text-clip hover:animate-slide-left">
                        {song.name}
                    </p>
                </Link>
                <Link
                    to=""
                    className="whitespace-nowrap opacity-80 text-[10px] cursor-grab hover:underline hover:opacity-100"
                    title={song.artist}
                >
                    <p>{song.artist}</p>
                </Link>
            </div>
            <div className="flex gap-3 ml-2">
                <Tippy content="Lưu vào thư viện" delay={[200, 0]} className="tooltip">
                    <button className="opacity-70 hover:opacity-100">
                        <SlHeart />
                    </button>
                </Tippy>
                <Tippy content="Khác" delay={[200, 0]} className="tooltip">
                    <button className="opacity-70 hover:opacity-100">
                        <SlOptions />
                    </button>
                </Tippy>
            </div>
        </div>
    );
}

export default PlayingBarLeft;
