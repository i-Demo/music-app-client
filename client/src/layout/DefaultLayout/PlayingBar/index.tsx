import PlayingBarCenter from "./PlayingBarCenter";
import PlayingBarLeft from "./PlayingBarLeft";
import PlayingBarRight from "./PlayingBarRight";

function PlayingBar() {
    return (
        <div className="flex flex-row justify-between items-center px-4 h-[90px] w-screen min-w-[768px] bg-bgPlayingBar border-t border-t-slate-700">
            <PlayingBarLeft />
            <PlayingBarCenter />
            <PlayingBarRight />
        </div>
    );
}

export default PlayingBar;
