import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Types from "./Types";
import SongItem from "./SongItem";
import PlayButton from "./PlayButton";
import UserItem from "../components/UserItem";
import Loading from "../../components/Loading";
import PlaylistItem from "../components/PlaylistItem";
import useDebounce from "../../hooks/useDebounce";
import { MdClear } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { apiUrl } from "../../contexts/variables";
import { GiMusicSpell } from "react-icons/gi";

function Search() {
    const [isLoading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [resultSearch, setResultSearch] = useState<any>({ songs: [], playlists: [], users: [] });
    const searchRef = useRef<any>();
    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        searchRef.current.focus();
    }, []);

    useEffect(() => {
        if (!debounced.trim()) {
            setResultSearch({ songs: [], playlists: [], users: [] });
            return;
        }

        // Call api search
        const callSearchApi = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/search`, {
                    params: { search: debounced },
                });
                setResultSearch(response.data.result);
                setLoading(false);
            } catch (error: any) {
                if (error.response.data) return error.response.data;
                else return { success: false, message: error.message };
            }
        };
        callSearchApi();
    }, [debounced]);

    return (
        <div>
            <Header offsetBg={0} offsetContent={0}>
                <div className="flex justify-around items-center gap-2 h-12 bg-[#2a2a2a] rounded-full px-4 lg:mx-8 lg:w-[364px] border-2 border-transparent opacity-80 hover:opacity-100 hover:border-secondary focus-within:opacity-100 focus-within:border-secondary">
                    <BiSearch />
                    <input
                        type="text"
                        ref={searchRef}
                        value={searchValue}
                        maxLength={800}
                        placeholder="Bạn muốn nghe gì?"
                        autoCorrect="off"
                        autoCapitalize="off"
                        autoFocus
                        className="searchCancelButton text-white text-sm outline-none border-none bg-[#2a2a2a] w-full"
                        onChange={(e) => {
                            if (!e.target.value.startsWith(" ")) {
                                setSearchValue(e.target.value);
                            }
                        }}
                    />

                    <button
                        onClick={() => {
                            setSearchValue("");
                            searchRef.current.focus();
                        }}
                        className={`cursor-default ${searchValue ? "visible" : "invisible"}`}
                    >
                        <MdClear />
                    </button>
                </div>
            </Header>
            <div className="spaceContent mt-16">
                {!debounced && <Types />}
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {debounced && resultSearch.songs.length !== 0 && (
                            <div className="flex flex-col lg:flex-row gap-6 mb-8">
                                <div className="w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5">
                                    <p className="text-2xl font-bold mb-5">Kết quả hàng đầu</p>
                                    <div
                                        className="group 
                                flex flex-col gap-6 bg-[#202020] p-5 rounded-lg hover:bg-[#2a2a2a] cursor-pointer relative"
                                    >
                                        <img
                                            src={resultSearch.songs[0].image}
                                            alt="SongImage"
                                            className="w-24 h-24 rounded-md"
                                        />
                                        <p className="text-3xl font-bold whitespace-nowrap truncate">
                                            {resultSearch.songs[0].name}
                                        </p>
                                        <p className="text-sm whitespace-nowrap">
                                            <span className="opacity-70">{resultSearch.songs[0].artist}</span>
                                            <span className="bg-primary px-3 py-1 rounded-full ml-8 opacity-100 font-bold">
                                                Bài hát
                                            </span>
                                        </p>
                                        <PlayButton song={resultSearch.songs[0]} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-2xl font-bold mb-5">Bài hát</p>
                                    {resultSearch.songs.slice(0, 4).map((song: object, index: number) => (
                                        <SongItem key={index} song={song} songs={resultSearch.songs.slice(0, 4)} />
                                    ))}
                                </div>
                            </div>
                        )}
                        {debounced && resultSearch.playlists.length !== 0 && (
                            <div className="mb-8">
                                <p className="text-2xl font-bold mb-5">Playlist</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-1 auto-rows-[0] overflow-y-hidden gap-x-3 md:gap-4 lg:gap-6">
                                    {resultSearch.playlists.slice(0, 5).map((item: any, index: number) => (
                                        <PlaylistItem key={index} playlist={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                        {debounced && resultSearch.users.length !== 0 && (
                            <div>
                                <p className="text-2xl font-bold mb-5">Hồ sơ</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-1 auto-rows-[0] overflow-y-hidden gap-x-3 md:gap-4 lg:gap-6">
                                    {resultSearch.users.slice(0, 5).map((item: any, index: number) => (
                                        <UserItem key={index} user={item} />
                                    ))}
                                </div>
                            </div>
                        )}
                        {debounced &&
                            resultSearch.songs.length === 0 &&
                            resultSearch.playlists.length === 0 &&
                            resultSearch.users.length === 0 && (
                                <div className="py-7 min-h-[220px] flex flex-col justify-center items-center">
                                    <p className="text-8xl mb-8">
                                        <GiMusicSpell />
                                    </p>
                                    <p className="text-tGray font-semibold">Không có kết quả được tìm thấy</p>
                                </div>
                            )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Search;
