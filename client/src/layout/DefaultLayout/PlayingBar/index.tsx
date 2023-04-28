import { useState, useRef, useEffect } from "react";
import MusicPlayer from "../../../components/MusicPlayer";
import PlayingBarCenter from "./PlayingBarCenter";
import PlayingBarLeft from "./PlayingBarLeft";
import PlayingBarRight from "./PlayingBarRight";

function PlayingBar() {
    const audioRef = useRef();
    const [timeSong, setTimeSong] = useState({ currentTime: 0, duration: 0 });

    // useEffect(() => {
    // });
    return (
        <div className="flex flex-row justify-between items-center px-4 h-[90px] w-screen min-w-[768px] bg-bgPlayingBar border-t border-t-slate-700">
            <MusicPlayer timeSong={timeSong} setTimeSong={setTimeSong} audioRef={audioRef} />
            <PlayingBarLeft />
            <PlayingBarCenter timeSong={timeSong} setTimeSong={setTimeSong} audioRef={audioRef} />
            <PlayingBarRight audioRef={audioRef} />
        </div>
    );
}

export default PlayingBar;
