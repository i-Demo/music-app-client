import { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import { BsMusicNoteList } from "react-icons/bs";
import { TbMicrophone2 } from "react-icons/tb";
import { VscMute, VscUnmute } from "react-icons/vsc";

function PlayingBarRight({ audioRef }: any) {
    const [volume, setVolume] = useState({ current: 1, prev: 1 });
    const [isMute, setIsMute] = useState(false);
    const { current, prev } = volume;

    const handleChangeVolume = (e: any) => {
        if (isMute && e.target.value > 0) {
            setIsMute(false);
        }
        setVolume({
            ...volume,
            prev: current,
            current: e.target.value,
        });
        audioRef.current.volume = e.target.value;
    };

    const handleUnmute = () => {
        audioRef.current.volume = prev;
        setIsMute(false);
        setVolume({
            ...volume,
            current: prev,
            prev: 0,
        });
    };
    const handleMute = () => {
        audioRef.current.volume = 0;
        setIsMute(true);
        setVolume({
            ...volume,
            prev: current,
            current: 0,
        });
    };
    useEffect(() => {
        const volumeRange = document.querySelector("#volumeRange") as HTMLElement;
        volumeRange.style.backgroundSize = `${current * 100}% 100%`;
    });
    return (
        <div className="w-[30%] flex flex-row items-center justify-end gap-2 lg:gap-6 text-xl px-4">
            <Tippy content="Lời bài hát" delay={[200, 0]} className="tooltip">
                <button className="opacity-70 hover:opacity-100">
                    <TbMicrophone2 />
                </button>
            </Tippy>
            <div className="flex items-center gap-2 group">
                {isMute && (
                    <Tippy content="Bật tiếng" delay={[200, 0]} className="tooltip">
                        <button onClick={handleUnmute} className="opacity-70 hover:opacity-100">
                            <VscMute />
                        </button>
                    </Tippy>
                )}
                {!isMute && (
                    <Tippy content="Tắt tiếng" delay={[200, 0]} className="tooltip">
                        <button onClick={handleMute} className="opacity-70 hover:opacity-100 group">
                            <VscUnmute />
                        </button>
                    </Tippy>
                )}
                <input
                    type="range"
                    id="volumeRange"
                    min={0}
                    max={1}
                    step={0.01}
                    value={current}
                    onInput={handleChangeVolume}
                    className="w-24 range group-hover:rangeHover"
                />
            </div>
            <div className="h-[33px] w-[1px] lg:mx-2 bg-slate-600 md"></div>
            <Tippy content="Danh sách chờ" delay={[200, 0]} className="tooltip">
                <button className="opacity-70 hover:opacity-100">
                    <BsMusicNoteList />
                </button>
            </Tippy>
        </div>
    );
}

export default PlayingBarRight;
