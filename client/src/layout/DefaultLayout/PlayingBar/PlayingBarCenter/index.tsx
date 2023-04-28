import Tippy from "@tippyjs/react";
import { useEffect, useContext } from "react";
import { BsShuffle } from "react-icons/bs";
import { MdPlayArrow, MdOutlinePause, MdRepeat, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { SongContext } from "../../../../contexts/songContext";

function PlayingBarCenter({ timeSong, setTimeSong, audioRef }: any) {
    const { songState, playSongDispatch, pauseSongDispatch } = useContext(SongContext);
    const percent = Math.round((timeSong.currentTime / timeSong.duration) * 100) | 0;

    const convertTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);
        const stringTime = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        return stringTime;
    };

    const handleChangeTime = (e: any) => {
        setTimeSong({ ...timeSong, currentTime: e.target.value });
        audioRef.current.currentTime = e.target.value;
    };
    useEffect(() => {
        const timeRange = document.querySelector("#timeRange") as HTMLElement;
        timeRange.style.backgroundSize = `${percent}% 100%`;
    });
    return (
        <div className="w-[40%] max-w-[722px] flex-1 px-4">
            <div className="flex items-center justify-center gap-4 text-2xl">
                <Tippy content="Bật phát ngẫu nhiên" delay={[200, 0]} className="tooltip">
                    <button className="text-xl opacity-70 hover:opacity-100">
                        <BsShuffle className="" />
                    </button>
                </Tippy>
                <Tippy content="Trước" delay={[200, 0]} className="tooltip">
                    <button className="opacity-70 hover:opacity-100">
                        <MdSkipPrevious className="text-3xl" />
                    </button>
                </Tippy>
                <div className="hover:scale-105 ">
                    {songState.isPlaying && (
                        <Tippy content="Tạm dừng" delay={[200, 0]} className="tooltip">
                            <button
                                className="text-primary bg-white rounded-full w-8 h-8 flex justify-center items-center"
                                onClick={() => pauseSongDispatch()}
                            >
                                <MdOutlinePause className="text-2xl" />
                            </button>
                        </Tippy>
                    )}
                    {!songState.isPlaying && (
                        <Tippy content="Phát" delay={[200, 0]} className="tooltip">
                            <button
                                className="text-primary bg-white rounded-full w-8 h-8 flex justify-center items-center"
                                onClick={() => playSongDispatch()}
                            >
                                <MdPlayArrow className="text-2xl" />
                            </button>
                        </Tippy>
                    )}
                </div>
                <Tippy content="Tiếp theo" delay={[200, 0]} className="tooltip">
                    <button className="opacity-70 hover:opacity-100">
                        <MdSkipNext className="text-3xl" />
                    </button>
                </Tippy>
                <Tippy content="Bật phát lại tất cả" delay={[200, 0]} className="tooltip">
                    <button className="opacity-70 hover:opacity-100">
                        <MdRepeat />
                    </button>
                </Tippy>
            </div>
            <div className="flex items-center justify-center text-xs">
                <span className="opacity-70">{convertTime(timeSong.currentTime)}</span>
                <input
                    type="range"
                    id="timeRange"
                    min={0}
                    max={timeSong.duration}
                    step={1}
                    value={timeSong.currentTime}
                    className={`w-full mx-2 cursor-pointer range`}
                    onInput={handleChangeTime}
                />
                <span className="opacity-70">{convertTime(timeSong.duration)}</span>
            </div>
        </div>
    );
}

export default PlayingBarCenter;
