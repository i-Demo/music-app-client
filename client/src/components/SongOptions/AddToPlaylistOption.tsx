import { useContext } from "react";
import Tippy from "@tippyjs/react/headless";
import { AuthContext } from "../../contexts/authContext";
import { SongContext } from "../../contexts/songContext";

interface AddToPPlaylistOptionType {
    children: JSX.Element;
    setVisible: React.Dispatch<boolean>;
    songId: string;
    setToast: React.Dispatch<JSX.Element>;
}
function AddToPPlaylistOption({ children, setVisible, songId, setToast }: AddToPPlaylistOptionType) {
    const { authState } = useContext(AuthContext);
    const { addSong } = useContext(SongContext);

    const handleAddSongToPlaylist = async (playlistId: string, songId: string, playlistName: string) => {
        const response = await addSong(playlistId, songId);
        if (response.success) {
            if (response.message === "Added to Playlist") {
                setToast(
                    <span className="text-sm font-semibold">
                        Đã thêm vào <span className="font-extrabold">Danh sách phát</span>
                    </span>
                );
            } else if (response.message === "Song already exits") {
                setToast(
                    <span className="text-sm font-semibold">
                        Bài hát này đã tồn tại trong <span className="font-extrabold">{playlistName}</span>
                    </span>
                );
            }
        }
    };

    return (
        <>
            <Tippy
                interactive
                offset={[0, 0]}
                delay={[0, 0]}
                placement="left"
                hideOnClick={false}
                render={(attrs) => (
                    <div
                        {...attrs}
                        className="tooltip flex flex-col p-1 min-w-[196px] min-h-max"
                        onClick={() => setVisible(false)}
                    >
                        {authState.user.myPlaylists.length === 0 ? (
                            <span className="text-xs whitespace-nowrap p-2 opacity-60">
                                Hiện tại bạn chưa có danh sách phát nào
                            </span>
                        ) : (
                            <>
                                {authState.user.myPlaylists.map((playlist: any, index: number) => (
                                    <button
                                        key={index}
                                        className="menu cursor-pointer"
                                        onClick={() => handleAddSongToPlaylist(playlist._id, songId, playlist.name)}
                                    >
                                        {playlist.name}
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                )}
            >
                {children}
            </Tippy>
        </>
    );
}

export default AddToPPlaylistOption;
