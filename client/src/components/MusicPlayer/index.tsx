import { useContext, useEffect, useRef, useImperativeHandle } from "react";
import { SongContext } from "../../contexts/songContext";

function MusicPlayer({ timeSong, setTimeSong, audioRef }: any) {
    const { songState, pauseSongDispatch } = useContext(SongContext);

    //Handle Update Time Song
    const handleTimeUpdate = (e: any) => {
        const currentTime = Math.floor(e.target.currentTime);
        if (currentTime !== timeSong.currentTime) {
            setTimeSong({ ...timeSong, currentTime });
        }
    };

    // Load time Song when Song Loaded
    const handleSongLoaded = (e: any) => {
        setTimeSong({ ...timeSong, duration: Math.floor(e.target.duration) });
    };

    useEffect(() => {
        // Pause/Play Song when IsPlaying Change
        if (audioRef.current && !songState.isPlaying) {
            audioRef.current.pause();
        } else if (audioRef.current && songState.isPlaying) {
            audioRef.current.play();
        }
    }, [songState.isPlaying]);

    return (
        <div className="hidden">
            <audio
                ref={audioRef}
                src={songState.song.song}
                autoPlay
                controls
                onTimeUpdate={handleTimeUpdate}
                onLoadedData={handleSongLoaded}
                onEnded={() => pauseSongDispatch()}
            >
                Your browser does not support the audio tag.
            </audio>
        </div>
    );
}

export default MusicPlayer;
