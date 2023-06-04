import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import defaultPlaylist from "@assets/images/defaultPlaylist.png";

function Playlists() {
    const { authState, getPlaylists } = useContext(AuthContext);
    const [playlists, setPlaylists] = useState([]);
    
    const navigate = useNavigate();
    // Call Api get Playlists
    const callGetPlaylists = async () => {
        const data = await getPlaylists({ _id: authState.user.playlists });
        if (data.success) {
            const userPlaylists = authState.user.playlists.map((playlistId: string) => {
                const index = data.playlists.findIndex((playlist: any) => playlist._id === playlistId);
                return data.playlists[index];
            });
            setPlaylists(userPlaylists);
        } else {
            navigate("/error");
        }
    };

    useEffect(() => {
        if (authState.user.playlists.length !== 0) {
            callGetPlaylists();
        } else {
            setPlaylists([]);
        }
    }, [authState.user.playlists]);
    return (
        <div className="ml-1">
            {playlists.map((playlist: any, index: number) => {
                return (
                    <NavLink
                        key={index}
                        to={`/playlist/${playlist._id}`}
                        className={({ isActive }: any) =>
                            isActive
                                ? "text-sm font-medium opacity-100 hover:opacity-100 block rounded-md bg-bg" 
                                : "text-sm font-medium opacity-90 hover:opacity-100"
                        }
                    >
                        <div className="flex items-center gap-2 p-2">
                            <img src={playlist.image || defaultPlaylist} alt="Image" className="w-12 h-12 rounded" />
                            <div className="truncate">
                                <p className="text-white truncate">{playlist.name}</p>
                                <span className="text-xs text-textGray">Playlist • {playlist.userName}</span>
                            </div>
                        </div>
                    </NavLink>
                );
            })}
        </div>
    );
}

export default Playlists;
