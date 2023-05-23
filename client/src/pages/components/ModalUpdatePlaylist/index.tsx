import { useState, useContext } from "react";
import Tippy from "@tippyjs/react";
import { AuthContext } from "../../../contexts/authContext";
import Loading from "../../../components/Loading";
import AlertMessage, { TypeAlert } from "../../../components/AlertMessage";
import { MdClose, MdOutlineEdit } from "react-icons/md";
import defaultPlaylist from "@assets/images/defaultPlaylist.png";

interface ModalUpdatePlaylistType {
    playlist: any;
    setPlaylist: any;
    setIsShowModal: any;
}
function ModalUpdatePlaylist({ playlist, setPlaylist, setIsShowModal }: ModalUpdatePlaylistType) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [playlistData, setPlaylistData] = useState({
        image: playlist.image,
        name: playlist.name,
        desc: playlist.desc,
    });
    const [alert, setAlert] = useState<TypeAlert | null>(null);
    const [base64, setBase64] = useState<any>("");
    const { editPlaylist } = useContext(AuthContext);

    const onChangePlaylistData = (e: any) => {
        if (alert) setAlert(null);
        setPlaylistData({
            ...playlistData,
            [e.target.name]: e.target.value,
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
    // Xu ly khi click chon anh moi
    const handlePreviewAvatar = (e: any) => {
        if (alert) setAlert(null);
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        convertBase64(file).then((data) => {
            setBase64(data);
            setPlaylistData({
                ...playlistData,
                image: file.preview,
            });
        });
    };
    const handleUpdateProfile = async (e: any) => {
        e.preventDefault();
        setIsUpdating(true);
        if (base64) playlistData.image = base64;
        try {
            const response = await editPlaylist(playlist._id, playlistData);
            setIsUpdating(false);
            if (response.success) {
                setIsShowModal(false);
                setPlaylist(response.playlist);
            } else {
                setAlert({ type: "danger", message: response.message });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-bgModal z-[9999]" onClick={() => setIsShowModal(false)}>
            <div
                className="absolute top-0 bottom-0 left-0 right-0 w-[524px] h-fit m-auto bg-bg rounded-xl p-6"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <h5 className="font-bold mb-8 text-left">Sửa thông tin chi tiết</h5>
                <Tippy content="Đóng" className="tooltip" placement="top">
                    <button className="text-2xl absolute top-0 right-0 p-2" onClick={() => setIsShowModal(false)}>
                        <MdClose />
                    </button>
                </Tippy>
                <form className="flex gap-4" onSubmit={handleUpdateProfile}>
                    <div className="group relative text-white w-[180px] h-[180px] font-semibold">
                        <img
                            src={playlistData.image || defaultPlaylist}
                            alt="Image"
                            className="w-[180px] h-[180px] object-cover"
                        />
                        <div className="absolute top-0 right-0 bottom-0 left-0 m-auto bg-bgModal opacity-100 hover:opacity-100">
                            {isUpdating ? (
                                <Loading />
                            ) : (
                                <div className="invisible group-hover:visible w-full h-full flex flex-col justify-center items-center gap-4">
                                    <div>
                                        <label htmlFor="imageForm" className="hover:underline">
                                            Chọn ảnh
                                        </label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="imageForm"
                                            className="hidden"
                                            onChange={handlePreviewAvatar}
                                        />
                                    </div>
                                    <MdOutlineEdit className="text-5xl" />
                                    {playlistData.image && (
                                        <button
                                            type="button"
                                            className="cursor-auto hover:underline"
                                            onClick={() => {
                                                setPlaylistData({ ...playlistData, image: "" });
                                                setBase64("");
                                            }}
                                        >
                                            Xoá ảnh
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 flex-1 justify-center">
                        <div className="relative group">
                            <label htmlFor="nameForm" className="labelModal group-focus-within:opacity-100">
                                Tên
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="nameForm"
                                className="inputModal"
                                value={playlistData.name}
                                onChange={onChangePlaylistData}
                                placeholder="Thêm tên"
                                required
                            />
                        </div>

                        <div className="relative group">
                            <label htmlFor="nameForm" className="labelModal group-focus-within:opacity-100">
                                Nội dung mô tả
                            </label>
                            <textarea
                                name="desc"
                                id="nameForm"
                                className="inputModal pt-2 h-[124px] text-xs placehoder"
                                value={playlistData.desc}
                                onChange={onChangePlaylistData}
                                placeholder="Thêm phần mô tả không bắt buộc"
                            />
                        </div>
                        <div className="h-4">
                            <AlertMessage info={alert} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="btn w-24 text-end bg-white hover:scale-105">
                                Lưu
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalUpdatePlaylist;
