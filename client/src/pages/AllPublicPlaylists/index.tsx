import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import PlaylistItem from "../components/PlaylistItem";
import Header from "../../components/Header";

function AllPublicPlaylists() {
    const { getUser, getPlaylists } = useContext(AuthContext);
    const [publicPlaylists, setPublicPlaylists] = useState<Array<string>>([]);
    const params = useParams();

    // Call Api get first 5 Public Playlists of User
    const callGetPlaylists = async () => {
        const userData = await getUser(params.id || "");
        if (userData.success) {
            const data = await getPlaylists({ _id: userData.user.publicPlaylists });
            if (data.success) {
                const userPlaylists = userData.user.publicPlaylists.map((playlistId: string) => {
                    const index = data.playlists.findIndex((playlist: any) => playlist._id === playlistId);
                    return data.playlists[index];
                });
                setPublicPlaylists(userPlaylists);
            }
        }
    };
    useEffect(() => {
        callGetPlaylists();
    }, []);

    return (
        <>
            <Header offsetBg={0} offsetContent={0}></Header>
            <div className="spaceContent mt-16">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold mb-5">Playlist Công Khai</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
                    {publicPlaylists.map((item: any, index) => (
                        <PlaylistItem key={index} playlist={item} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default AllPublicPlaylists;
