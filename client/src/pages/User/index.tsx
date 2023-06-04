import { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import UserHeader from "./UserHeader";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import PlaylistItem from "../components/PlaylistItem";

function User() {
    const { getUser, getPlaylists } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>({});
    const [publicPlaylists, setPublicPlaylists] = useState([]);
    const params = useParams();

    // Call Api get first 5 Public Playlists of User
    const callGetPlaylists = async () => {
        const userData = await getUser(params.id || "");
        if (userData.success) {
            const idPublicPlaylists = userData.user.publicPlaylists.slice(0, 5);
            const data = await getPlaylists({ _id: idPublicPlaylists });
            if (data.success) {
                const userPlaylists = idPublicPlaylists.map((playlistId: string) => {
                    const index = data.playlists.findIndex((playlist: any) => playlist._id === playlistId);
                    return data.playlists[index];
                });
                setUser(userData.user);
                setPublicPlaylists(userPlaylists);
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        callGetPlaylists();
    }, [user.publicPlaylists]);

    if (isLoading) return <Loading />;
    return (
        <div>
            <Header offsetBg={212} offsetContent={212}>
                <div className="text-2xl font-bold">{user.name}</div>
            </Header>
            <UserHeader user={user} />
            <div className="spaceContent">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold mb-5">Playlist Công Khai</h2>
                    {user.publicPlaylists.length > 5 && (
                        <Link
                            to={`/user/${user._id}/public-playlists`}
                            className="opacity-60 font-bold text-sm hover:underline"
                        >
                            Hiện tất cả
                        </Link>
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-1 auto-rows-[0] overflow-y-hidden gap-x-3 md:gap-4 lg:gap-6">
                    {publicPlaylists.map((item: any, index) => (
                        <PlaylistItem key={index} playlist={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default User;
