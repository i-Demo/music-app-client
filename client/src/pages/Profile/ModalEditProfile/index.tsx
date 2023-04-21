import { useState, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import defaultAvatar from "@assets/images/defaultAvatar.webp";
interface avatar {
    preview: string;
}
function ModalEditProfile({ user, onClick }: any) {
    const { name, gender, birthday } = user;
    const [avatar, setAvatar] = useState<avatar>();

    const handlePropagation = (e: any) => {
        e.stopPropagation();
    };

    const handlePreviewAvatar = (e: any) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file);
    };
    useEffect(() => {
        console.log(avatar);
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    });
    return (
        <div className="profileModal fixed top-0 left-0 right-0 bottom-0 bg-bgModal z-[9999]" onClick={onClick}>
            <div
                className="profileModalContainer absolute top-0 bottom-0 left-0 right-0 w-[524px] h-fit m-auto bg-bg rounded-xl p-6"
                onClick={handlePropagation}
            >
                <h5 className="font-bold mb-4">Chi tiết hồ sơ</h5>
                <form className="flex gap-4">
                    <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden text-white font-semibold">
                        <img
                            src={avatar?.preview || user.avatar || defaultAvatar}
                            alt="Avatar"
                            className="w-[180px] h-[180px]"
                        />
                        <div className="absolute top-0 right-0 bottom-0 left-0 m-auto flex flex-col justify-center items-center gap-4 bg-bgModal opacity-100 hover:opacity-100">
                            <div>
                                <label htmlFor="avatarForm" className="hover:underline">
                                    Chọn ảnh
                                </label>
                                <input
                                    type="file"
                                    name="avatar"
                                    id="avatarForm"
                                    className="hidden"
                                    onChange={handlePreviewAvatar}
                                />
                            </div>
                            <MdOutlineEdit className="text-5xl" />
                            <button
                                type="button"
                                className="cursor-auto hover:underline"
                                onClick={() => setAvatar(undefined)}
                            >
                                Xoá ảnh
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="relative group">
                            <label htmlFor="nameForm" className="labelModal group-focus-within:opacity-100">
                                Tên
                            </label>
                            <input type="text" name="name" id="nameForm" className="inputModal" />
                        </div>
                        <div className="relative group">
                            <label htmlFor="genderForm" className="labelModal group-focus-within:opacity-100">
                                Giới tính
                            </label>
                            <input type="text" name="gender" id="genderForm" className="inputModal" />
                        </div>
                        <div className="relative group">
                            <label htmlFor="dateForm" className="labelModal group-focus-within:opacity-100">
                                Ngày sinh
                            </label>
                            <input type="date" name="birthday" id="dateForm" className="inputModal" />
                        </div>
                        <button className="btn shadow-md shadow-brown bg-white hover:scale-105 mt-8">Lưu hồ sơ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditProfile;
