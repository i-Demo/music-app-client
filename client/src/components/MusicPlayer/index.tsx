import { useContext, useEffect, useState } from "react";
import { SongContext } from "../../contexts/songContext";

function MusicPlayer({ timeSong, setTimeSong, audioRef }: any) {
    const { songState, pauseSongDispatch, setSongDispatch } = useContext(SongContext);
    let listSong: string | any[] = [];
    songState.isRandom ? (listSong = songState.songsRandom) : (listSong = songState.songs);

    //Handle Update Time Song
    const handleTimeUpdate = (e: any) => {
        const currentTime = Math.floor(e.target.currentTime);
        if (currentTime !== timeSong.currentTime) {
            setTimeSong({ ...timeSong, currentTime });
        }
    };

    // Load time Song when Song Loaded
    const handleSongLoaded = (e: any) => {
        setTimeSong({ ...timeSong, duration: songState.song.duration || Math.floor(e.target.duration) });
    };

    // Load time Song when Song Loaded
    const handleSongEnded = () => {
        const currentIndex = listSong.indexOf(songState.song);
        if (songState.repeat === "1") {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else if (songState.repeat === "all" && currentIndex === listSong.length - 1) {
            setSongDispatch(listSong[0], songState.songs, songState.listSongsId);
        } else if (songState.repeat === "none" && currentIndex === listSong.length - 1) {
            pauseSongDispatch();
        } else {
            setSongDispatch(listSong[currentIndex + 1], songState.songs, songState.listSongsId);
        }
    };

    useEffect(() => {
        // Pause/Play Song when IsPlaying Change
        if (audioRef.current && !songState.isPlaying) {
            audioRef.current.pause();
        } else if (audioRef.current && songState.isPlaying) {
            audioRef.current.play();
        }
    }, [songState.isPlaying]);

    useEffect(() => {
        // Pause/Play Song when IsPlaying Change
        console.log("playlist change");
    }, [songState.songs]);

    return (
        <div className="hidden">
            <audio
                ref={audioRef}
                src={songState.song.song}
                autoPlay
                controls
                onTimeUpdate={handleTimeUpdate}
                onLoadedData={handleSongLoaded}
                onEnded={handleSongEnded}
            >
                Your browser does not support the audio tag.
            </audio>
        </div>
    );
}

export default MusicPlayer;
