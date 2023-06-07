import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { useNavigate } from "react-router-dom";

function DeletePlaylistModal({ onClick, name, idPlaylist }: { onClick: any; name: string; idPlaylist: string }) {
    const { deletePlaylist } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDeletePlaylist = async (e: any) => {
        e.preventDefault();
        const response = await deletePlaylist(idPlaylist);
        navigate("/library");
        console.log(response.message);
    };

    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-bgModal z-[9999]" onClick={onClick}>
            <div
                className="absolute top-0 bottom-0 left-0 right-0 w-80 max-w-[400px] h-fit m-auto rounded-xl p-6 bg-white text-primary text-sm"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="flex flex-col gap-4">
                    <p className="text-2xl font-bold">Xoá khỏi Thư viện?</p>
                    <p>
                        Thao tác này sẽ xoá <span className="font-bold">{name}</span> khỏi{" "}
                        <span className="font-bold">Thư viện</span>
                    </p>
                    <div className="flex gap-4 justify-end">
                        <button className="btn w-28 hover:scale-105" onClick={onClick}>
                            Huỷ
                        </button>
                        <button className="btn bg-btn w-28 hover:scale-105" onClick={handleDeletePlaylist}>
                            Xoá
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeletePlaylistModal;
