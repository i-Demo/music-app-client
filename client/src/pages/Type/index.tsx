import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import PlaylistItem from "../components/PlaylistItem";
import { apiUrl } from "../../contexts/variables";

function Type() {
    const [type, setType] = useState({ image: "", name: "" });
    const [genre, setGenre] = useState([]);
    const params = useParams();

    // CALL API get Type
    const getType = async () => {
        try {
            const response = await axios.get(`${apiUrl}/types`, {
                params: {
                    type: params.type,
                },
            });
            setType(response.data.types[0]);
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    // CALL API get Playlists of Type
    const getPlaylistsOfType = async () => {
        try {
            const response = await axios.get(`${apiUrl}/playlists/get-by-type/${params.type}`);
            setGenre(response.data.result);
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    useEffect(() => {
        getType();
        getPlaylistsOfType();
    }, []);
    return (
        <div>
            <Header offsetBg={212} offsetContent={212}>
                <div className="text-2xl font-bold">{params.type}</div>
            </Header>
            <div
                className="mt-16 mb-4 pb-[29.1%] bg-center bg-cover bg-no-repeat mx-4 lg:mx-8 rounded-lg relative"
                style={{ backgroundImage: `url(${type.image})` || "" }}
            >
                <p className="absolute bottom-4 left-1/2 translate-x-[-50%] text-4xl md:text-6xl lg:text-7xl font-extrabold whitespace-nowrap uppercase">
                    {type.name}
                </p>
            </div>
            <div className="spaceContent">
                {genre.map((data: any, index: number) => (
                    <div key={index}>
                        <p className="text-xl font-bold mb-4">{data.genre}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 md:gap-4 lg:gap-6 mb-12">
                            {data.playlists.map((playlist: any, index: number) => (
                                <PlaylistItem key={index} playlist={playlist} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Type;
