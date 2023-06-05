import { Link } from "react-router-dom";
import PlaylistItem from "../components/PlaylistItem";

interface ListPlaylistsType {
    title: string;
    playlists: Array<object>;
    type?: string;
}
function ListPlaylists({ title, playlists, type }: ListPlaylistsType) {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-5">{title}</h2>
                {type && (
                    <Link to={`/type/${type}`} className="opacity-60 font-bold text-sm hover:underline">
                        Hiện tất cả
                    </Link>
                )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-1 auto-rows-[0] overflow-y-hidden gap-x-3 md:gap-4 lg:gap-6">
                {playlists.map((playlist: any, index: number) => (
                    <PlaylistItem key={index} playlist={playlist} />
                ))}
            </div>
        </div>
    );
}

export default ListPlaylists;
