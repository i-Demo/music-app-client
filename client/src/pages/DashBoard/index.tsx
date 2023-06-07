import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { SongContext } from "../../contexts/songContext";
import NewSong from "./NewSong";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import ListPlaylists from "./ListPlaylists";

function DashBoard() {
    const { getPlaylists, getRandomPlaylists } = useContext(AuthContext);
    const { getNewSongs } = useContext(SongContext);
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const dataDashboard = useRef<any>({
        newSongs: [],
        topPlaylists: [],
        chillPlaylists: [],
        lofiPlaylists: [],
        edmPlaylists: [],
    });

    // Get New Songs
    const callGetNewSongsAPIs = async () => {
        try {
            const data = await Promise.all([
                getNewSongs({ limit: 12 }),
                getNewSongs({ country: "vietnam", limit: 12 }),
                getNewSongs({ country: "korea", limit: 12 }),
                getNewSongs({ country: "us-uk", limit: 12 }),
            ]);
            dataDashboard.current = { ...dataDashboard.current, newSongs: data };
        } catch (error) {
            console.log(error);
        }
    };

    // Get Top Playlists Hot
    const callGetTopPlaylistsAPI = async () => {
        try {
            const data = await getPlaylists({ genre: "Bảng xếp hạng Nổi bật", limit: 5 });
            dataDashboard.current = { ...dataDashboard.current, topPlaylists: data.playlists };
        } catch (error) {
            console.log(error);
        }
    };

    // Get Chill Playlists
    const callGetChillPlaylistsAPI = async () => {
        try {
            const data = await getRandomPlaylists({ type: "chill", limit: 5 });
            dataDashboard.current = { ...dataDashboard.current, chillPlaylists: data.playlists };
        } catch (error) {
            console.log(error);
        }
    };

    // Get Chill Playlists
    const callGetLofiPlaylistsAPI = async () => {
        try {
            const data = await getRandomPlaylists({ type: "lofi", limit: 5 });
            dataDashboard.current = { ...dataDashboard.current, lofiPlaylists: data.playlists };
        } catch (error) {
            console.log(error);
        }
    };

    // Get Chill Playlists
    const callGetEdmPlaylistsAPI = async () => {
        try {
            const data = await getRandomPlaylists({ type: "edm", limit: 5 });
            dataDashboard.current = { ...dataDashboard.current, edmPlaylists: data.playlists };
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Promise.all([
            callGetNewSongsAPIs(),
            callGetChillPlaylistsAPI(),
            callGetLofiPlaylistsAPI(),
            callGetEdmPlaylistsAPI(),
            callGetTopPlaylistsAPI(),
        ]).then(() => {
            setIsLoading(false);
        });

        scrollRef.current?.scrollTo(0, 0);
    }, []);

    if (isLoading)
        return (
            <div className="flex justify-center items-center w-full h-full">
                <Loading />
            </div>
        );

    return (
        <>
            <Header offsetBg={0} />
            <div className="pl-4 lg:px-8 lg:pt-20 pb-8 pt-16 flex flex-col gap-8 min-w-[528px]" ref={scrollRef}>
                {/* <div className="mx-6 mb-8 bg-white h-72 rounded-md p-2">
                    <h2 className="text-primary">title</h2>
                </div> */}
                <NewSong songs={dataDashboard.current.newSongs} />

                <ListPlaylists title="Chill" playlists={dataDashboard.current.edmPlaylists} type="chill" />

                <ListPlaylists title="Lofi" playlists={dataDashboard.current.chillPlaylists} type="lofi" />

                <ListPlaylists title="EDM" playlists={dataDashboard.current.lofiPlaylists} type="edm" />

                <ListPlaylists title="Bảng xếp hạng Nổi bật" playlists={dataDashboard.current.topPlaylists} />
            </div>
        </>
    );
}

export default DashBoard;
