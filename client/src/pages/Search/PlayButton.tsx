import { useContext } from "react";
import { MdOutlinePause, MdPlayArrow } from "react-icons/md";
import { SongContext } from "../../contexts/songContext";

interface PlayButtonType {
    song: any;
}
function PlayButton({ song }: PlayButtonType) {
    const { songState, pauseSongDispatch, setSongDispatch } = useContext(SongContext);

    // Handle when click button play playlist
    const handlePlayPlaylist = async (e: any) => {
        e.preventDefault();
        setSongDispatch(song, [song], song._id);
    };

    return (
        <div
            className="absolute bottom-6 right-6 invisible group-hover:visible z-[999]"
            onClick={(e) => e.preventDefault()}
        >
            {songState.isPlaying && songState.listSongsId === song._id && (
                <button
                    className="text-primary bg-btn rounded-full w-12 h-12 flex justify-center items-center hover:scale-105 visible"
                    onClick={() => pauseSongDispatch()}
                >
                    <MdOutlinePause className="text-4xl" />
                </button>
            )}
            {(!songState.isPlaying || songState.listSongsId !== song._id) && (
                <button
                    className="text-primary bg-btn rounded-full w-12 h-12 flex justify-center items-center hover:scale-105"
                    onClick={handlePlayPlaylist}
                >
                    <MdPlayArrow className="text-4xl" />
                </button>
            )}
        </div>
    );
}

export default PlayButton;
