import { useContext, useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import { SlOptions } from "react-icons/sl";
import defaultSongImage from "@assets/images/defaultSongImage.png";
import { SongContext } from "../../../../contexts/songContext";
import { AuthContext } from "../../../../contexts/authContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import SongOptions from "../../../../components/SongOptions";
import ToastMessage from "../../../../components/ToastMessage";

function PlayingBarLeft() {
    const {
        songState: { song },
        likeSong,
    } = useContext(SongContext);
    const { authState, authDispatch } = useContext(AuthContext);
    const [toast, setToast] = useState<JSX.Element | null>(null);

    // Handle Like Song
    const handleClickLikeSong = async (idSong: string) => {
        if (!song) return;
        try {
            const responseData = await likeSong(idSong);
            if (responseData.success) {
                responseData.message === "Added song to your liked songs"
                    ? setToast(
                          <span className="text-sm font-semibold">
                              Đã thêm vào <span className="font-extrabold">Bài hát đã thích</span> của bạn
                          </span>
                      )
                    : setToast(
                          <span className="text-sm font-semibold">
                              Đã xoá khỏi <span className="font-extrabold">Bài hát đã thích</span> của bạn
                          </span>
                      );
                authDispatch(responseData.user);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (toast) {
            timer = setTimeout(() => setToast(null), 3000);
        }
        return () => clearTimeout(timer);
    }, [toast]);

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
                <Tippy
                    content={
                        authState.user.likedSongs.findIndex((songInfo: { id: string }) => songInfo.id === song._id) !==
                        -1
                            ? "Xoá khỏi thư viện"
                            : "Lưu vào thư viện"
                    }
                    delay={[200, 0]}
                    className="tooltip"
                >
                    <button className="opacity-70 hover:opacity-100" onClick={() => handleClickLikeSong(song._id)}>
                        {authState.user.likedSongs.findIndex((songInfo: { id: string }) => songInfo.id === song._id) !==
                        -1 ? (
                            <AiFillHeart className="text-xl text-btn" />
                        ) : (
                            <AiOutlineHeart className="text-xl" />
                        )}
                    </button>
                </Tippy>
                <SongOptions idSong={song._id}>
                    <Tippy content="Khác" delay={[200, 0]} className="tooltip">
                        <button className="opacity-70 hover:opacity-100">
                            <SlOptions />
                        </button>
                    </Tippy>
                </SongOptions>
            </div>
            <ToastMessage content={toast} />
        </div>
    );
}

export default PlayingBarLeft;
