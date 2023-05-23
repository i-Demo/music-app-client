import { useContext, useEffect, useRef, useState } from "react";
import "moment/dist/locale/vi";
import { SongContext } from "../../contexts/songContext";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import SongsItem from "../components/SongsItem";
import ActionSidebar from "../components/ActionSidebar";

interface dataSongsType {
    newSongsAll: [];
    newSongsVietnam: [];
    newSongsKorea: [];
    newSongsUsUk: [];
}
function NewPublish() {
    const [isLoading, setIsLoading] = useState(true);
    let dataSongs = useRef<dataSongsType>({
        newSongsAll: [],
        newSongsVietnam: [],
        newSongsKorea: [],
        newSongsUsUk: [],
    });
    const { getNewSongs } = useContext(SongContext);
    const [currentActive, setCurrentActive] = useState({ tab: "all", songs: dataSongs.current.newSongsAll });
    // Get AddedTime Add New Song
    const addedAt = currentActive.songs.map((song: any) => song.createdAt);

    useEffect(() => {
        Promise.all([
            getNewSongs({ limit: 50 }),
            getNewSongs({ country: "vietnam", limit: 50 }),
            getNewSongs({ country: "korea", limit: 50 }),
            getNewSongs({ country: "us-uk", limit: 50 }),
        ]).then((data) => {
            const [newSongsAll, newSongsVietnam, newSongsKorea, newSongsUsUk] = data;
            dataSongs.current = { ...dataSongs.current, newSongsAll, newSongsVietnam, newSongsKorea, newSongsUsUk };
            currentActive.songs = newSongsAll;
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <Loading />;
    return (
        <div>
            <Header offsetBg={0} offsetContent={0}>
                <div className="flex text-sm font-bold">
                    <button
                        className={`px-4 py-2 rounded whitespace-nowrap ${
                            currentActive.tab === "all" ? "bg-[#333] border-none" : ""
                        }`}
                        onClick={() => setCurrentActive({ tab: "all", songs: dataSongs.current.newSongsAll })}
                    >
                        Tất cả
                    </button>
                    <button
                        className={`px-4 py-2 rounded whitespace-nowrap ${
                            currentActive.tab === "vietnam" ? "bg-[#333] border-none" : ""
                        }`}
                        onClick={() => setCurrentActive({ tab: "vietnam", songs: dataSongs.current.newSongsVietnam })}
                    >
                        Việt Nam
                    </button>
                    <button
                        className={`px-4 py-2 rounded whitespace-nowrap ${
                            currentActive.tab === "korea" ? "bg-[#333] border-none" : ""
                        }`}
                        onClick={() => setCurrentActive({ tab: "korea", songs: dataSongs.current.newSongsKorea })}
                    >
                        Hàn Quốc
                    </button>
                    <button
                        className={`px-4 py-2 rounded whitespace-nowrap ${
                            currentActive.tab === "us-uk" ? "bg-[#333] border-none" : ""
                        }`}
                        onClick={() => setCurrentActive({ tab: "us-uk", songs: dataSongs.current.newSongsUsUk })}
                    >
                        US-UK
                    </button>
                </div>
            </Header>

            <div className="mt-16">
                <ActionSidebar songs={currentActive.songs} id={`newPublish ${currentActive.tab}`} />
                <SongsItem
                    songs={currentActive.songs}
                    id={`newPublish ${currentActive.tab}`}
                    addedAt={addedAt}
                    offsetScroll={104}
                />
            </div>
        </div>
    );
}

export default NewPublish;
