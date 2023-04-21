import { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import { BsMusicNoteList } from "react-icons/bs";
import { TbMicrophone2 } from "react-icons/tb";
import { VscMute, VscUnmute } from "react-icons/vsc";

function PlayingBarRight() {
    const [percentVolume, setPercentVolume] = useState({ current: 100, prev: 100 });
    const [isMute, setIsMute] = useState(false);
    const { current, prev } = percentVolume;

    const handleChangeVolume = (e: any) => {
        if (isMute && e.target.value > 0) {
            setIsMute(false);
        }
        setPercentVolume({
            ...percentVolume,
            prev: current,
            current: e.target.value,
        });
    };

    const handleUnmute = () => {
        setIsMute(false);
        setPercentVolume({
            ...percentVolume,
            current: prev,
            prev: 0,
        });
    };
    const handleMute = () => {
        setIsMute(true);
        setPercentVolume({
            ...percentVolume,
            prev: current,
            current: 0,
        });
    };
    useEffect(() => {
        const volumeRange = document.querySelector("#volumeRange") as HTMLElement;
        volumeRange.style.backgroundSize = `${current}% 100%`;
    });
    return (
        <div className="w-[30%] flex flex-row items-center justify-end gap-2 lg:gap-6 text-xl px-4">
            <Tippy content="Lời bài hát" delay={[200, 0]} className="tooltip">
                <button>
                    <TbMicrophone2 />
                </button>
            </Tippy>
            <div className="flex items-center gap-2">
                {isMute && (
                    <Tippy content="Bật tiếng" delay={[200, 0]} className="tooltip">
                        <button onClick={handleUnmute}>
                            <VscMute />
                        </button>
                    </Tippy>
                )}
                {!isMute && (
                    <Tippy content="Tắt tiếng" delay={[200, 0]} className="tooltip">
                        <button onClick={handleMute}>
                            <VscUnmute />
                        </button>
                    </Tippy>
                )}
                <input
                    type="range"
                    id="volumeRange"
                    min="0"
                    max="100"
                    value={current}
                    onInput={handleChangeVolume}
                    className="w-24 range"
                />
            </div>
            <div className="h-[33px] w-[1px] lg:mx-2 bg-slate-600 md"></div>
            <Tippy content="Danh sách chờ" delay={[200, 0]} className="tooltip">
                <button>
                    <BsMusicNoteList />
                </button>
            </Tippy>
        </div>
    );
}

export default PlayingBarRight;
