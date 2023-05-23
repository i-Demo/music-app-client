import { useState } from "react";
import Tippy from "@tippyjs/react";
import { useContext } from "react";
import { MdClose } from "react-icons/md";
import { AuthContext } from "../../../contexts/authContext";

function ModalCreatePlaylist({ setIsShowModal }: any) {
    const { createPlaylist } = useContext(AuthContext);
    const [playlistData, setPlaylistData] = useState({
        name: "",
        isPublic: true,
    });
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await createPlaylist(playlistData);
            if (response.success) {
                setIsShowModal(false);
            }
        } catch (error) {}
    };
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-bgModal z-[9999]" onClick={() => setIsShowModal(false)}>
            <div
                className="absolute top-0 bottom-0 left-0 right-0 w-80 h-fit m-auto bg-bg rounded-xl p-6"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <h5 className="font-bold mb-4 text-center">Tạo Playlist mới</h5>
                <Tippy content="Đóng" className="tooltip" placement="top">
                    <button className="text-2xl absolute top-0 right-0 p-2" onClick={() => setIsShowModal(false)}>
                        <MdClose />
                    </button>
                </Tippy>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        id="nameForm"
                        autoFocus
                        placeholder="Nhập tên Playlist"
                        className="inputModal"
                        value={playlistData.name}
                        onChange={(e) => setPlaylistData({ ...playlistData, name: e.target.value })}
                        required
                    />
                    <div className="text-sm flex items-center justify-between">
                        <div>
                            <p>Công khai</p>
                            <span className="text-xs opacity-70">Mọi người có thể nhìn thấy playlist này</span>
                        </div>

                        <label htmlFor="toggleInput" className="cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="toggleInput"
                                    className="sr-only peer"
                                    checked={playlistData.isPublic}
                                    onChange={() =>
                                        setPlaylistData({ ...playlistData, isPublic: !playlistData.isPublic })
                                    }
                                />
                                <div className="h-4 w-8 rounded-full bg-secondary peer-checked:bg-violet-500"></div>
                                <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-white peer-checked:right-0 peer-checked:left-auto"></div>
                            </div>
                        </label>
                    </div>
                    <button type="submit" className="btn bg-violet-500 text-white">
                        Tạo mới
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalCreatePlaylist;
