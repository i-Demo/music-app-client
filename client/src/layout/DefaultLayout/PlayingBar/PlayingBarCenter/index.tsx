import Tippy from "@tippyjs/react";
import { useState, useEffect } from "react";
import { BsShuffle } from "react-icons/bs";
import { MdPlayArrow, MdOutlinePause, MdRepeat, MdSkipNext, MdSkipPrevious } from "react-icons/md";

function PlayingBarCenter() {
    const [percentTime, setPercentTime] = useState(0);
    useEffect(() => {
        const timeRange = document.querySelector("#timeRange") as HTMLElement;
        timeRange.style.backgroundSize = `${percentTime}% 100%`;
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
                <div className="hover:scale-105">
                    <Tippy content="Phát" delay={[200, 0]} className="tooltip">
                        <button className="text-primary bg-white rounded-full text-3xl">
                            <MdPlayArrow className="" />
                        </button>
                    </Tippy>
                    <Tippy content="Tạm dừng" delay={[200, 0]} className="tooltip">
                        <button className="text-primary bg-white rounded-full text-3xl hidden">
                            <MdOutlinePause />
                        </button>
                    </Tippy>
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
                <span className="opacity-70">00:38</span>
                <input
                    type="range"
                    id="timeRange"
                    min={0}
                    max={100}
                    step={1}
                    value={percentTime}
                    className={`w-full mx-2 cursor-pointer range`}
                    onInput={(e: any) => setPercentTime(e.target.value)}
                />
                <span className="opacity-70">04:38</span>
            </div>
        </div>
    );
}

export default PlayingBarCenter;
