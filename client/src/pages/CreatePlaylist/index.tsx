import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import axios from "axios";
import { apiUrl } from "../../contexts/variables";

function CreateSong() {
    const {
        authState: { user },
    } = useContext(AuthContext);
    const [playlistData, setSongData] = useState({
        name: "",
        desc: "",
        image: "",
        type: "",
        genre: "",
        region: "",
    });

    // Two-way binding Register Data
    const onChangePlaylistData = (e: { target: { name: string; value: string } }) => {
        setSongData({
            ...playlistData,
            [e.target.name]: e.target.value,
        });
    };
    const onChangeSongDataFile = (e: any) => {
        const file = e.target.files[0];
        convertBase64(file).then((data) => {
            setSongData({
                ...playlistData,
                [e.target.name]: data,
            });
        });
    };

    // Convert Image to Base64
    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(playlistData);
        try {
            const response = await axios.post(`${apiUrl}/playlists`, playlistData);
            console.log(response.data);
        } catch (error: any) {
            if (error.response.data) console.log(error.response.data);
            else console.log(error);
        }
    };

    return user.isAdmin ? (
        <div className="flex justify-center items-center mt-12 bg-white">
            <form className="w-full max-w-lg py-8" onSubmit={handleSubmit}>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                    >
                        Name
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        name="name"
                        onChange={onChangePlaylistData}
                        value={playlistData.name}
                        placeholder="Jane"
                    />
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                    >
                        Desc
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        name="desc"
                        onChange={onChangePlaylistData}
                        value={playlistData.desc}
                        placeholder="Jane"
                    />
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                    >
                        Image
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="file"
                        name="image"
                        onChange={onChangeSongDataFile}
                        placeholder="Jane"
                    />
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                    >
                        Type
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        name="type"
                        onChange={onChangePlaylistData}
                        value={playlistData.type}
                        placeholder="Jane"
                    />
                </div>
                
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                    >
                        Genre
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        name="genre"
                        onChange={onChangePlaylistData}
                        value={playlistData.genre}
                        placeholder="Jane"
                    />
                </div>
                <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                    >
                        Region
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text"
                        name="region"
                        onChange={onChangePlaylistData}
                        value={playlistData.region}
                        placeholder="Jane"
                    />
                </div>
                <button type="submit" className="btn bg-green-500">
                    Create Playlist
                </button>
            </form>
        </div>
    ) : (
        <h1 className="px-32 py-40">You don't have access to this</h1>
    );
}

export default CreateSong;
