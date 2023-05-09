import { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { AuthContext } from "../../contexts/authContext";
import { SongContext } from "../../contexts/songContext";
import { BsMusicNote } from "react-icons/bs";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import FavoriteImg from "@assets/images/favorite.png";
import Loading from "../../components/Loading";
import SongsItem from "../components/SongsItem";
import Header from "../../components/Header";

function Favorite() {
    const { authState } = useContext(AuthContext);
    const { songState, playSongDispatch, pauseSongDispatch, setSongDispatch, likedSongs } = useContext(SongContext);
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteSongs, setFavoriteSongs] = useState({
        songs: [],
        addedAt: [],
    });

    const getLikedSongs = async () => {
        const data = await likedSongs();
        if (data.success) {
            console.log(data.songs);
            setFavoriteSongs({
                songs: data.songs,
                addedAt: data.addedAt,
            });
            setIsLoading(false);
        } else {
            <Navigate to="/error" />;
        }
    };
    // console.log(songs)
    useEffect(() => {
        getLikedSongs();
    }, [authState.user.likedSongs]);

    if (isLoading) return <Loading />;
    return (
        <div>
            <Header offsetBg={212} offsetContent={340}>
                <div className="text-2xl font-bold flex items-center gap-4">
                    {songState.isPlaying && songState.listSongsId === "favorite" && (
                        <button
                            className="text-primary bg-btn rounded-full w-12 h-12 flex justify-center items-center hover:scale-105"
                            onClick={() => pauseSongDispatch()}
                        >
                            <MdOutlinePause className="text-4xl" />
                        </button>
                    )}
                    {!songState.isPlaying && (
                        <button
                            className="text-primary bg-btn rounded-full w-12 h-12 flex justify-center items-center hover:scale-105"
                            onClick={
                                songState.listSongsId === "favorite" &&
                                authState.user.likedSongs.indexOf(songState.song._id) === 1
                                    ? () => playSongDispatch()
                                    : () => setSongDispatch(favoriteSongs.songs[0], favoriteSongs.songs, "favorite")
                            }
                        >
                            <MdPlayArrow className="text-4xl" />
                        </button>
                    )}
                    <span>Bài hát đã thích</span>
                </div>
            </Header>

            <PageHeader
                image={FavoriteImg}
                title="Playlist"
                name="Bài hát đã thích"
                desc=""
                avatar={authState.user.avatar}
                user={authState.user.name}
                numberSongs={authState.user.likedSongs.length}
            />
            {authState.user.likedSongs.length === 0 ? (
                <div className="flex flex-col items-center gap-6 pt-12 px-4">
                    <BsMusicNote />{" "}
                    <p className="text-3xl font-bold text-center">Bài hát bạn yêu thích sẽ xuất hiện tại đây</p>
                    <p>Lưu bài hài bằng cách nhấn vào biểu tượng trái tim.</p>
                    <Link
                        to="/search"
                        className="flex justify-center items-center text-primary h-10 w-32 rounded-full font-semibold opacity-90 hover:opacity-100 bg-transparent bg-white hover:scale-105"
                    >
                        Tìm bài hát
                    </Link>
                </div>
            ) : (
                <div>
                    <div className="spaceContent">
                        {songState.isPlaying && songState.listSongsId === "favorite" && (
                            <button
                                className="text-primary bg-btn rounded-full w-14 h-14 flex justify-center items-center hover:scale-105"
                                onClick={() => pauseSongDispatch()}
                            >
                                <MdOutlinePause className="text-4xl" />
                            </button>
                        )}
                        {(!songState.isPlaying || songState.listSongsId !== "favorite") && (
                            <button
                                className="text-primary bg-btn rounded-full w-14 h-14 flex justify-center items-center hover:scale-105"
                                onClick={
                                    songState.listSongsId === "favorite" &&
                                    authState.user.likedSongs.indexOf(songState.song._id) === 1
                                        ? () => playSongDispatch()
                                        : () => setSongDispatch(favoriteSongs.songs[0], favoriteSongs.songs, "favorite")
                                }
                            >
                                <MdPlayArrow className="text-4xl" />
                            </button>
                        )}
                    </div>
                    <div className="spaceContent text-sm text-tGray">
                        <SongsItem songs={favoriteSongs.songs} addedAt={favoriteSongs.addedAt} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Favorite;
