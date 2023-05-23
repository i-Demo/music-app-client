import { useContext } from "react";
import { Link } from "react-router-dom";
import { SongContext } from "../../../contexts/songContext";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import defaultImage from "@assets/images/defaultPlaylist.png";

function PlaylistItem({ playlist }: any) {
    const { songState, pauseSongDispatch, playSongDispatch, setSongDispatch, getSongsOfPlaylist } =
        useContext(SongContext);

    // Handle when click button play playlist
    const handlePlayPlaylist = async (e: any) => {
        e.preventDefault();
        const data = await getSongsOfPlaylist(playlist._id);
        if (data.success) {
            setSongDispatch(data.songs[0], data.songs, playlist._id);
        }
    };
    return (
        <Link
            to={`/playlist/${playlist._id}`}
            className="group col-span-1 p-4 bg-[#202020] hover:bg-bgTooltip rounded-md"
        >
            <div className="relative">
                <img src={playlist.image || defaultImage} alt="Image" className="rounded-md" />
                {playlist.songs.length > 0 && (
                    <div
                        className="absolute bottom-2 right-2 invisible group-hover:visible"
                        onClick={(e) => e.preventDefault()}
                    >
                        {songState.isPlaying && songState.listSongsId === playlist._id && (
                            <button
                                className="text-primary bg-btn rounded-full w-12 h-12 flex justify-center items-center hover:scale-105 visible"
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
                                        : handlePlayPlaylist
                                }
                            >
                                <MdPlayArrow className="text-4xl" />
                            </button>
                        )}
                    </div>
                )}
            </div>
            <p className="text-base font-bold py-4 truncate">{playlist.name}</p>
            <span className="text-textGray text-xs md:text-sm opacity-80 line-clamp-2 leading-5">
                {playlist.desc ? playlist.desc : `Của ${playlist.userName}`}
            </span>
        </Link>
    );
}

export default PlaylistItem;
