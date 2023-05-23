import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { AuthContext } from "../../contexts/authContext";
import { SongContext } from "../../contexts/songContext";
import { BsMusicNote } from "react-icons/bs";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import FavoriteImg from "@assets/images/favorite.png";
import Loading from "../../components/Loading";
import SongsItem from "../components/SongsItem";
import Header from "../../components/Header";
import ActionSidebar from "../components/ActionSidebar";

function Favorite() {
    const { authState } = useContext(AuthContext);
    const { songState, playSongDispatch, pauseSongDispatch, setSongDispatch, likedSongs } = useContext(SongContext);
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteSongs, setFavoriteSongs] = useState({
        songs: [],
        addedAt: [],
    });
    const navigate = useNavigate();

    const getLikedSongs = async () => {
        const data = await likedSongs();
        if (data.success) {
            setFavoriteSongs({
                songs: data.songs,
                addedAt: data.addedAt,
            });
            setIsLoading(false);
        } else {
            navigate("/error");
        }
    };

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
                                songState.listSongsId === "favorite"
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
                userID={authState.user._id}
                userName={authState.user.name}
                songs={favoriteSongs.songs}
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
                <>
                    <ActionSidebar songs={favoriteSongs.songs} id="favorite" />
                    <SongsItem songs={favoriteSongs.songs} id="favorite" addedAt={favoriteSongs.addedAt} />
                </>
            )}
        </div>
    );
}

export default Favorite;
