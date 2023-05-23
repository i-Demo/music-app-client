import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "moment/dist/locale/vi";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import SongsItem from "../components/SongsItem";
import PageHeader from "../components/PageHeader";
import ActionSidebar from "../components/ActionSidebar";
import ModalUpdatePlaylist from "../components/ModalUpdatePlaylist";
import { SongContext } from "../../contexts/songContext";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";

function Playlist() {
    const [isLoading, setIsLoading] = useState(true);
    const { songState, setSongDispatch, playSongDispatch, pauseSongDispatch, getSongsOfPlaylist } =
        useContext(SongContext);
    const navigate = useNavigate();
    const params = useParams();
    const [playlist, setPlaylist] = useState<any>();
    const [songs, setSongs] = useState([]);
    const [addedAt, setAddedAt] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);

    // Call Api Get Songs of Playlist
    const callGetSongsOfPlaylist = async () => {
        const data = await getSongsOfPlaylist(params.id || "");
        if (data.success) {
            setPlaylist(data.playlist);
            setSongs(data.songs);
            setAddedAt(data.addedAt);
            setIsLoading(false);
        } else {
            navigate("/error");
        }
    };

    const removeSongOfClient = (index: number) => {
        let newSongs = songs.slice();
        let newAddedAt = addedAt.slice();
        newSongs.splice(index, 1);
        newAddedAt.slice(index, 1);
        setSongs(newSongs);
        setAddedAt(newAddedAt);
    };

    useEffect(() => {
        callGetSongsOfPlaylist();
    }, [params.id]);

    if (isLoading) return <Loading />;
    return (
        <div>
            <Header offsetBg={212} offsetContent={340}>
                <div className="text-2xl font-bold flex items-center gap-4">
                    <div>
                        {songState.isPlaying && songState.listSongsId === playlist._id && (
                            <button
                                className="text-primary bg-btn rounded-full w-12 h-12 flex justify-center items-center hover:scale-105"
                                onClick={() => pauseSongDispatch()}
                            >
                                <MdOutlinePause className="text-4xl" />
                            </button>
                        )}
                        {(!songState.isPlaying || songState.listSongsId !== playlist._id) && (
                            <button
                                className="text-primary bg-btn rounded-full w-12 h-12 flex justify-center items-center hover:scale-105"
                                onClick={
                                    songState.listSongsId === playlist._id
                                        ? () => playSongDispatch()
                                        : () => setSongDispatch(songs[0], songs, playlist._id)
                                }
                            >
                                <MdPlayArrow className="text-4xl" />
                            </button>
                        )}
                    </div>
                    <span>{playlist.name}</span>
                </div>
            </Header>
            <PageHeader
                id={playlist._id}
                image={playlist.image}
                title="Playlist"
                name={playlist.name}
                desc={playlist.desc}
                avatar={playlist.userAvatar}
                userID={playlist.user}
                userName={playlist.userName}
                songs={songs}
                setIsShowModal={setIsShowModal}
            />
            <ActionSidebar songs={songs} id={playlist._id} playlist={playlist} setIsShowModalUpdate={setIsShowModal} />
            <SongsItem songs={songs} id={playlist._id} addedAt={addedAt} removeSongOfClient={removeSongOfClient} />
            {isShowModal && (
                <ModalUpdatePlaylist playlist={playlist} setPlaylist={setPlaylist} setIsShowModal={setIsShowModal} />
            )}
        </div>
    );
}

export default Playlist;
