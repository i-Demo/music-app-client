import { useState, useEffect, useRef, useContext } from "react";
import { SongContext } from "../../contexts/songContext";
import NewSong from "./NewSong";
import Loading from "../../components/Loading";
import Header from "../../components/Header";

interface TypeDataSongs {
    newSongs: any;
}
function DashBoard() {
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { getNewSongs } = useContext(SongContext);

    const [dataSongs, setDataSongs] = useState<TypeDataSongs>({
        newSongs: [],
    });

    const callGetNewSongAPIs = async () => {
        try {
            const data = await Promise.all([
                getNewSongs({ limit: 12 }),
                getNewSongs({ country: "vietnam", limit: 12 }),
                getNewSongs({ country: "korea", limit: 12 }),
                getNewSongs({ country: "us-uk", limit: 12 }),
            ]);
            setDataSongs({ ...dataSongs, newSongs: data });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Promise.all([callGetNewSongAPIs()]).then(() => {
            setIsLoading(false);
        });

        scrollRef.current?.scrollTo(0, 0);
    }, []);

    if (isLoading) return <Loading />;

    return (
        <>
            <Header offsetBg={0} />
            <div className="pl-4 lg:px-8 lg:pt-20 pb-8 pt-16 flex flex-col min-w-[528px]" ref={scrollRef}>
                <div className="mx-6 mb-8 bg-white h-72 rounded-md p-2">
                    <h2 className="text-primary">title</h2>
                </div>
                <NewSong songs={dataSongs.newSongs} />
            </div>
        </>
    );
}

export default DashBoard;
