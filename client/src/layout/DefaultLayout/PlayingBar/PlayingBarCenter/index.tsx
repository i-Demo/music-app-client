import Tippy from "@tippyjs/react";
import { useEffect, useContext, useState } from "react";
import { BsShuffle } from "react-icons/bs";
import { MdPlayArrow, MdOutlinePause, MdRepeat, MdSkipNext, MdSkipPrevious, MdRepeatOne } from "react-icons/md";
import { SongContext } from "../../../../contexts/songContext";

function PlayingBarCenter({ timeSong, setTimeSong, audioRef }: any) {
    const { songState, setSongDispatch, playSongDispatch, pauseSongDispatch, repeatSongDispatch, randomSongDispatch } =
        useContext(SongContext);
    const [isDrag, setIsDrag] = useState(false);
    const [timeDrag, setTimeDrag] = useState(0);
    const percent =
        Math.round((isDrag ? timeDrag / timeSong.duration : timeSong.currentTime / timeSong.duration) * 100) | 0;
    let listSong: string | any[] = [];
    songState.isRandom ? (listSong = songState.songsRandom) : (listSong = songState.songs);

    // Convert Time Song from Number to "00:00"
    const convertTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time - minutes * 60);
        const stringTime = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        return stringTime;
    };

    // Handle when change time song on range
    const handleChangeTime = (e: any) => {
        setTimeDrag(e.target.value);
    };

    const handleMouseDown = (e: any) => {
        setIsDrag(true);
    };
    const handleMouseUp = (e: any) => {
        setIsDrag(false);
        setTimeSong({ ...timeSong, currentTime: e.target.value });
        audioRef.current.currentTime = e.target.value;
    };

    // Handle when click button next song
    const handleNextSong = () => {
        if (listSong.indexOf(songState.song) === listSong.length - 1) {
            setSongDispatch(listSong[0], songState.songs, songState.listSongsId);
        } else {
            setSongDispatch(listSong[listSong.indexOf(songState.song) + 1], songState.songs, songState.listSongsId);
        }
    };

    // Handle when click button previous song
    const handlePreviousSong = () => {
        setSongDispatch(listSong[listSong.indexOf(songState.song) - 1], songState.songs, songState.listSongsId);
    };

    useEffect(() => {
        const timeRange = document.querySelector("#timeRange") as HTMLElement;
        timeRange.style.backgroundSize = `${percent}% 100%`;
    });
    return (
        <div className="w-[40%] max-w-[722px] flex-1 px-4">
            <div className="flex items-center justify-center gap-4 text-2xl">
                <Tippy content="Bật phát ngẫu nhiên" delay={[200, 0]} className="tooltip">
                    <button
                        className={`text-xl opacity-70 hover:opacity-100 ${songState.isRandom ? "text-btn" : ""}`}
                        onClick={() => randomSongDispatch()}
                    >
                        <BsShuffle className="" />
                    </button>
                </Tippy>

                <Tippy content="Trước" delay={[200, 0]} className="tooltip">
                    {
                        <button
                            className={` ${
                                listSong.indexOf(songState.song) === 0 || songState.songs.length === 0
                                    ? "cursor-not-allowed opacity-30 hover:opacity-30"
                                    : "opacity-70 hover:opacity-100"
                            }`}
                            onClick={
                                listSong.indexOf(songState.song) !== 0 && songState.songs.length !== 0
                                    ? handlePreviousSong
                                    : () => {}
                            }
                        >
                            <MdSkipPrevious className="text-3xl" />
                        </button>
                    }
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
                                onClick={songState.songs.length !== 0 ? () => playSongDispatch() : () => {}}
                            >
                                <MdPlayArrow className="text-2xl" />
                            </button>
                        </Tippy>
                    )}
                </div>

                <Tippy content="Tiếp theo" delay={[200, 0]} className="tooltip">
                    <button
                        className={` ${
                            (listSong.indexOf(songState.song) === listSong.length - 1 && songState.repeat === "none") ||
                            songState.songs.length === 0
                                ? "cursor-not-allowed opacity-30 hover:opacity-30"
                                : "opacity-70 hover:opacity-100"
                        }`}
                        onClick={
                            (listSong.indexOf(songState.song) !== listSong.length - 1 || songState.repeat !== "none") &&
                            songState.songs.length !== 0
                                ? handleNextSong
                                : () => {}
                        }
                    >
                        <MdSkipNext className="text-3xl" />
                    </button>
                </Tippy>

                <div className="opacity-70 hover:opacity-100 flex justify-center items-center">
                    {(songState.repeat === "none" || songState.repeat === "all") && (
                        <Tippy content="Bật phát lại tất cả" delay={[200, 0]} className="tooltip">
                            <button
                                className={songState.repeat === "all" ? "text-btn" : ""}
                                onClick={
                                    songState.repeat === "none"
                                        ? () => repeatSongDispatch("all")
                                        : () => repeatSongDispatch("1")
                                }
                            >
                                <MdRepeat />
                            </button>
                        </Tippy>
                    )}
                    {songState.repeat === "1" && (
                        <Tippy content="Bật phát lại tất cả" delay={[200, 0]} className="tooltip">
                            <button className="text-btn" onClick={() => repeatSongDispatch("none")}>
                                <MdRepeatOne />
                            </button>
                        </Tippy>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-center text-xs">
                <span className="opacity-70">{convertTime(timeSong.currentTime)}</span>
                <input
                    type="range"
                    id="timeRange"
                    min={0}
                    max={timeSong.duration}
                    step={1}
                    value={isDrag ? timeDrag : timeSong.currentTime}
                    className={`w-full mx-2 cursor-pointer range`}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onChange={handleChangeTime}
                />
                <span className="opacity-70">{convertTime(timeSong.duration)}</span>
            </div>
        </div>
    );
}

export default PlayingBarCenter;
